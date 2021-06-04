import fs from 'fs';
import Labor from './labor.js'
import LaborOrder from './laborOrder.js';

export default function Work ( info ) {
    this.info = info;

    this.addLabor = function ( laborInfo ) {
        this.info['Labors'].push( new Labor( laborInfo ) );
    };

    this.findLabor = function ( laborName ) {
        return this.info['Labors']
            .find( labor => labor.info['Name'] === laborName
        );
    };

    this.getLaborOrder = function ( laborOrderId ) {
        return this.info['Labor Orders'].filter( order => order.info['Id'] === laborOrderId )[0]    
    };

    this.addLaborOrder = function ( laborOrderInfo ) {
        this.info['Labor Orders'].push( new LaborOrder( laborOrderInfo ) );
    };

    this.addLaborOrder2 = function ( laborOrderInfo, player ) {
        let production = this.player.capital.production; 
        let population = this.player.society.population;
        let inputJson = this.calculateInputJson( laborOrderInfo );
        if ( production.checkManyProductsAvailability( inputJson ) && 
        population.checkFreeLaborers( laborOrderInfo['Laborers'] )){
            this.info['Labor Orders'].push( new LaborOrder( laborOrderInfo ) );
            this.getLaborOrder( laborOrderInfo['Id'] ).addPlayer( player );
        } else {console.log( 'not enough input or laborers' );};
    };

    this.addLaborOrder = function ( laborOrderInfo ) {
        let player = this.player;
        let production = player.capital.production; 
        let population = player.society.population;
        let inputJson = this.calculateInputJson( laborOrderInfo );
        if ( production.checkManyProductsAvailability( inputJson ) && 
        population.checkFreeLaborers( laborOrderInfo['Laborers'] )){
            this.info['Labor Orders'].push( new LaborOrder( laborOrderInfo ) );
            this.getLaborOrder( laborOrderInfo['Id'] ).addPlayer( player );
        } else {console.log( 'not enough input or laborers' );};
    };

    this.removeLaborOrder = function ( laborOrderId ) {
        this.info['Labor Orders'] = this.info['Labor Orders']
        .filter( laborOrder => laborOrder.info['Id'] !== laborOrderId );
    };

    this.performLaborOrder = function ( laborOrder ) {
        let tempProduction = this.player.capital.production; 
        let inputProducts = laborOrder.calculateInputJson();
        let outputProducts = laborOrder.calculateOutputJson();

        if( tempProduction.checkManyProductsAvailability( inputProducts ) ) {
            tempProduction.consumeInputProducts( inputProducts );
            tempProduction.produceOutputProducts( outputProducts );
            this.player.capital.addToolProductionPoints( laborOrder );
        };
        // this.removeLaborOrder( laborOrder.info['Id'] );
    };

    this.performLaborOrder2 = function ( laborOrder ) {
        let tempProduction = this.player.capital.production; 
        let inputProducts = laborOrder.calculateInputJson2();
        let outputProducts = laborOrder.calculateOutputJson2();
        tempProduction.consumeInputProducts( inputProducts );
        tempProduction.produceOutputProducts( outputProducts );
        this.removeLaborOrder( laborOrder.info['Id'] );
    };

    this.getLaborOrderToolInfo = function ( laborOrderId ) {

    };

    this.yieldToolPoints = function ( laborOrder ) {
        let toolModels = 3;
    };

    //FINISH THIS
    this.generateModelCreationLabors = function ( toolName ) {
        let tempTool = this.player.capital.production.findTool( toolName );
        for ( let modelName of Object.keys(tempTool.info['Models']) ) {
            console.log(modelName);
        };
    };    

    this.getProductChange = function ( productName ) {
        let ret = {};
        ret[productName] = 0;
        for ( let laborOrder of this.info['Labor Orders'] ) {
            ret[productName] += laborOrder.calculateProductChange( productName )[productName];
        };
        return ret;
    };

    this.extractToolModelInfoFromOrder = function( laborOrderInfo ) {
        return laborOrderInfo['Tools']; 
    };

    this.calculateInputJson = function ( laborOrderInfo ) {
        let treatedInputJson = {};
        var referenceLabor = this.findLabor( laborOrderInfo['Labor'] );
        var uij = referenceLabor.info['Input']; // untreatedInputJson
        let production = this.player.capital.production
        let tmie = production.calculateToolModelInputEffect( laborOrderInfo['Tools'] )
        var nil = laborOrderInfo['Laborers'] // nil = Number of Laborers
        for ( let inputName of Object.keys( uij ) ) {
            treatedInputJson[ inputName ] =
            uij[ inputName ] * tmie * nil;
        };
        return treatedInputJson;
    };

    this.makeLaborsJson = function (){
        let laborsJson = {};
        this.info.Labors.forEach( ( laborClassInstance ) => {
            laborsJson[laborClassInstance.info.Name] = laborClassInstance.info;
        });
        return laborsJson;
    };

    this.makeLaborOrdersJson = function () {
        let laborOrdersJson = {};
        this.info['Labor Orders'].forEach( ( laborOrderClassInstance ) => {
            laborOrdersJson[laborOrderClassInstance.info.Id] = laborOrderClassInstance.info;
        });
        return laborOrdersJson;
    };

    this.makeWorkJson = function () {
        return {
            'Labors': this.makeLaborsJson(),
            'Labor Orders': this.makeLaborOrdersJson()
        };
    };

    this.addToolModelMakingLabor = function ( toolName, modelName ) {
        if ( typeof toolName === typeof 'a' && typeof modelName === typeof 'a' ) {
            let production = this.player.capital.production;
            let toolModelInfo = production.getTotalModelInfo( toolName, modelName );            
            let outputjson = {};
            outputjson[toolName] = modelName;
            let toolMakingLaborInfo = {
                'Name': `Make ${toolName} (model: ${modelName})`,
                'Input': toolModelInfo['Total Cost'],
                'Output': outputjson,
                'Tools': {}
            };
            this.addLabor( toolMakingLaborInfo );
        };
    };

    this.addAllToolModelMakingLabors = function (  ) {
        let production = this.player.capital.production;
        let toolNamesArray = production.getCategoryProductNames( 'Tools' ) ;
        for ( let toolName of toolNamesArray ) {
            for ( let modelName of production.getToolModelNames( toolName ) ) {
                // console.log( modelName );
                this.addToolModelMakingLabor( toolName, modelName );
            };
        };
    };

    this.addLaborOrderTest = function ( laborOrderInfo ) {
        let production = this.player.capital.production; 
        let population = this.player.society.population;
        let inputJson = this.calculateInputJson( laborOrderInfo );
        console.log(inputJson);
        if ( production.checkManyProductsAvailability( inputJson ) ) {
            if ( population.checkFreeLaborers( laborOrderInfo['Laborers'] ) ) {
                if ( production.checkAvailableToolModels( laborOrderInfo['Tools'] ) ) {

                } else {
                    'Not enough tool models!'
                }
            } else {
                return 'Not enough laborers!'
            }         
        } else {
            return 'Not enough products!'
        };

        // if ( production.checkManyProductsAvailability( inputJson ) && 
        // population.checkFreeLaborers( laborOrderInfo['Laborers'] )){
        //     this.info['Labor Orders'].push( new LaborOrder( laborOrderInfo ) );
        //     this.getLaborOrder( laborOrderInfo['Id'] ).addPlayer( player );
        // } else {console.log( 'not enough input or laborers' );};
    };

    this.addPlayer = ( player ) => this.player = player;
};





