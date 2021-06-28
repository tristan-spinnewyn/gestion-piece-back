const BaseDAO = require('../basedao')

module.exports = class RealisationDAO extends BaseDAO {
    constructor(db) {
        super(db, 'realisation')
    }

    createTable(){
        return this.db.query("create table realisation (id SERIAL PRIMARY KEY,date_rea DATE NOT NULL,gamme_id INTEGER REFERENCES gamme(id))" )
    }

    insert(realisation){
        return this.db.query("Insert into realisation(date_rea,gamme_id) values ($1,$2)", [
            realisation.date_rea,
            realisation.gamme_id
        ])
    }

    getAll(){
        return new Promise((resolve,reject)=>{
            this.db.query("SELECT *,realisation.id as reaid from realisation inner join gamme on gamme.id = gamme_id inner join piece on piece_id = piece.id")
                .then(res => resolve(res.rows))
                .catch(e => reject(e))
        })
    }

    update(realisation){
        return this.db.query("UPDATE realisation set date_rea=$1, gamme_id=$2nwhere id=$3",[
            realisation.date_rea,
            realisation.gamme_id,
            realisation.id
        ])

    }
}