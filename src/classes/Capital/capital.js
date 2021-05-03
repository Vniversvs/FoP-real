import resource from './resource.js'
import fs from 'fs';
// const Resource = resource;

const resourcesJson = JSON.parse( 
    fs.readFileSync( './DB/resources.json' 
    ));

export default function Capital ( stuff, tools ) {
    this.stuff = stuff;
    this.tools = tools;

    this.addPlayer = ( player ) => { this.player = player };

    //  this.initiateResource = function ( resourceInfo ) {
    //     this.resources.push( new Resource ( resourceInfo ) );
    //  };

    //  this.getResource = function( resourceId ) {
    //     return this.resources.find( 
    //         (resource) => { resource.info["id"] === resourceId })};
};

const capital = new Capital ( [], [] );

// console.log(capital.resources);
// capital.initiateResource( resourcesJson['resources'][0] );
// console.log(capital.resources);
// console.log(capital);
// console.log(capital.resources
//     .find( ( resource ) => resource.getInfo( "name" ) === "Wood"));

// console.log(resourcesJson);


