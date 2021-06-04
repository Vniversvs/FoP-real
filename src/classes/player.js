export default function Player ( society, capital, knowledge, nature) {
    this.society = society;
    this.capital = capital;
    this.knowledge = knowledge;
    this.nature = nature;

    this.passTurn = function () {
        for ( let laborOrder of this.society.work.info['Labor Orders'] ) {
            // console.log( laborOrder.info['Id'] );
            this.society.work.performLaborOrder( laborOrder );
            this.society.work.removeLaborOrder( laborOrder.info['Id'] );
            this.capital.addToolProductionPoints( laborOrder );
        };
    };

    this.getTurnInfo = function () {

    };

    this.makeBigJson = function () {
        return {
            'Society': this.society.makeSocietyJson(),
            'Capital': this.capital.makeCapitalJson()
        };
    };

};
