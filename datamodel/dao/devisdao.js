const BaseDAO = require('../basedao')

module.exports = class DeviDAO extends BaseDAO {
    constructor(db) {
        super(db,'devis')
    }

    createTable(){
        return this.db.query("create table devis (id SERIAL PRIMARY KEY,status INTEGER DEFAULT 1,date_devis date NOT NULL,date_limite date NOT NULL,client_id INTEGER references client(id))")
    }

    insert(devis){
        return new Promise(((resolve, reject) => {
            this.db.query("Insert into devis(date_devis,date_limite,client_id) values ($1,$2,$3) RETURNING id", [
                devis.date_devis,
                devis.date_limite,
                devis.client_id])
                .then(res =>resolve(res.rows[0].id))
                .catch(e=>reject(e))
        }))
    }

    getAll(){
        return new Promise((resolve,reject)=>{
            this.db.query("SELECT *,devis.id as iddevis FROM devis inner JOIN client on client_id= client.id")
                .then(res => resolve(res.rows))
                .catch(e => reject(e))
        })
    }

    terminate(id_devis){
            this.db.query("UPDATE devis set status=2  where id=$1;",[
                id_devis
            ])

    }

    getById(id) {
        return new Promise((resolve,reject)=>{
            this.db.query("SELECT *,devis.id as iddevis from devis inner join client on client.id = client_id where devis.id = $1",[id])
                .then(res => resolve(res.rows[0]))
                .catch(e => reject(e))
        })
    }
}