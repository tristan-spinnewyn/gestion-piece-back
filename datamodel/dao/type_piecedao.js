const BaseDAO = require('../basedao')

module.exports = class TypePieceDAO extends BaseDAO {
    constructor(db) {
        super(db,'type_piece')
    }

    createTable(){
        return this.db.query("create table type_piece (id SERIAL PRIMARY KEY,label_type TEXT NOT NULL)")
    }

    insert(type){
        return this.db.query("Insert into type_piece(label_type) values ($1)",[type.label_type])
    }

    getAll(){
        return new Promise((resolve,reject)=>{
            this.db.query("SELECT * FROM type_piece")
                .then(res => resolve(res.rows))
                .catch(e => reject(e))
        })
    }
}