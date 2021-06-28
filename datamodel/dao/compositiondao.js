const BaseDAO = require('../basedao')

module.exports = class CompositionDAO extends BaseDAO {
    constructor(db) {
        super(db, 'composition')
    }

    createTable(){
        return this.db.query("create table composition (id SERIAL PRIMARY KEY,quantite INTEGER NOT NULL, " +
            "piece_maitre INTEGER references piece(id),piece_composite INTEGER references piece(id),mat_composite INTEGER references mat_prem(id) )")
    }

    insert(composition){
        return this.db.query("Insert into composition(quantite,piece_maitre,piece_composite,mat_composite) values ($1,$2,$3,$4)", [
            composition.quantite*1,
            composition.piece_maitre,
            composition.piece_composite,
            composition.mat_composite
        ])
    }

    getAll(piece_id){
        return new Promise((resolve,reject)=>{
            this.db.query("SELECT *,composition.id as compoid,composition.quantite as compoqte from composition left join piece on piece.id = piece_composite left join mat_prem on mat_prem.id = mat_composite where piece_maitre = $1",[piece_id])
                .then(res => resolve(res.rows))
                .catch(e => reject(e))
        })
    }

    update(composition){
        return this.db.query("UPDATE composition set quantite=$1, piece_maitre=$2, piece_composite=$3, mat_composite=$4 where id=$5",[
            composition.quantite*1,
            composition.piece_maitre,
            composition.piece_composite,
            composition.mat_composite,
            composition.id
        ])

    }
}