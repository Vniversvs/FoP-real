export default function LaborOrder ( info ) {
    // info = numberofWorkers, laborname, tool
    this.info = info;
    // this.addPlayer = ( player ) => this.player = player;

    this.addPlayer = function ( player ) {
        this.player = player;
        this.currentInfo = this.getOrderInfo();
    }
    this.performLaborOrder = function (  ) {
        
    };

    this.getOrderInfo = function () {
        var currentTools = [];
        for ( var toolName of this.info['Tools'] ) {
            currentTools.push( this.player.capital.production.findProduct( toolName )['Result'] ) 
        }
        var currentLabor = this.player.society.work.findLabor( this.info['Labor'] )
        return {
            'Labor': currentLabor,
            'Tools': currentTools,
            'Laborers': this.info['Laborers']
        };
    };

    this.calculateInputJson = function () {
        var untreatedInput = this.currentInfo['Labor'].info['Input'];
        for ( var inputName of Object.keys( untreatedInput ) ) {
            var tie = this.currentInfo["Tools"][0].info['Base Effect']['Input']; // tie: Tool input Effect
            var nil = this.info['Laborers'] // nl = Number of Laborers
            untreatedInput[ inputName ] *= tie * nil;
        };
        return untreatedInput;
    };

    this.calculateOutputJson = function () {
        var untreatedOutput = this.currentInfo['Labor'].info['Output'];
        for ( var outputName of Object.keys( untreatedOutput ) ) {
            var toe = this.currentInfo["Tools"][0].info['Base Effect']['Output'];
            var nol = this.info['Laborers'];
            untreatedOutput[ outputName ] *= toe * nol;
        };
        return untreatedOutput;
    };
};