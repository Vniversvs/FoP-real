this.getStorage = function () {
    let toolModelStorage = {}; 
    for ( let modelName of Object.keys( this.info['Models']) ) {
        toolModelStorage[modelName] = `${this.getModelAvailable( modelName )}/${0}`
    };
    return toolModelStorage;
};