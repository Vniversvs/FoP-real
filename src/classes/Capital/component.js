export default function Component ( info ) {
        this.info = info;
    
        this.getInfo = ( infoName ) => this.info[infoName];
        this.getAvailable = () => this.info['Available'];    
        this.getCapacity = () => this.info['Capacity'];
        this.getStorage = () => `${this.getAvailable()}/${this.getCapacity()}`;
        this.setInfo = ( infoName, newInfo ) => this.info[infoName] = newInfo;
    
        this.add = ( quantity ) => this.info["available"] += quantity;
        this.subtract = ( quantity ) => this.info["available"] -= quantity;
        this.addPlayer   = ( player ) => this.player = player;
    
    };