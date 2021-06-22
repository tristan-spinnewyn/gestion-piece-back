const BaseDAO = require('../basedao')

module.exports = class GammeDAO extends BaseDAO {
    constructor(db) {
        super(db,'gamme')
    }

    createTable(){
        return this.db.query("create table gamme (id SERIAL PRIMARY KEY,lib_gamme TEXT NOT NULL,user_id INTEGER references users(id), piece_id INTEGER references piece(id))")
    }

    insert(gamme){
        return this.db.query("Insert into gamme(lib_gamme,user_id,piece_id) values ($1,$2,$3)", [
            gamme.lib_gamme,
            gamme.user_id,
            gamme.piece_id
        ])
    }

    getAll(){
        return new Promise((resolve,reject)=>{
            this.db.query("SELECT * FROM gamme")
                .then(res => resolve(res.rows))
                .catch(e => reject(e))
        })
    }

    update(gamme){
            return this.db.query("UPDATE gamme set lib_gamme=$1, user_id=$2 where id=$3",[
                gamme.lib_gamme,
                gamme.user_id,
                gamme.id
            ])

    }

    getByPiece(piece_id){
        return new Promise(((resolve, reject) => {
            this.db.query("SELECT * FROM gamme where piece_id = $1 ",
                [piece_id])
                .then(res=>resolve(res.rows[0]))
                .catch(e => reject(e))
        }))
    }
}