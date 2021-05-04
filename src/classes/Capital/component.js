export default function Component ( info ) {
    //   var info = [
    //     name,
    //     model,
    //     availability, 
    //     capacity, 
    //     componentCategory, 
    //     requirements, etc...   
    //   ]
    
        this.info = info;
    
        this.getInfo = ( infoName ) => this.info[infoName];
    
        this.setInfo = ( infoName, newInfo ) => this.info[infoName] = newInfo;
    
        this.add = ( quantity ) => this.info["available"] += quantity;
        this.subtract = ( quantity ) => this.info["available"] -= quantity;
        this.addPlayer   = ( player ) => this.player = player;
    
    };