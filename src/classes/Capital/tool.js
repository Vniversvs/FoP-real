export default function Tool ( info ) {
    this.info = info;
    this.addPlayer = ( player ) => this.player = player;
    this.getInfo = ( infoName ) => this.info[infoName];
    this.getModelAvailable = ( modelName ) => this.getModel( modelName )['Quantity'];
    this.getModel = ( modelName ) => this.info['Models'][modelName];

    this.getAvailable = function () {
        let toolModelAvailable = {}; 
        for ( let modelName of Object.keys( this.info['Models']) ) {
            toolModelAvailable[modelName] = this.getModelAvailable( modelName )
        };
        return toolModelAvailable;
    };

    this.getCapacity = function () {
        let toolModelCapacity = {}; 
        for ( let modelName of Object.keys( this.info['Models']) ) {
            toolModelCapacity[modelName] = 0;
        };
        return toolModelCapacity;
    };

    this.getStorage = function () {
        let toolModelStorage = {}; 
        for ( let modelName of Object.keys( this.info['Models']) ) {
            toolModelStorage[modelName] = `${this.getModelAvailable( modelName )}/${0}`
        };
        return toolModelStorage;
    };

    this.addQuantityToModel = function ( model, quantity ) {
        this.getModel(model)['Quantity'] += quantity;
    };

    this.subtractQuantityToModel = function ( model, quantity ) {
        this.getModel(model)['Quantity'] -= quantity;
    };

    this.setDurabilityModel = function ( model, quantity ) {
        this.getModel(model)['Durability'] = quantity;
    };

    this.setCost = function ( model, newCostObject ) {
        this.getModel(model)['extra cost'] = newCostObject['extra']
        this.info['cost'] = newCostObject['base']
    };

    this.treatInfoForLabor = function () {
        return {
            'Labor Name': `Make ${this.info['Name']}`,
            'Product Input': [],
            'Product Output': [],
            'Tools': []
        }
    };

    this.initializeToolMakingLabor = function () {
        this.player.society.work.initializeLabor( this.info )
    };

    this.checkAvailability = function ( model, amount ) {
        return this.getModel( model );
    }

    this.addProductionPoints = function ( amount ) {
        this.info['Production Points'] += amount;
    };

    this.consumeProductionPoints = function ( amount ) {
        this.info['Production Points'] -= amount;
    };

    this.updateModelUpgradeInfo = function ( modelName ) {
        let upgradeInfo = this.getModel( modelName)['Upgrade'] 
        upgradeInfo['Level'] ++;
        upgradeInfo['Cost'] = Math.floor(upgradeInfo['Cost']**(1.20) + upgradeInfo['Cost']);
    };

    this.updateBaseUpgradeInfo = function ( modelName ) {
        let upgradeInfo = this.getModel( modelName)['Base Upgrade'] 
        upgradeInfo['Level'] ++;
        upgradeInfo['Cost'] = Math.floor(upgradeInfo['Cost']**(1.20) + upgradeInfo['Cost']);
    };

    this.updateModelEffectFormula = function ( effectCoefficient ) {
        return (Math.floor((100*effectCoefficient)**1.05))/100
    };

    this.updateBaseEffectFormula = function ( effectCoefficient ) {
        return (Math.floor((100*effectCoefficient)**1.12))/100
    };

    this.upgradeModel = function ( modelName ) {
        let toolModel = this.getModel( modelName );
        toolModel['Durability'] = Math.max( Math.floor( toolModel['Durability']*1.03), toolModel['Durability'] + 1);
        toolModel['Extra Input Effect'] = -this.updateModelEffectFormula( -toolModel['Extra Input Effect'] );
        toolModel['Extra Output Effect'] = this.updateModelEffectFormula( toolModel['Extra Output Effect'] ); 
        this.updateModelUpgradeInfo( modelName );
    };

    this.upgradeBase = function () {
        let upgradeInfo = this.info['Base Upgrade'] 
        upgradeInfo['Level'] ++;
        upgradeInfo['Cost'] = Math.floor(upgradeInfo['Cost']**(1.25) + 2*upgradeInfo['Cost']);
        this.info['Base Effect']['Output'] = this.updateBaseEffectFormula( this.info['Base Effect']['Output'] )
        this.info['Base Effect']['Input'] = -this.updateBaseEffectFormula( -this.info['Base Effect']['Input'] )
    };

    this.getBaseInfo = function (  ) {
        let baseInfo = this.info;
        let ret = {};
        // let infoNames = ['Base Upgrade', 'Base Cost', 'Base Effect'];
        // for ( let infoName of infoNames ) {
        //     ret[infoName]
        // }
        ret['Base Upgrade'] = baseInfo['Base Upgrade'];
        ret['Base Cost'] = baseInfo['Base Cost'];
        ret['Base Effect'] = baseInfo['Base Effect'];
        // return {
        //     'Base Upgrade': baseInfo['Base Upgrade'],
        //     'Base Cost': baseInfo['Base Cost'],
        //     'Base Effect': baseInfo['Base Effect'],
        // };
        return ret;
    }

    this.getTotalModelInfo = function ( modelName ) {
        let modelInfo = this.getModel( modelName );
        let baseInfo = this.getBaseInfo();

        return {
            'Total Cost': this.sumProductJsons( baseInfo['Base Cost'], modelInfo['Extra Cost'] ), 
            'Total Effect': this.sumProductJsons( baseInfo['Base Effect'], modelInfo['Extra Effect'] ),
            'Durability': modelInfo['Durability'],
            'Base Upgrade': baseInfo['Base Upgrade'],
            'Model Upgrade': modelInfo['Upgrade']
        }
    };

    this.makeToolJson = () => this.info;

};