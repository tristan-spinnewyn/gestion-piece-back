const BaseDAO = require('../basedao')

module.exports = class LigneAchatDAO extends BaseDAO {
    constructor(db) {
        super(db,'ligne_devis')
    }

    createTable(){
        return this.db.query("create table ligne_devis (prix decimal(18,2) not null,qte INTEGER NOT NULL,commande_id INTEGER null references commande(id),piece_id INTEGER references piece(id),devis_id INTEGER references devis(id), primary key(devis_id,piece_id))")
    }

    insert(ligne){
        return this.db.query("Insert into ligne_devis(prix,qte,piece_id,devis_id) values ($1,$2,$3,$4)", [
            ligne.prix,
            ligne.qte,
            ligne.piece_id,
            ligne.devis_id
        ])
    }

    getAll(devis_id){
        return new Promise((resolve, reject) => {
            return this.db.query("SELECT * , ligne_devis.prix as prix_ligne from ligne_devis inner join piece on piece.id = piece_id where devis_id = $1", [devis_id])
                .then(res=>resolve(res.rows))
                .catch(e => reject(e))
        })
    }

    getAllForSetCommande(client_id){
        return new Promise((resolve, reject) => {
            return this.db.query("SELECT *  from ligne_devis inner join piece on piece.id = piece_id inner join devis on devis_id = devis.id where client_id = $1 and status = 2 and commande_id is null and devis.date_limite >= CURRENT_DATE ", [client_id])
                .then(res=>resolve(res.rows))
                .catch(e => reject(e))
        })
    }

    getAllInCommande(commande_id){
        return new Promise((resolve, reject) => {
            return this.db.query("SELECT * from ligne_devis inner join piece on piece.id = piece_id where commande_id = $1", [commande_id])
                .then(res=>resolve(res.rows))
                .catch(e => reject(e))
        })
    }

    getPieceInCommande(commande_id,piece_id){
        return new Promise((resolve, reject) => {
            return this.db.query("SELECT * from ligne_devis left join piece on piece.id = piece_id where commande_id = $1 and piece_id = $2", [commande_id,piece_id])
                .then(res=>resolve(res.rows[0]))
                .catch(e => reject(e))
        })
    }

    setCommande(id_piece,id_devis,id_commande){
            return this.db.query("UPDATE ligne_devis set commande_id=$1  where piece_id=$2 and devis_id=$3",[
                id_commande,
                id_piece,
                id_devis,
            ])

    }

}