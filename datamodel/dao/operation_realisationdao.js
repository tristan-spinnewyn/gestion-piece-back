const BaseDAO = require('../basedao')

module.exports = class OperationRealisationDAO extends BaseDAO {
    constructor(db) {
        super(db,'operation_realisation')
    }

    createTable(){
        return this.db.query("create table operation_realisation (operation_id INTEGER references operation(id),realisation_id INTEGER references realisation(id),primary key(operation_id,realisation_id))")
    }

    insert(operation){
        return this.db.query("Insert into operation_realisation(operation_id,realisation_id) values ($1,$2)", [
            operation.operation_id,
            operation.realisation_id,
        ])
    }

    getAll(realisation_id){
        return new Promise((resolve, reject) => {
            return this.db.query("SELECT * from realisation inner join operation_realisation on realisation.id = operation_realisation.realisation_id " +
                "inner join operation on operation_realisation.operation_id = operation.id inner join plan_machine on plan_machine_id = plan_machine.id inner join machine on machine_id = machine.id inner join plan_de_travail on plan_de_travail_id = plan_de_travail.id where realisation_id = $1", [realisation_id])
                .then(res=>resolve(res.rows))
                .catch(e => reject(e))
        })
    }

    delete(operation_realisation){
        return this.db.query("DELETE FROM operation_realisation where realisation_id = $1 and operation_id = $2",
            [operation_realisation.realisation_id,operation_realisation.operation_id])
    }

    get(operation_realisation){
        return new Promise(((resolve, reject) => {
            this.db.query("SELECT * FROM operation_realisation where realisation_id = $1 and operation_id = $2",
                [operation_realisation.realisation_id,operation_realisation.operation_id])
                .then(res=>resolve(res.rows[0]))
                .catch(e => reject(e))
        }))
    }



}