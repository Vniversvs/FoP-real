export default function Component ( info ) {
    //   info = name, availability, capacity, componentcategory, requirements
    
        this.info = info;
    
        this.getInfo = ( infoName ) => this.info[infoName];
    
        this.setInfo = ( infoName, newInfo ) => this.info[infoName] = newInfo;
    
        this.add = ( quantity ) => this.info["available"] += quantity;
        this.subtract = ( quantity ) => this.info["available"] -= quantity;
        this.addPlayer   = ( player ) => this.player = player;
    
    };