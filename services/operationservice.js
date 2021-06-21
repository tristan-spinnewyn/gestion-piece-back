const OperationDAO = require("../datamodel/dao/operationdao")

module.exports = class OperationService {
    constructor(db) {
        this.dao = new OperationDAO(db)
    }
}