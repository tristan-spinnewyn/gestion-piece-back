const BaseDAO = require('../basedao')

module.exports = class FournisseurDAO extends BaseDAO {
    constructor(db) {
        super(db,'fournisseur')
    }

    createTable(){
        return this.db.query("create table fournisseur (id SERIAL PRIMARY KEY,name_fournisseur TEXT NOT NULL,adresse TEXT NOT NULL, email TEXT NOT NULL,TEL TEXT NOT NULL)")
    }

    insert(fournisseur){
        return this.db.query("Insert into fournisseur(name_fournisseur,adresse,email,tel) values ($1,$2,$3,$4)",
            [fournisseur.name_fournisseur,fournisseur.adresse,fournisseur.email,fournisseur.tel])
    }

    getAll(){
        return new Promise((resolve,reject)=>{
            this.db.query("SELECT * FROM fournisseur")
                .then(res => resolve(res.rows))
                .catch(e => reject(e))
        })
    }

    update(fournisseur){
        return new Promise((resolve,reject)=>{
            this.db.query("UPDATE fournisseur set name_fournisseur=$1, adresse=$2, email=$3,tel=$4 where id=$5",[
                fournisseur.name_fournisseur,
                fournisseur.adresse,
                fournisseur.email,
                fournisseur.tel,
                fournisseur.id
            ])
        })
    }
}