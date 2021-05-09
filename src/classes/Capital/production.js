import Resource from './resource.js';
import Tool from './tool.js'
import Supply from './supply.js'
import Component from './component.js'
import fs from 'fs';
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

// export default function Stuff ( resourceList, toolList ) {
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
            // console.log(categoryName);
            // console.log( productName );
            // console.log( this.findProductInCategory( "Wood", "Natural Resources" ) );
            var product = this.findProductInCategory( productName, categoryName ) 
            // console.log( product );
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
    this.findTool = function( toolName ) { 
        return this.toolList
            .find( tool => tool.info['Name'] === toolName
    )};

    this.initializeTool = function ( toolInfo ) {
        this.info['Tools'].push( new Tool ( toolInfo ))
    };

    this.initializeToolJson = function ( toolsJson ) {
        for ( let toolInfo of toolsJson['tools'] ) {
            this.initializeTool( toolInfo )
        };
    };


    //COMPONENTS
    this.initializeComponent = function ( componentInfo ) {
        this.info['Components'].push( new Component ( componentInfo ))
    };

    this.initializeComponentJson = function ( componentJson ) {
        for ( let componentInfo of componentJson['components'] ) {
            this.initializeTool( componentInfo )
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
        return checkingResource.info['available'] >= amount ;
    };

    this.checkSupplyAvailability = function ( supplyName, amount ) {
        var checkingSupply = this.findResource( supplyName );
        return checkingSupply.info['available'] >= amount ;
    };

    this.checkComponentAvailability = function ( componentName, amount ) {
        var checkingComponent = this.findResource( componentName );
        return checkingComponent.info['available'] >= amount ;
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
            product['Result'].subtract( productInputJson[ productName ]);
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
            // console.log( productName );
            let product = this.findProduct( productName );
            product['Result'].add( productOutputJson[ productName ]);
        };
    };


    this.consumeInputResources = function ( resourceInputJson ) {
        for ( let resourceName of Object.keys( resourceInputJson ) ) {
            console.log(resourceName);
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

    this.produceOutputTools = function (  ) {
        // same as consumeInputResources
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

    this.initializeResourceJson( resourcesJson );
    this.initializeToolJson( toolsJson );
    this.initializeComponentJson( componentJson );
    this.initializeSupplyJson( supplyJson );
};



