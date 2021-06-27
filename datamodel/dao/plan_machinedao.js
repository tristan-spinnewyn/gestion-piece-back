const BaseDAO = require('../basedao')

module.exports = class PlanMachineDAO extends BaseDAO {
    constructor(db) {
        super(db,'plan_machine')
    }

    createTable(){
        return this.db.query("create table plan_machine (id SERIAL PRIMARY KEY,machine_id INTEGER references machine(id), plan_de_travail_id INTEGER references plan_de_travail(id))")
    }

    insert(plan_machine){
        return this.db.query("insert into plan_machine(machine_id,plan_de_travail_id) values ($1,$2)",
            [
                plan_machine.machine_id,
                plan_machine.plan_de_travail_id
            ])
    }

    getAll(machine_id){
        return new Promise((resolve, reject) => {
            return this.db.query("SELECT * from plan_de_travail inner join plan_machine on plan_de_travail.id = plan_machine.plan_de_travail_id " +
                "inner join machine on plan_machine.machine_id = machine.id where machine_id = $1", [machine_id])
                .then(res=>resolve(res.rows))
                .catch(e => reject(e))
        })
    }

    delete(plan_machine){
        return this.db.query("DELETE FROM plan_machine where machine_id = $1 and plan_de_travail_id = $2",
            [plan_machine.machine_id,plan_machine.plan_de_travail_id])
    }

    get(plan_machine){
        return new Promise(((resolve, reject) => {
            this.db.query("SELECT * FROM plan_machine where machine_id = $1 and plan_de_travail_id = $2",
                [plan_machine.machine_id,plan_machine.plan_de_travail_id])
                .then(res=>resolve(res.rows[0]))
                .catch(e => reject(e))
        }))
    }

    getAllOp(){
        return new Promise((resolve, reject) => {
            return this.db.query("SELECT *, plan_machine.id as planmachineid from plan_machine inner join plan_de_travail on plan_de_travail.id = plan_machine.plan_de_travail_id " +
                "inner join machine on plan_machine.machine_id = machine.id")
                .then(res=>resolve(res.rows))
                .catch(e => reject(e))
        })
    }
}