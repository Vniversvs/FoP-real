import fs from 'fs';
import Labor from './labor.js'
import LaborOrder from './laborOrder.js';
const laborsJson = JSON.parse( 
    fs.readFileSync( './DB/labors.json' 
    ));

export default function Work ( info ) {
    // info = laborList, laborOrderList
    this.info = info;

    this.initializeLabor = function ( laborInfo ) {
        this.info['Labors'].push( new Labor( laborInfo ) );
    };

    this.findLabor = function ( laborName ) {
        return this.info['Labors']
            .find( labor => labor.info['Name'] === laborName
        );
    };

    this.addLaborOrder = function ( laborOrderInfo ) {
        this.info['Labor Orders'].push( new LaborOrder( laborOrderInfo ) );
    };



    this.performLaborOrder = function ( laborOrder ) {
        var tempProduction = this.player.capital.production; 
        var inputProducts = laborOrder.calculateInputJson();
        var outputProducts = laborOrder.calculateOutputJson();
        
        if( tempProduction.checkManyProductsAvailability( inputProducts ) ) {
            tempProduction.consumeInputProducts( inputProducts );
            tempProduction.produceOutputProducts( outputProducts );
        };

    };

    this.addPlayer = ( player ) => this.player = player;
};





