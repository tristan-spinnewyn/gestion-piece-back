const UserQualificationDAO = require("../datamodel/dao/user_qualificationdao")

module.exports = class UserRightService {
    constructor(db) {
        this.dao = new UserQualificationDAO(db)
    }
}