export default function Resource ( info ) {
//   var info = [
//     id,
//     name, 
//     availability, 
//     capacity, 
//     resourceCategory, 
//     requirements,   
//   ]

    this.info = info;

    this.getInfo = ( infoName ) => this.info[infoName];

    this.setInfo = ( infoName, newInfo ) => this.info[infoName] = newInfo;

    this.add = ( quantity ) => this.info["available"] += quantity;
    this.subtract = ( quantity ) => this.info["available"] -= quantity;
    this.addPlayer   = ( player ) => this.player = player;

};



// console.log(wood.getInfo("available"));
// wood.add( 50 );
// console.log(wood.getInfo("available"));
// wood.subtract( 90 );
// console.log(wood.getInfo("available"));





