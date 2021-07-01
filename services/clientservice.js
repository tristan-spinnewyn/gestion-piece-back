const ClientDAO = require("../datamodel/dao/clientdao")

module.exports = class ClientService {
    constructor(db) {
        this.dao = new ClientDAO(db)
    }
}