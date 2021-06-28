const RealisationDAO = require("../datamodel/dao/realisationdao")

module.exports = class RealisationService {
    constructor(db) {
        this.dao = new RealisationDAO(db)
    }
}