// TODO:

//// 0) ( ) population.js 
////// a) ( ) Organize the Json
////// b) ( ) Base consumption 
//// 1) ( ) production.js 
////// a) (X) checks
////// b) ( ) consume and produce
//// 2) (X) Natural Resource, Tool, component, supply 
////// a) (X) template
////// b) (X) jsons
//// 3) ( ) LaborOrder
////// a) ( ) Calculate productInputJson and productOutputJson
////// b) ( ) Add LaborOrder 
////// c) ( ) Perform Labor (destroy LaborOrder)
//// 4) ( ) Pass Turn
////// a) ( ) ?
//// 5) ( ) Polish MVP
////// a) ( ) figure out initial things
////// b) ( ) balance for fun 
////// c) ( ) Finalize


import fs from 'fs';

import Society from './src/classes/Society/society.js';
import Population from './src/classes/Society/population.js';
import Work from './src/classes/Society/work.js';

const population = new Population( 100 );
const work = new Work ( [] );

import Capital from './src/classes/Capital/capital.js';
import Production from './src/classes/Capital/production.js';

const production = new Production ( { 
    'Natural Resources': [],
    'Supplies': [],
    'Components': [],
    'Tools': [],
    'Machines': [],
    'Buildings': [],
});

import Player from "./src/classes/player.js";

const society = new Society( population, work )
const capital = new Capital( production, [] )  

const PLAYER = new Player( society, capital, 0, 0);

const laborsJson = JSON.parse( 
    fs.readFileSync( './DB/labors.json' 
    ));
const resourcesJson = JSON.parse( 
    fs.readFileSync( './DB/resources.json' 
    ));


// PLAYER.capital.production.initializeResource(resourcesJson['resources'][0]);

// work.initializeLabor(laborsJson['labors'][0]);

// const hunt = PLAYER.society.work.findLabor( 'Hunt' );
// const huntInputObject = hunt.info['resource input'];
// const huntOutputObject = hunt.info['resource output'];
// console.log(huntInputObject);
// console.log( PLAYER.capital.stuff.resourceList.map( resource => resource.info['available'] ) );
// PLAYER.capital.stuff.consumeInputResources( huntInputObject )
// console.log( PLAYER.capital.stuff.resourceList.map( resource => resource.info['available'] ) );
// PLAYER.capital.stuff.produceOutputResources( huntOutputObject )
// console.log( PLAYER.capital.stuff.resourceList.map( resource => resource.info['available'] ) );
// console.log( PLAYER.capital.stuff.checkManyAvailability( info ) );

// console.log( PLAYER.capital.production.info['Natural Resources'] );
// console.log( PLAYER.capital.production.findProductInCategory( 'Wood', 'Tools' ) );
console.log( PLAYER.capital.production.findProduct( 'Wood' ) );






