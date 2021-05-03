import fs from 'fs';
import Labor from './labor.js'
const laborsJson = JSON.parse( 
    fs.readFileSync( './DB/labors.json' 
    ));

export default function Work ( laborList ) {
    this.laborList = laborList;

    this.initializeLabor = function ( laborInfo ) {
        this.laborList.push( new Labor( laborInfo ) );
    };

    this.findLabor = function ( laborName ) {
        return this.laborList
            .find( labor => labor.info['name'] === laborName
        );
    };

    this.performLabor = function ( laborName, numWorkers ) {
        const selectedLabor = this.findLabor( laborName );
                
    };

    this.addPlayer = ( player ) => this.player = player;
};

// const work = new Work ( [] );
// work.initializeLabor(laborsJson['labors'][0])

// console.log(laborsJson);



