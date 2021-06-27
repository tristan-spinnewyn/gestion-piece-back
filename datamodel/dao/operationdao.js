const BaseDAO = require('../basedao')

module.exports = class OperationDAO extends BaseDAO {
    constructor(db) {
        super(db,'operation')
    }

    createTable(){
        return this.db.query("create table operation (id SERIAL PRIMARY KEY,duree INTEGER NOT NULL,plan_machine_id INTEGER references plan_machine(id))")
    }

    insert(operation){
        return this.db.query("Insert into operation(duree,plan_machine_id) values ($1,$2)", [
            operation.duree,
            operation.plan_machine_id,
        ])
    }

    getAll(){
        return new Promise((resolve,reject)=>{
            this.db.query("SELECT *,operation.id as opid FROM operation inner join plan_machine on plan_machine_id = plan_machine.id inner join machine on machine_id = machine.id inner join plan_de_travail on plan_de_travail_id = plan_de_travail.id")
                .then(res => resolve(res.rows))
                .catch(e => reject(e))
        })
    }

    update(operation){
            return this.db.query("UPDATE operation set duree=$1, plan_machine_id=$2 where id=$3",[
                operation.duree,
                operation.plan_machine_id,
                operation.id
            ])

    }
    getByid(id){
        return new Promise((resolve,reject)=>{
            this.db.query("SELECT *,operation.id as opid FROM operation inner join plan_machine on plan_machine_id = plan_machine.id inner join machine on machine_id = machine.id inner join plan_de_travail on plan_de_travail_id = plan_de_travail.id where operation.id = $1",[id])
                .then(res => resolve(res.rows))
                .catch(e => reject(e))
        })
    }
}