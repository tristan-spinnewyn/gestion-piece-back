const GammeOperationDAO = require("../datamodel/dao/gamme_operationdao")

module.exports = class GammeOperationService {
    constructor(db) {
        this.dao = new GammeOperationDAO(db)
    }
}