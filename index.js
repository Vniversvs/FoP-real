import Auxiliary from './src/classes/auxiliary.js'
import fs from 'fs';
import Society from './src/classes/Society/society.js';
import Population from './src/classes/Society/population.js';
import Work from './src/classes/Society/work.js';
import Capital from './src/classes/Capital/capital.js';
import Production from './src/classes/Capital/production.js';
import Player from "./src/classes/player.js";
import Tools from "./src/classes/Capital/tools.js";

var aux = new Auxiliary();

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
const society = new Society( population, work )
const capital = new Capital( production, tools )  
const PLAYER = new Player( society, capital, 0, 0);
population.addPlayer( PLAYER );
work.addPlayer( PLAYER );
tools.addPlayer( PLAYER );

for ( var abstractLabor of laborsJson['labors'] ) {
    PLAYER.society.work.addLabor( abstractLabor );
};
PLAYER.society.work.addToolModelMakingLabor( 'Spear', 'Bone' );

// aux.writeBigJson( PLAYER, 'jsonzao' );
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

// let spear = PLAYER.capital.production.info['Tools'][1]
// let boneSpear = spear.getModel( 'Bone' );
// let ironSpear = spear.getModel( 'Iron' );
PLAYER.society.work.addLaborOrder( laborOrderInfo, PLAYER );
PLAYER.society.work.addLaborOrder( laborOrderInfo2, PLAYER );
PLAYER.society.work.addLaborOrder( laborOrderInfo3, PLAYER );

PLAYER.passTurn();

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

// console.log( PLAYER.capital.getProductNames( 'Natural Resources' ) );
// console.log( PLAYER.capital.getProductNames( 'Supplies' ) );
// console.log( PLAYER.capital.getProductNames( 'Components' ) );
// console.log( PLAYER.capital.getProductNames( 'Tools' ) );

// for ( let toolName of PLAYER.capital.getProductNames( 'Tools' ) ) {
//     // console.log();
//     let toolClassInstance = PLAYER.capital.production.findProductInCategory( toolName, 'Tools' );
//     // console.log( toolClassInstance );
//     // console.log(  );
//     for ( let modelName of Object.keys( toolClassInstance.info.Models ) ) {
//         // console.log( modelName );
//         console.log( PLAYER.capital.production.getTotalModelInfo( toolName, modelName ) );
//     }
// }




let productJson1 = {
    "Tools": {
        "Hatchet": {
            "Iron": 1
        }
    },
    "Wood":3,
    "Oil": 4
};
// console.log( PLAYER.capital.production.findProductInCategory( 'Spear', 'Tools' ).getModel( 'Bone' ) );
PLAYER.capital.production.produceOutputProducts( productJson1 );
// console.log( PLAYER.capital.production.findProductInCategory( 'Spear', 'Tools' ).getModel( 'Bone' ) );
// let productJson2 = {
//     "Wood":2,
//     "Water": 2
// };
// let exemplo = {...productJson1, ...productJson2};
// console.log(exemplo);

// console.log( PLAYER.capital.production.getCategoryProductNames( 'Tools' ) );
PLAYER.society.work.addAllToolModelMakingLabors();
// console.log( PLAYER.society.work.info.Labors.map( (laborClassInstance) => laborClassInstance.info.Name ) );

// console.log(PLAYER.capital.tools.toolList);

PLAYER.society.work.addLaborOrderTest( laborOrderInfo3 );







