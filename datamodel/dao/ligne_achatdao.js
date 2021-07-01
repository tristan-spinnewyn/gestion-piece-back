const BaseDAO = require('../basedao')

module.exports = class LigneAchatDAO extends BaseDAO {
    constructor(db) {
        super(db,'ligne_achat')
    }

    createTable(){
        return this.db.query("create table ligne_achat (id SERIAL PRIMARY KEY,prix decimal(18,2) not null,quantite INTEGER NOT NULL,mat_prem_id INTEGER null references mat_prem(id),piece_id INTEGER null references piece(id),achat_id INTEGER references achat(id))")
    }

    insert(ligne){
        return this.db.query("Insert into ligne_achat(prix,quantite,piece_id,achat_id,mat_prem_id) values ($1,$2,$3,$4,$5)", [
            ligne.prix,
            ligne.quantite,
            ligne.piece_id,
            ligne.achat_id,
            ligne.mat_prem_id
        ])
    }

    getAll(achat_id){
        return new Promise((resolve, reject) => {
            return this.db.query("SELECT *,ligne_achat.id as ligneid,ligne_achat.quantite as quantiteachat, ligne_achat.prix as prixachat from ligne_achat left join piece on piece.id = piece_id left join mat_prem on mat_prem.id = mat_prem_id where achat_id = $1", [achat_id])
                .then(res=>resolve(res.rows))
                .catch(e => reject(e))
        })
    }

}