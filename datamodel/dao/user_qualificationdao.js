const BaseDAO = require('../basedao')

module.exports = class UserQualificationDAO extends BaseDAO {
    constructor(db) {
        super(db,'user_qualification')
    }

    createTable(){
        return this.db.query("create table user_qualification (user_id INTEGER references users(id), plan_de_travail_id INTEGER references plan_de_travail(id), primary key(user_id,plan_de_travail_id))")
    }

    insert(user_qualification){
        return this.db.query("insert into user_qualification(user_id,plan_de_travail_id) values ($1,$2)",
            [
                user_qualification.user_id,
                user_qualification.plan_de_travail_id
            ])
    }

    getAll(plan_de_travail_id){
        return new Promise((resolve, reject) => {
            return this.db.query("SELECT * from plan_de_travail inner join user_qualification on plan_de_travail.id = user_qualification.plan_de_travail_id " +
                "inner join users on user_qualification.user_id = users.id where plan_de_travail_id = $1", [plan_de_travail_id])
                .then(res=>resolve(res.rows))
                .catch(e => reject(e))
        })
    }

    delete(user_qualification){
        return this.db.query("DELETE FROM user_qualification where user_id = $1 and plan_de_travail_id = $2",
            [user_qualification.user_id,user_qualification.plan_de_travail_id])
    }

    get(user_qualification){
        return new Promise(((resolve, reject) => {
            this.db.query("SELECT * FROM user_qualification where user_id = $1 and plan_de_travail_id = $2",
                [user_qualification.user_id,user_qualification.plan_de_travail_id])
                .then(res=>resolve(res.rows[0]))
                .catch(e => reject(e))
        }))
    }
}