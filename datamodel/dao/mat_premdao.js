const BaseDAO = require('../basedao')

module.exports = class MatPremDAO extends BaseDAO {
    constructor(db) {
        super(db, 'mat_prem')
    }

    createTable(){
        return this.db.query("create table mat_prem (id SERIAL PRIMARY KEY,lib_mat TEXT NOT NULL,quantite INTEGER NOT NULL,prix_achat TEXT NOT NULL, fournisseur_id INTEGER references fournisseur(id))")
    }

    insert(mat_prem){
        return this.db.query("Insert into mat_prem(lib_mat,prix_achat,fournisseur_id,quantite) values ($1,$2,$3,$4)", [
            mat_prem.lib_mat,
            mat_prem.prix_achat,
            mat_prem.fournisseur_id,
            mat_prem.quantite
        ])
    }

    getAll(){
        return new Promise((resolve,reject)=>{
            this.db.query("SELECT * from mat_prem")
                .then(res => resolve(res.rows))
                .catch(e => reject(e))
        })
    }

    update(mat_prem){
        return this.db.query("UPDATE mat_prem set lib_mat=$1, prix_achat=$2, fournisseur_id=$3,quantite=$4 where id=$5",[
            mat_prem.lib_mat,
            mat_prem.prix_achat,
            mat_prem.fournisseur_id,
            mat_prem.quantite,
            mat_prem.id
        ])
    }

    getMatPremFournisseur(fournisseur_id){
        return new Promise((resolve,reject)=>{
            this.db.query("SELECT * from mat_prem where fournisseur_id = $1",[fournisseur_id])
                .then(res => resolve(res.rows))
                .catch(e => reject(e))
        })
    }

    addStock(id,qte){
        return this.db.query("UPDATE mat_prem set quantite=quantite+$1 where id=$2",[
            qte,
            id
        ])
    }

    sousStock(id,qte){
        return this.db.query("UPDATE mat_prem set quantite=quantite-$1 where id=$2",[
            qte,
            id
        ])
    }
}