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
        this.getAvailable = () => this.info['Available'];
        this.getCapacity = () => this.info['Capacity'];
        this.setInfo = ( infoName, newInfo ) => this.info[infoName] = newInfo;
        this.getStorage = () => `${this.getAvailable()}/${this.getCapacity()}`;
    
        this.add = ( quantity ) => this.info["available"] += quantity;
        this.subtract = ( quantity ) => this.info["available"] -= quantity;
        this.addPlayer   = ( player ) => this.player = player;
    };