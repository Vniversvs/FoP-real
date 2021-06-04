export default function LaborOrder ( info ) {
    this.info = info;

    this.addPlayer = function ( player ) {
        this.player = player;
        this.currentInfo = this.getOrderInfo();
    };

    this.getOrderInfo = function () {
        var currentTools = [];
        for ( var toolName of Object.keys( this.info['Tools'] ) ) {
            currentTools.push( this.player.capital.production.findProductInCategory( toolName, 'Tools' ) ) 
        }
        var currentLabor = this.player.society.work.findLabor( this.info['Labor'] )
        return {
            'Labor': currentLabor,
            'Tools': currentTools,
            'Laborers': this.info['Laborers']
        };
    };

    this.calculateInputJson = function () {
        let treatedInputJson = {};
        let production = this.player.capital.production
        let tmie = production.calculateToolModelInputEffect( this.info['Tools'] );
        var untreatedInput = this.currentInfo['Labor'].info['Input'];
        for ( var inputName of Object.keys( untreatedInput ) ) {
            var nil = this.info['Laborers'] // nl = Number of Laborers
            let bli = untreatedInput[ inputName ]; 
            treatedInputJson[inputName] = bli * tmie * nil;
        };
        return treatedInputJson;
    };

    this.calculateOutputJson = function () {
        let treatedOutputJson = {};
        var untreatedOutput = this.currentInfo['Labor'].info['Output'];
        for ( var outputName of Object.keys( untreatedOutput ) ) {
            var toe = 1 + this.currentInfo["Tools"][0].info['Base Effect']['Output'];
            var nol = this.info['Laborers'];
            let blo = untreatedOutput[ outputName ];
            treatedOutputJson[outputName] = blo * toe * nol;
        };
        return treatedOutputJson;
    };

    this.getToolInfo = function (  ) {
        let ret = {};
        let output = this.calculateOutputJson();
        for ( let outputName of Object.keys(output) ) {
            if ( this.player.capital.production.findProduct( outputName )['Category'] === 'Tools') {
                ret[outputName] = Math.floor( output[outputName] );
            }
        };
        for ( let tool of Object.keys(this.info['Tools']) ) {
            if( Object.keys( ret ).includes(tool) ) {
                ret[tool] += this.info['Laborers']
            } else {
                ret[tool] = this.info['Laborers']
            };
        };
        return ret;
    };

    this.calculateProductChange = function ( productName ) {
        let productChange = 0;
        let productChangeJson = {};
        if ( this.calculateOutputJson()[productName] !== undefined ) {
            productChange += this.calculateOutputJson()[productName]
        };
        if ( this.calculateInputJson()[productName] !== undefined ) {
            productChange -= this.calculateInputJson()[productName]
        };
        productChangeJson[productName] = productChange;
        return productChangeJson;
    };

    this.getToolModelInfo = () => this.info['Tools'];

};