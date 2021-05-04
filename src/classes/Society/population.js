export default function Population ( popNumber ) {
    this.popNumber = popNumber;
    
    this.addPlayer = function ( player ) {
        this.player = player;
    };

    this.baseComsumption = {}
};