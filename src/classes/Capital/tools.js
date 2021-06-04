export default function Tools ( info ) {
    this.info = info;
    
    this.initializeToolModelMakingLabor = function ( toolName, modelName ) {
        let modelTotalInfo = this.player.capital.production.getTotalModelInfo( toolName, modelName );
        console.log(modelTotalInfo); 
    };

    // this.addPlayer = ( player ) => this.player = player;
    this.addPlayer = function ( player ) {
        this.player = player;
        this.toolList = this.player.capital.production.info['Tools'];
    };
};