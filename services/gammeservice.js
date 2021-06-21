const GammeDAO = require("../datamodel/dao/gammedao")

module.exports = class GammeService {
    constructor(db) {
        this.dao = new GammeDAO(db)
    }
}