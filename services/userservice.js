const UserRightDAO = require("../datamodel/dao/user_rightdao")
const UserDao = require("../datamodel/dao/userdao")
const User = require('../datamodel/classes/user')
const bcrypt = require('bcrypt')
const RightsDAO = require("../datamodel/dao/rightsdao");

module.exports = class UserService {
    constructor(db) {
        this.dao = new UserDao(db)
        this.userRightDao = new UserRightDAO(db)
        this.RightDao = new RightsDAO(db)
    }

    insert(firstname,lastname,email,password){
        return this.dao.insert(new User(firstname,lastname,email, this.hashPassword(password)))
    }

    update(user){
        console.log(user.pwd)
        if(user.pwd !== '' && user.pwd !== null && user.pwd !== undefined){
            user.pwd = this.hashPassword(user.pwd)
            return this.dao.updateWithPassword(user)
        }else{
            return this.dao.updateWithoutPassword(user)
        }


    }

    async validatePassword(login,password){
        const user = await this.dao.getByLogin(login.trim())
        if(!user){
            return false
        }
        return this.comparePassword(password,user.pwd)
    }
    comparePassword(password,hash){
        return bcrypt.compareSync(password,hash)
    }
    hashPassword(pwd){
        return bcrypt.hashSync(pwd,10)
    }

    async isAdmin(user_id){
        const role = await this.userRightDao.getAll(user_id)
        for(let aRole of role){
            if(aRole.right_id === 1){
                return true
            }
        }
        return false
    }
    
}