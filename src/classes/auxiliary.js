import fs from 'fs';
export default function Auxiliary () {
    this.roundDown = function ( float ) {
        return Math.floor( float*100 )/100
    };

    this.readJson = function( pathandName ) {
        return JSON.parse( fs.readFileSync( pathandName ))
    };

    // this.toObject = function ( array ) {
    //     if ( array.length == 2 ) {
    //         return {
    //             array[0]: array[1]
    //         }
    //     } else {
    //         'Should have length 2'
    //     };
    // }

    this.copyObject = function ( oldObj ) {
        let newObj = {};
        for ( let objKey of Object.keys(oldObj) ) {
            newObj[objKey] = oldObj[objKey];
        };
        return newObj;
    };
    
    this.writeBigJson = function ( player, fileName ){
        fs.writeFile(`${fileName}.json`, JSON.stringify( player.makeBigJson() ), (err) => {
            if (err) {throw err;}
            console.log("JSON data is saved.");
        });
    };
} 


