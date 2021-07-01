const DevisDAO = require("../datamodel/dao/devisdao")

module.exports = class DevisService {
    constructor(db) {
        this.dao = new DevisDAO(db)
    }
}