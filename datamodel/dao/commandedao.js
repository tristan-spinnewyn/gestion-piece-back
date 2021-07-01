const BaseDAO = require('../basedao')

module.exports = class CommandeDAO extends BaseDAO {
    constructor(db) {
        super(db,'commande')
    }

    createTable(){
        return this.db.query("create table commande (id SERIAL PRIMARY KEY,date_commande date NOT NULL,client_id INTEGER references client(id))")
    }

    insert(commande){
        return new Promise(((resolve, reject) => {
            this.db.query("Insert into commande(date_commande,client_id) values ($1,$2) RETURNING id", [
                commande.date_commande,
                commande.client_id])
                .then(res =>resolve(res.rows[0].id))
                .catch(e=>reject(e))
        }))
    }

    getAll(){
        return new Promise((resolve,reject)=>{
            this.db.query("SELECT *,commande.id as idcommande FROM commande inner JOIN client on client_id= client.id")
                .then(res => resolve(res.rows))
                .catch(e => reject(e))
        })
    }
}