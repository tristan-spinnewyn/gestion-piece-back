const CommandeDAO = require("../datamodel/dao/commandedao")

module.exports = class CommandeService {
    constructor(db) {
        this.dao = new CommandeDAO(db)
    }
}