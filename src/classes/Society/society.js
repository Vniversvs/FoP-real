// import Population from './src/classes/Society/population.js';
// const population = new Population( 100 );

export default function Society ( population, work ) {
    this.population = population;
    this.work = work;

    this.addPlayer = ( player ) => this.player = player;

};