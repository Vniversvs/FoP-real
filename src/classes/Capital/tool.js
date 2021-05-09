export default function Tool ( info ) {
    this.info = info;
    this.addPlayer = ( player ) => this.player = player;

    this.getInfo = function ( infoName ) {
        return this.info[infoName];        
    };

    this.getModel = function ( model ) {
        return this.info['model'][model]
    };

    this.setQuantityModel = function ( model, quantity ) {
        this.getModel(model)['quantity'] = quantity;
    };

    this.setDurabilityModel = function ( model, quantity ) {
        this.getModel(model)['durability'] = quantity;
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

};