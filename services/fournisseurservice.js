const FournisseurDAO = require("../datamodel/dao/fournisseurdao")

module.exports = class FournisseurService {
    constructor(db) {
        this.dao = new FournisseurDAO(db)
    }
}