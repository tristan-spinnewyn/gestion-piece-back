const PieceDAO = require("../datamodel/dao/piecedao")

module.exports = class PieceService {
    constructor(db) {
        this.dao = new PieceDAO(db)
    }
}