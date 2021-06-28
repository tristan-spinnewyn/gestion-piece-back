const MatPremDAO = require("../datamodel/dao/mat_premdao")

module.exports = class MatPremService {
    constructor(db) {
        this.dao = new MatPremDAO(db)
    }
}