const BaseDAO = require('../basedao')

module.exports = class PieceDAO extends BaseDAO {
    constructor(db) {
        super(db,'piece')
    }

    createTable(){
        return this.db.query("create table piece (id SERIAL PRIMARY KEY,quantite INTEGER NOT NULL,lib_piece TEXT NOT NULL,prix_vente DECIMAL(18, 2) NOT NULL, prix_achat DECIMAL (18, 2) NOT NULL,type_id INTEGER references type_piece(id), fournisseur_id INTEGER references fournisseur(id))")
    }

    insert(piece){
        return new Promise(((resolve, reject) => {
            this.db.query("Insert into piece(lib_piece,prix_vente,prix_achat,type_id,fournisseur_id,quantite) values ($1,$2,$3,$4,$5,$6) RETURNING id", [
                piece.lib_piece,
                piece.prix_vente,
                piece.prix_achat,
                piece.type_id,
                piece.fournisseur_id,
                piece.quantite])
                .then(res =>resolve(res.rows[0].id))
                .catch(e=>reject(e))
        }))
    }

    getAll(){
        return new Promise((resolve,reject)=>{
            this.db.query("SELECT *,piece.id as idpiece FROM piece LEFT JOIN type_piece on type_id = type_piece.id LEFT JOIN fournisseur on fournisseur_id= fournisseur.id")
                .then(res => resolve(res.rows))
                .catch(e => reject(e))
        })
    }

    update(piece){
            return this.db.query("UPDATE piece set lib_piece=$1, prix_vente=$2, prix_achat=$3, fournisseur_id=$4 where id=$5",[
                piece.lib_piece,
                piece.prix_vente,
                piece.prix_achat,
                piece.fournisseur_id,
                piece.id
            ])

    }
}