const BaseDAO = require('../basedao')

module.exports = class AchatDAO extends BaseDAO {
    constructor(db) {
        super(db,'achat')
    }

    createTable(){
        return this.db.query("create table achat (id SERIAL PRIMARY KEY,date_achat DATE NOT NULL,date_livraison_prev DATE NOT NULL,date_livraison_reel DATE NULL, montant_tot DECIMAL (18, 2) NOT NULL, fournisseur_id INTEGER references fournisseur(id))")
    }

    insert(achat){
        return new Promise(((resolve, reject) => {
            this.db.query("Insert into achat(date_achat,date_livraison_prev,montant_tot,fournisseur_id) values ($1,$2,$3,$4) RETURNING id", [
                achat.date_achat,
                achat.date_livraison_prev,
                achat.montant_tot,
                achat.fournisseur_id])
                .then(res =>resolve(res.rows[0].id))
                .catch(e=>reject(e))
        }))
    }

    getAll(){
        return new Promise((resolve,reject)=>{
            this.db.query("SELECT *,achat.id as idachat from achat inner join fournisseur on fournisseur.id = fournisseur_id")
                .then(res => resolve(res.rows))
                .catch(e => reject(e))
        })
    }

    update(achat){
        return this.db.query("UPDATE achat set date_livraison_reel=$1, montant_tot=$2 where id=$3",[
            achat.date_livraison_reel,
            achat.montant_tot,
            achat.id
        ])
    }

    getById(id) {
        return new Promise((resolve,reject)=>{
            this.db.query("SELECT *,achat.id as idachat from achat inner join fournisseur on fournisseur.id = fournisseur_id where achat.id = $1",[id])
                .then(res => resolve(res.rows[0]))
                .catch(e => reject(e))
        })
    }
}