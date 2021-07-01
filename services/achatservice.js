const AchatDAO = require("../datamodel/dao/achatdao")

module.exports = class AchatService {
    constructor(db) {
        this.dao = new AchatDAO(db)
    }
}