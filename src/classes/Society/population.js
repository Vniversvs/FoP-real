import fs from 'fs';

const populationJson 
= JSON.parse(fs.readFileSync('./DB/population.json'));

export default function Population ( popNumber ) {
    this.popNumber = popNumber;
    
    this.addPlayer = ( player ) => this.player = player;

    //amount of products consumed by each person every turn
    this.baseConsumption = {
        'Fruit':0.008,
        'Vegetables':0.007,
        'Seeds':0.005,
        'Meat':0.001,
        'Cereal':0.001,
        'Root':0.001,
        'Wood':0.001,
    }
};

// console.log( populationJson );


