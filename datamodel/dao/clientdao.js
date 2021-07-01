const BaseDAO = require('../basedao')

module.exports = class ClientDAO extends BaseDAO {
    constructor(db) {
        super(db,'client')
    }

    createTable(){
        return this.db.query("create table client (id SERIAL PRIMARY KEY,name_cli TEXT NOT NULL,cp_cli TEXT NOT NULL,ville_cli TEXT NOT NULL,adresse_cli TEXT NOT NULL, email_cli TEXT NOT NULL,tel_cli TEXT NOT NULL)")
    }

    insert(client){
        return this.db.query("Insert into client(name_cli,adresse_cli,email_cli,tel_cli,ville_cli,cp_cli) values ($1,$2,$3,$4,$5,$6)",
            [client.name_cli,client.adresse_cli,client.email_cli,client.tel_cli,client.ville_cli,client.cp_cli])
    }

    getAll(){
        return new Promise((resolve,reject)=>{
            this.db.query("SELECT * FROM client")
                .then(res => resolve(res.rows))
                .catch(e => reject(e))
        })
    }

    update(client){
        return new Promise((resolve,reject)=>{
            this.db.query("UPDATE client set name_cli=$1, adresse_cli=$2, email_cli=$3,tel_cli=$4, ville_cli=$5, cp_cli=$6 where id=$7",[
                client.name_cli,
                client.adresse_cli,
                client.email_cli,
                client.tel_cli,
                client.ville_cli,
                client.cp_cli,
                client.id
            ])
        })
    }
}