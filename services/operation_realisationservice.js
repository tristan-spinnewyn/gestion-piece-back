const OperationRealisationDAO = require("../datamodel/dao/operation_realisationdao")

module.exports = class OperationRealisationService {
    constructor(db) {
        this.dao = new OperationRealisationDAO(db)
    }
}