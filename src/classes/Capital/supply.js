export default function Supply ( info ) {
    //   var info = [
    //     name, 
    //     availability, 
    //     capacity, 
    //     supplyCategory, 
    //     requirements,   
    //   ]
    
        this.info = info;
    
        this.getInfo = ( infoName ) => this.info[infoName];
    
        this.setInfo = ( infoName, newInfo ) => this.info[infoName] = newInfo;
    
        this.add = ( quantity ) => this.info["available"] += quantity;
        this.subtract = ( quantity ) => this.info["available"] -= quantity;
        this.addPlayer   = ( player ) => this.player = player;
    };