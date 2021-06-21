const TypePieceDAO = require("../datamodel/dao/type_piecedao")

module.exports = class TypePieceService {
    constructor(db) {
        this.dao = new TypePieceDAO(db)
    }
}