const BaseDAO = require('../basedao')

module.exports = class UserRightDAO extends BaseDAO {
    constructor(db) {
        super(db,'user_right')
    }

    createTable(){
        return this.db.query("create table user_right (user_id INTEGER references users(id), right_id INTEGER references rights(id), primary key(user_id,right_id))")
    }

    insert(user_role){
        return this.db.query("insert into user_right(user_id,right_id) values ($1,$2)",
            [
                user_role.user_id,
                user_role.right_id
            ])
    }

    getAll(user_id){
        return new Promise((resolve, reject) => {
            return this.db.query("SELECT * from users inner join user_right on users.id = user_right.user_id " +
                "inner join rights on user_right.right_id = rights.id where user_id = $1", [user_id])
                .then(res=>resolve(res.rows))
                .catch(e => reject(e))
        })
    }

    delete(user_role){
        return this.db.query("DELETE FROM user_right where user_id = $1 and right_id = $2",
            [user_role.user_id,user_role.right_id])
    }

    get(user_role){
        return new Promise(((resolve, reject) => {
            this.db.query("SELECT * FROM user_right where user_id = $1 and right_id = $2",
                [user_role.user_id,user_role.right_id])
                .then(res=>resolve(res.rows[0]))
                .catch(e => reject(e))
        }))
    }
}