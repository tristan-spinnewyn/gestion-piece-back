const CompositionDAO = require("../datamodel/dao/compositiondao")

module.exports = class CompositionService {
    constructor(db) {
        this.dao = new CompositionDAO(db)
    }
}