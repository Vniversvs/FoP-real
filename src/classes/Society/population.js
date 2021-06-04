import fs from 'fs';

const populationJson 
= JSON.parse(fs.readFileSync('./DB/population.json'));

export default function Population ( info ) {
    this.info = info;
    
    this.addPlayer = ( player ) => this.player = player;
    this.getFreeLaboerers = () => this.info['Laborers']['Free']

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

    this.updateJson = function () {
        
    };

    this.checkFreeLaborers = function ( amount ) {
        return this.getFreeLaboerers() >= amount;
    };

    this.occupyLaborers = function ( amount ) {
        this.info['Laborers']['Free'] -= amount;
        this.info['Laborers']['Occupied'] += amount;
    };

    this.makeLaborersIdle = function () {
        this.info['Laborers']['Occupied'] -= amount;
        this.info['Laborers']['Free'] += amount;
    };

    this.getOccupationInfo = function () {
        return {
            'Free': this.info['Laborers']['Free'],
            'Occupied': this.info['Laborers']['Occupied']
        }
    }

    this.makePopulationJson = function () {
        return {
            'Occupation': this.getOccupationInfo()
        }
    };
};

// console.log( populationJson );


