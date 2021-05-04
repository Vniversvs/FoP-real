import resource from './resource.js'
import fs from 'fs';
// const Resource = resource;

const resourcesJson = JSON.parse( 
    fs.readFileSync( './DB/resources.json' 
    ));

export default function Capital ( production, tools ) {
    this.production = production;
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

