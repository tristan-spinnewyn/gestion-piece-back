const MachineDAO = require("../datamodel/dao/machinedao")

module.exports = class UserRightService {
    constructor(db) {
        this.dao = new MachineDAO(db)
    }
}