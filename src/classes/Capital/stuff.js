import Resource from './resource.js';
import Tool from './tool.js'
import fs from 'fs';
const resourcesJson = JSON.parse( 
    fs.readFileSync( './DB/resources.json' 
    ));
const toolsJson = JSON.parse( 
    fs.readFileSync( './DB/tools.json' 
    ));

// export default function Stuff ( resourceList, toolList ) {
export default function Stuff ( info ) {    
    // this.resourceList = resourceList;
    // this.toolList = toolList;

    this.info = info;

    // STUFF CATEGORIES: 
        // Natural resources
        // Supplies
        // Components
        // Tools
        // Machines (?)
        // Buildings

    this.findProductinCategory = function ( productName, categoryName  ) {
        return this.info[ categoryName ]
            .find( product => product.info['name'] === productName
        )};

    this.findProduct = function ( productName ) {
        for ( let categoryName of Object.keys( this.info ) ) {
            if () {

            }
        };
        
        return this.info[ categoryName ]
        .find( product => product.info['name'] === productName
        )};
    };


    this.findResource = function( resourceName ) { 
        return this.resourceList
            .find( resource => resource.info['name'] === resourceName
    )};

    this.findTool = function( toolName ) { 
        return this.toolList
            .find( tool => tool.info['name'] === toolName
    )};

    this.initializeTool = function ( toolInfo ) {
        this.toolList.push( new Tool ( toolInfo ))
    };

    this.initializeToolJson = function (  ) {
        for ( let toolInfo of toolsJson['tools'] ) {
            this.initializeTool( toolInfo )
        };
    };

    this.initializeResource = function ( resourceInfo ) {
        this.resourceList.push( new Resource ( resourceInfo ) );
    };

    this.initializeResourceJson = function ( resourceJson ) {
        for ( let resourceInfo of resourcesJson['resources'] ) {
            this.initializeResource( resourceInfo )
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



    this.checkManyAvailability = function ( resourceInputObject ) {
        for ( let resourceName of Object.keys( resourceInputObject ) ) {
            if ( !this.checkResourceAvailability
                ( resourceName, resourceCostObject[resourceName] ) ) {
                    return false;
            };
        };
        return true;
    };

    this.consumeInputResources = function ( resourceInputJson ) {
        // resourceInputJson = {
        //     "resource1": float1,
        //     "resource2": float2
        //     etc
        // };


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

    this.initializeResourceJson( resourcesJson );
    // this.initializeToolJson( toolsJson );

};



