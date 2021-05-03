import fs from 'fs';

const laborsJson = JSON.parse( 
    fs.readFileSync( './DB/labors.json' 
    ));
const resourcesJson = JSON.parse( 
    fs.readFileSync( './DB/resources.json' 
    ));

export default function Labor ( info ) {
    this.info = info;
    // this.laborName = laborName;
    // this.resourceInput = resourceInput;
    // this.resourceOutput = resourceOutput;
    // this.tools = tools;

    this.addPlayer = ( player ) => this.player = player;

    // this.checkInputResource = function ( resourceId ) {
    //     if ( this.player.capital.getResource( resourceId ) ) {
    //         return true;
    //     };
    // };

    // this.checkInput = function () {
    //     for ( let  ) {

    //     };
    // };


};

