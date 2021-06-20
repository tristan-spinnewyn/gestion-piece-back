const PlanDeTravailDAO = require("../datamodel/dao/plan_de_travaildao")

module.exports = class UserRightService {
    constructor(db) {
        this.dao = new PlanDeTravailDAO(db)
    }
}