import Auxiliary from './src/classes/auxiliary.js'
import fs from 'fs';
import Society from './src/classes/Society/society.js';
import Population from './src/classes/Society/population.js';
import Work from './src/classes/Society/work.js';
import Capital from './src/classes/Capital/capital.js';
import Production from './src/classes/Capital/production.js';
import Player from "./src/classes/player.js";
import Tools from "./src/classes/Capital/tools.js";

let aux = new Auxiliary();
let currentTurn = 1;

const initializePlayer = function (  ) {
    const populationJson = aux.readJson( './DB/population.json' )['Population'];
    const laborsJson = aux.readJson( './DB/labors.json' );
    const resourcesJson = aux.readJson( './DB/resources.json' );

    const population = new Population( populationJson );
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
    const tools = new Tools([]);
    const society = new Society( population, work );
    const capital = new Capital( production, tools );
    const PLAYER = new Player( society, capital, 0, 0);
    population.addPlayer( PLAYER );
    work.addPlayer( PLAYER );
    tools.addPlayer( PLAYER );

    for ( var abstractLabor of laborsJson['labors'] ) {
        PLAYER.society.work.addLabor( abstractLabor );
    };

    PLAYER.society.work.addAllToolModelMakingLabors();
    return PLAYER;
};

console.log(currentTurn === 1);
if (currentTurn === 1) {
    const PLAYER = initializePlayer();
    console.log(PLAYER);
}
console.log( PLAYER );






let laborOrderInfo = {
    'Labor': 'Hunt',
    'Laborers': 10,
    'Tools': {
        'Spear': 'Bone'
    },
    'Id': 'test'
};

let laborOrderInfo2 = {
    'Labor': 'Gather Wood',
    'Laborers': 40,
    'Tools': {
        'No Tool': 'No Model'
    },
    'Id': 'test1'
}

let laborOrderInfo3 = {
    'Labor': 'Plant Vegetables',
    'Laborers': 50,
    'Tools': {
        'No Tool': 'No Model'
    },
    'Id': 'test2'
}

PLAYER.society.work.addLaborOrder( laborOrderInfo, PLAYER );
PLAYER.society.work.addLaborOrder( laborOrderInfo2, PLAYER );
PLAYER.society.work.addLaborOrder( laborOrderInfo3, PLAYER );

PLAYER.passTurn();
console.log( PLAYER.bigJson );

let laborOrderInfoTest = {
    'Labor': 'Hunt',
    'Laborers': 10,
    'Tools': {
        'Spear': 'Bone'
    },
    'Id': 'newTest'
};

PLAYER.society.work.addLaborOrder( laborOrderInfoTest, PLAYER );
PLAYER.passTurn();

let productJson1 = {
    "Tools": {
        "Hatchet": {
            "Iron": 1
        }
    },
    "Wood": 3,
    "Oil": 4
};

PLAYER.capital.production.produceOutputProducts( productJson1 );

let laborOrderInfoTest2 = {
    'Labor': 'Make Spear (model: Bone)',
    'Laborers': 10,
    'Tools': {
    },
    'Id': 'newTest'
};
let laborOrderInfoTest3 = {
    'Labor': 'Hunt',
    'Laborers': 30,
    'Tools': {
        'Spear': 'Bone'
    },
    'Id': 'newTest2'
};

// PLAYER.society.work.addLaborOrderTest( laborOrderInfoTest2, PLAYER );
// PLAYER.passTurn();




