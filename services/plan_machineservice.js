const PlanMachineDAO = require("../datamodel/dao/plan_machinedao")

module.exports = class PlanMachineService {
    constructor(db) {
        this.dao = new PlanMachineDAO(db)
    }
}