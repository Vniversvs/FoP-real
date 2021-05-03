// TODO:
//// 1) Tool
//// 2) LaborOrder
//// 3) Turn


import fs from 'fs';

import Society from './src/classes/Society/society.js';
import Population from './src/classes/Society/population.js';
import Work from './src/classes/Society/work.js';

const population = new Population( 100 );
const work = new Work ( [] );

import Capital from './src/classes/Capital/capital.js';
import Stuff from './src/classes/Capital/stuff.js';

const stuff = new Stuff ( [], [] );

import Player from "./src/classes/player.js";

const society = new Society( population, work )
const capital = new Capital( stuff, [] )  

const PLAYER = new Player( society, capital, 0, 0);

const laborsJson = JSON.parse( 
    fs.readFileSync( './DB/labors.json' 
    ));
const resourcesJson = JSON.parse( 
    fs.readFileSync( './DB/resources.json' 
    ));


PLAYER.capital.stuff.initializeResource(resourcesJson['resources'][0]);

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

console.log( PLAYER.capital.stuff.resourceList );
console.log( PLAYER.capital.stuff.toolList );








