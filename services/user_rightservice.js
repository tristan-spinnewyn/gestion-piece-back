const UserRightDAO = require("../datamodel/dao/user_rightdao")

module.exports = class UserRightService {
    constructor(db) {
        this.dao = new UserRightDAO(db)
    }
}