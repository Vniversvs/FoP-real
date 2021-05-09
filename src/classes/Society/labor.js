import fs from 'fs';

const laborsJson = JSON.parse( 
    fs.readFileSync( './DB/labors.json' 
    ));
const resourcesJson = JSON.parse( 
    fs.readFileSync( './DB/resources.json' 
    ));

export default function Labor ( info ) {
    this.info = info;

    this.addPlayer = ( player ) => this.player = player;

};

