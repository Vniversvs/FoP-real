export default function Resource ( info ) {
//  info = id, name, availability, capacity, resourceCategory, requirements ]

    this.info = info;

    this.getInfo = ( infoName ) => this.info[infoName];

    this.setInfo = ( infoName, newInfo ) => this.info[infoName] = newInfo;

    this.add = ( quantity ) => this.info["Available"] += quantity;
    this.subtract = ( quantity ) => this.info["Available"] -= quantity;
    this.addPlayer   = ( player ) => this.player = player;

};



