import React from 'react';
import ReactDOM from 'react-dom'
import Auxiliary from './src/classes/auxiliary.js'
import fs from 'fs';
import Society from './src/classes/Society/society.js';
import Population from './src/classes/Society/population.js';
import Work from './src/classes/Society/work.js';
import Capital from './src/classes/Capital/capital.js';
import Production from './src/classes/Capital/production.js';
import Player from "./src/classes/player.js";

var aux = new Auxiliary();
const population = new Population( 100 );
const work = new Work ({
    'Labors': [],
    'Labor Orders': []
} );
const production = new Production ( { 
    'Natural Resources': [],
    'Supplies': [],
    'Components': [],
    'Tools': [],
    'Machines': [],
    'Buildings': [],
});
const society = new Society( population, work )
const capital = new Capital( production, [] )  
const PLAYER = new Player( society, capital, 0, 0);
population.addPlayer( PLAYER );
work.addPlayer( PLAYER );

const laborsJson = JSON.parse( 
    fs.readFileSync( './DB/labors.json' 
    ));
const resourcesJson = JSON.parse( 
    fs.readFileSync( './DB/resources.json' 
    ));

for ( var abstractLabor of laborsJson['labors'] ) {
    PLAYER.society.work.initializeLabor( abstractLabor );
};

work.addLaborOrder({
    'Labor': 'Hunt',
    'Laborers': 20,
    'Tools':[ 'Spear' ]
});
var laborOrderTest = PLAYER.society.work.info['Labor Orders'][0];
laborOrderTest.addPlayer( PLAYER )

PLAYER.society.work.performLaborOrder( laborOrderTest )

console.log( PLAYER.capital.production.info['Natural Resources'] );

ReactDOM.render(<h1> Hello World </h1>, document.getElementById("root"))









