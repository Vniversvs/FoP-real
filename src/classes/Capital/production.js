import Resource from './resource.js';
import Tool from './tool.js'
import Supply from './supply.js'
import Component from './component.js'
import fs from 'fs';
import Auxiliary from '../auxiliary.js'

const aux = new Auxiliary();


const resourcesJson = JSON.parse( 
    fs.readFileSync( './DB/resources.json' 
    ));
const toolsJson = JSON.parse( 
    fs.readFileSync( './DB/tools.json' 
    ));
const componentJson = JSON.parse( 
    fs.readFileSync( './DB/components.json' 
    ));
const supplyJson = JSON.parse( 
    fs.readFileSync( './DB/supplies.json' 
    ));

export default function Production ( info ) {    
    this.info = info;

// GENERAL STUFF
    this.productCategories = function () {
        return {
        'Natural Resources': {},
        'Supplies': {},
        'Components': {},
        'Tools': {},
        'Buildings': {}
    }};

    this.findProductInCategory = function ( productName, categoryName  ) {
        return this.info[ categoryName ]
            .find( product => product.info['Name'] === productName)
    };

    this.findProduct = function ( productName ) {
        for ( let categoryName of Object.keys( this.info ) ) {
            var product = this.findProductInCategory( productName, categoryName ) 
            if ( product !== undefined ) {
                return { 
                    'Result': product,
                    'Category': categoryName
                };
            };
        };
    };


    // this.initializeProductInCategory = function ( productInfo, categoryName ) {
    //     this.info[categoryName].push( new Resource ( productInfo ) );
    // };

    // this.initializeProductJson = function ( productJson ) {
    //     for ( let categoryName of productJson ) {

    //     };

    //     for ( let resourceInfo of resourcesJson['resources'] ) {
    //         this.initializeResource( resourceInfo )
    //     };
    // };

    // NATURAL RESOURCES
    this.findResource = function( resourceName ) { 
        return this.resourceList
            .find( resource => resource.info['Name'] === resourceName
    )};

    this.initializeResource = function ( resourceInfo ) {
        this.info['Natural Resources'].push( new Resource ( resourceInfo ) );
    };

    this.initializeResourceJson = function ( resourceJson ) {
        for ( let resourceInfo of resourceJson['resources'] ) {
            this.initializeResource( resourceInfo )
        };
    };


    // SUPPLIES
    this.initializeSupply = function ( supplyInfo ) {
        this.info['Supplies'].push( new Supply ( supplyInfo ))
    };

    this.initializeSupplyJson = function ( supplyJson ) {
        for ( let supplyInfo of supplyJson['supplies'] ) {
            this.initializeSupply( supplyInfo )
        };
    };


    //TOOLS
    this.findTool = ( toolName ) => this.info['Tools'].find( tool => tool.info['Name'] === toolName );

    this.findToolModel = function( toolName, modelName ) {
        return this.findTool( toolName ).getModel( modelName );
    };

    this.initializeTool = function ( toolInfo ) {
        this.info['Tools'].push( new Tool ( toolInfo ))
    };

    this.initializeToolJson = function ( toolsJson ) {
        for ( let toolInfo of toolsJson['Tools'] ) {
            this.initializeTool( toolInfo )
        };
    };


    //COMPONENTS
    this.initializeComponent = function ( componentInfo ) {
        this.info['Components'].push( new Component ( componentInfo ))
    };

    this.initializeComponentJson = function ( componentJson ) {
        for ( let componentInfo of componentJson['Components'] ) {
            this.initializeComponent( componentInfo )
        };
    };


    // Checks
    this.checkProductAvailability = function ( productName, amount ) {
        var checkingProduct = this.findProduct( productName );
        if ( checkingProduct !== undefined) {
            return checkingProduct['Result'].info['Available'] >= amount ;
        };
    };

    this.checkResourceAvailability = function ( resourceName, amount ) {
        // check if one resource is available in the quantity "amount".
        var checkingResource = this.findResource( resourceName );
        return checkingResource.info['Available'] >= amount ;
    };

    this.checkSupplyAvailability = function ( supplyName, amount ) {
        var checkingSupply = this.findResource( supplyName );
        return checkingSupply.info['Available'] >= amount ;
    };

    this.checkComponentAvailability = function ( componentName, amount ) {
        var checkingComponent = this.findResource( componentName );
        return checkingComponent.info['Available'] >= amount ;
    };


    // CHECK PRODUCTS
    this.checkManyAvailability = function ( resourceInputObject ) {
        for ( let resourceName of Object.keys( resourceInputObject ) ) {
            if ( !this.checkResourceAvailability
                ( resourceName, resourceInputObject[resourceName] ) ) {
                    return false;
            };
        };
        return true;
    };

    this.checkManyProductsAvailability = function ( productInputObject ) {
        for ( var productName of Object.keys( productInputObject ) ) {
            if ( !this.checkProductAvailability
                ( productName, productInputObject[ productName ] ) ) {
                    return false;
            };
        };
        return true;
    };


    // CONSUME AND PRODUCE PRODUCTS
    // this.consumeInputProducts = function ( productInputJson ) {
    //     for ( let productCategoryName of Object.keys( productInputJson ) ) {
    //         for ( let productName of Object.keys( productInputJson[ productCategoryName ])) {
    //             let product = this.findProduct( productName );
    //             product.subtract( productInputJson[ productCategoryName ][ productName ]);
    //         };
    //     };
    // };

    this.consumeInputProducts = function ( productInputJson ) {
        for ( let productName of Object.keys( productInputJson ) ) {
            let product = this.findProduct( productName );
            // console.log( productName + ' : ' + product['Result'].info['Available'] );
            product['Result'].subtract( productInputJson[ productName ]);
            // console.log( productName + ' : ' + product['Result'].info['Available'] );
        };
        
        // OR CONSUME CATEGORY ONE BY ONE (ALLOWS FOR DIFFERENTIATED EFFECTS ON DIFFERENT CATEGORIES)
    };

    // this.produceOutputProducts = function ( productOutputObject ) {
    //     for ( let productCategoryName of Object.keys( productInputJson ) ) {
    //         for ( let productName of Object.keys( productInputJson[ productCategoryName ])) {
    //             console.log( productName );
    //             let product = this.findProduct( productName );
    //             product.add( productInputJson[ productCategoryName ][ productName ]);
    //         };
    //     };
    // };

    this.produceOutputProducts = function ( productOutputJson ) {
        for ( let productName of Object.keys( productOutputJson )) {
        if( productName === "Tools" ) {
            this.produceOutputTools( productOutputJson[productName] );
            // for( let toolName of Object.keys( productOutputJson.Tools ) ) {
            //     for ( let modelName of Object.keys( productOutputJson.Tools[toolName] ) ) {
            //         console.log(modelName);

            //     };        
            // };
        } else {
            let product = this.findProduct( productName );
            product['Result'].add( productOutputJson[ productName ]);
        };
             // console.log( productName + ' : ' + product['Result'].info['Available'] );

            // console.log( productName + ' : ' + product['Result'].info['Available'] );
            // console.log('apple');
        };
    };


    this.consumeInputResources = function ( resourceInputJson ) {
        for ( let resourceName of Object.keys( resourceInputJson ) ) {
            // console.log(resourceName);
            let resource = this.findResource( resourceName );
            resource.subtract( resourceInputJson[resourceName]);
        };
    };

    this.consumeInputComponents = function ( componentInputJson ) {
        for ( let componentName of Object.keys( componentInputJson ) ) {
            console.log( componentName );
            let component = this.findResource( componentName );
            component.subtract( componentInputJson[ componentName ]);
        };
    };

    this.consumeInputSupplies = function ( supplyInputJson ) {
        for ( let supplyName of Object.keys( supplyInputJson ) ) {
            console.log( supplyName );
            let supply = this.findResource( supplyName );
            supply.subtract( supplyInputJson[ supplyName ]);
        };
    };

    this.weardownTools = function () {
        // same as consumeInputResources
    };

    this.produceOutputResources = function ( resourceOutputObject ) {
        for ( let resourceName of Object.keys( resourceOutputObject ) ) {
            // console.log(resourceName);
            let resource = this.findResource( resourceName );
            resource.add(resourceOutputObject[resourceName]);
        };
    };

    this.produceOutputSupplies = function ( outputSuppliesJson ) {
        for ( let suppliesName of Object.keys( suppliesOutputObject ) ) {
            let supply = this.findSupply( supplyName );
            resource.add(suppliesOutputObject[supplyName]);
        };
    };

    this.produceOutputComponents = function ( componentOutputObject ) {
        for ( let componentName of Object.keys( componentOutputObject ) ) {
            let component = this.findResource( componentName );
            component.add( componentOutputObject [ componentName ] );
        };
    };

    this.produceOutputTools = function ( toolJson ) {
        for( let toolName of Object.keys( toolJson ) ) {
            for ( let modelName of Object.keys( toolJson[toolName] ) ) {
                // console.log(modelName);
                this.findProductInCategory( toolName, 'Tools' ).addQuantityToModel( modelName, toolJson[toolName][modelName] );                
            };        
        };
    };

    this.produceOutputBuildings = function (  ) {
        // same as consumeInputResources
    };

    this.separateProductJsonIntoCategories = function ( productJson ) {
        var ret = this.productCategories();
        for ( var productName of Object.keys( productJson ) ) {
            var productInfo = this.findProduct( productName );
            ret[productInfo['Category']][productName] 
            = productJson[productName];
        };
        return ret;
    };

    this.unseparateProductCategories = function () {

    }

    this.simplifiedCategoryJson = function ( categoryName ) {
        let simplifiedJson = {};
        for ( let product of this.info[categoryName] ) {
            simplifiedJson[product.info['Name']] = product.getStorage() ;
        }        
        return simplifiedJson;
    };

    this.printCategory = function ( categoryName ) {
        console.log( this.simplifiedCategoryJson( categoryName ) );
    };

    this.printProduction = function () {
        for ( let categoryName of Object.keys( this.info ) ) {
            this.printCategory(categoryName);
        };
    };

    this.getToolModelfromJson = function ( toolModelJson ) {
        let toolName = Object.keys( toolModelJson )[0];
        console.log(toolName); 
        // return this.findProduct( toolName )['Result'].info['Models'][ toolModelJson[toolName] ];
        return this.findToolModel( toolName, toolModelJson[toolName] )
    };

    this.getToolModelsfromJson = function ( toolModelsJson ) {

    };

    this.sumProductJsons = function ( productJson1, productJson2 ) {
        if (productJson1 && productJson2) {
            let ret = aux.copyObject( productJson1 );
            for ( let productName of Object.keys( productJson2 ) ) {
                ret[productName] = (productJson1[productName] || 0 ) + productJson2[productName];            
            };
            return ret;
        } else {
            return "To sum 2 Jsons, I need 2 objects"
        };
    };

        // for ( let productName of Object.keys( productJson2 ) ) {
        //     if ( Object.keys( productJson1 ).includes( productName ) ) {
        //         ret[productName] = (productJson1[productName] || 0 ) + (productJson2[productName] || 0 );
        //     } else {
        //         ret[productName] = (productJson1[productName] || 0 ) + (productJson2[productName] || 0 );
        //     };
        // };


    this.getTotalModelInfo = function ( toolName, modelName ) {
        let tool = this.findTool( toolName );
        let modelInfo = tool.getModel( modelName );
        console.log(modelInfo);
        let baseInfo = tool.getBaseInfo();
        // let ret = [];
        // ret['Total Cost'] = this.sumProductJsons( baseInfo['Base Cost'], modelInfo['Extra Cost'] );
        // ret['Total Effect'] = this.sumProductJsons( baseInfo['Base Effect'], modelInfo['Extra Effect'] ); 
        // ret['Durability'] = modelInfo['Durability'];
        // ret['Base Upgrade'] = modelInfo['Base Upgrade'];
        // ret['Model Upgrade'] = modelInfo['Upgrade'];
        return {
            'Total Cost': this.sumProductJsons( baseInfo['Base Cost'], modelInfo['Extra Cost'] ), 
            'Total Effect': this.sumProductJsons( baseInfo['Base Effect'], modelInfo['Extra Effect'] ),
            'Durability': modelInfo['Durability'],
            'Base Upgrade': baseInfo['Base Upgrade'],
            'Model Upgrade': modelInfo['Upgrade'],
            'Quantity': modelInfo['Quantity']
        };
        return ret;
    };

    this.calculateToolModelInputEffect = function ( toolModelJson ) {
        let toolNameArray = Object.keys( toolModelJson );
        let tmie = 1;
        for ( let toolName of toolNameArray ) {
            tmie += this.getTotalModelInfo( toolName, toolModelJson[toolName] )['Total Effect']['Input']
        };
        return tmie;
    };

    this.calculateToolModelOutputEffect = function ( toolModelJson ) {
        let toolNameArray = Object.keys( toolModelJson );
        let tmoe = 1;
        for ( let toolName of toolNameArray ) {
            tmoe += this.getTotalModelInfo( toolName, toolModelJson[toolName] )['Total Effect']['Output']
        };
        return tmoe;
    };

    this.makeCategoryJson = function ( categoryName ) {
        let categoryJson = {};
        for ( let product of  this.info[categoryName] ) {
            categoryJson[product.info['Name']] = product.getAvailable(); 
            // console.log(product.info['Name']);
            if( product.info['Name'] === 'Wood' ) {
                console.log('banana');
                console.log(product.getAvailable());
            }
        };
        return categoryJson;
    };

    this.makeProductionJson = function () {
        let productionJson = {};
        for ( let categoryName of Object.keys( this.info ) ) {
            productionJson[ categoryName ] = this.makeCategoryJson( categoryName );
        };
        return productionJson;
    };

    this.makeResourcesJson = function () {
        let finalJson = {};
        for (let naturalResource of this.info['Natural Resources']) {
            finalJson[ naturalResource.info['Name'] ] = naturalResource.getAvailable();
        };
        return finalJson;
    };

    this.getCategoryProductNames = function ( categoryName ) {
        return this.info[categoryName].map( (product) => product.info.Name );
    };

    this.getToolModelNames = function ( toolName ) {
        // return this.findTool( toolName ).info.Models.map( (toolModel) => { toolModel.Name });
        return Object.keys(this.findTool( toolName ).info['Models']);
    };

    this.checkToolModelAvailability = function ( toolName, modelName, quantity ) {
        let modelQuantity = this.getTotalModelInfo( toolName, modelName )['Quantity'];
        return modelQuantity > quantity;
    };

    this.checkToolJsonAvailability = function ( laborOrderInfo ) {
        let toolInfo = laborOrderInfo['Tools']; 
        for ( let toolName of Object.keys(toolInfo) ) {
            if ( !this.checkToolModelAvailability( toolName, toolInfo[toolName], laborOrderInfo['Laborers'] ) ) {
                return false;
            };
        };    
        return true;
    };


    this.initializeResourceJson( resourcesJson );
    this.initializeToolJson( toolsJson );
    this.initializeComponentJson( componentJson );
    this.initializeSupplyJson( supplyJson );

};



