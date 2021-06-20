const RightsDAO = require("../datamodel/dao/rightsdao")
module.exports = class RightsService{
    constructor(db) {
        this.dao = new RightsDAO(db)
    }
}