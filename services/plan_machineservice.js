const PlanMachineDAO = require("../datamodel/dao/plan_machinedao")

module.exports = class UserRightService {
    constructor(db) {
        this.dao = new PlanMachineDAO(db)
    }
}