const BaseDAO = require('../basedao')

module.exports = class GammeOperationDAO extends BaseDAO {
    constructor(db) {
        super(db,'gamme_operation')
    }

    createTable(){
        return this.db.query("create table gamme_operation (ordre INTEGER NOT NULL,operation_id INTEGER references operation(id),gamme_id INTEGER references gamme(id),primary key(operation_id,gamme_id))")
    }

    insert(gamme){
        return this.db.query("Insert into gamme_operation(operation_id,gamme_id,ordre) values ($1,$2,$3)", [
            gamme.operation_id,
            gamme.gamme_id,
            gamme.ordre
        ])
    }

    getAll(gamme_id){
        return new Promise((resolve, reject) => {
            return this.db.query("SELECT * from gamme inner join gamme_operation on gamme.id = gamme_operation.gamme_id " +
                "inner join operation on gamme_operation.operation_id = operation.id inner join plan_machine on plan_machine_id = plan_machine.id inner join machine on machine_id = machine.id inner join plan_de_travail on plan_de_travail_id = plan_de_travail.id where gamme_id = $1 order by ordre", [gamme_id])
                .then(res=>resolve(res.rows))
                .catch(e => reject(e))
        })
    }

    delete(gamme_operation){
        return this.db.query("DELETE FROM gamme_operation where gamme_id = $1 and operation_id = $2",
            [gamme_operation.gamme_id,gamme_operation.operation_id])
    }

    get(gamme_operation){
        return new Promise(((resolve, reject) => {
            this.db.query("SELECT * FROM gamme_operation where gamme_id = $1 and operation_id = $2",
                [gamme_operation.gamme_id,gamme_operation.operation_id])
                .then(res=>resolve(res.rows[0]))
                .catch(e => reject(e))
        }))
    }



}