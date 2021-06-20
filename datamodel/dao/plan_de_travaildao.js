const BaseDAO = require('../basedao')

module.exports = class PlanDeDeTravailDAO extends BaseDAO {
    constructor(db) {
        super(db,'plan_de_travail')
    }

    createTable(){
        return this.db.query("create table plan_de_travail (id SERIAL PRIMARY KEY,label_travail TEXT NOT NULL)")
    }

    insert(planTravail){
        return this.db.query("Insert into plan_de_travail(label_travail) values ($1)",[planTravail.label_travail])
    }

    getAll(){
        return new Promise((resolve,reject)=>{
            this.db.query("SELECT * FROM plan_de_travail")
                .then(res => resolve(res.rows))
                .catch(e => reject(e))
        })
    }

    update(planTravail){
        return new Promise((resolve,reject)=>{
            this.db.query("UPDATE plan_de_travail set label_travail=$1 where id=$2",[planTravail.label_travail,planTravail.id])
        })
    }
}