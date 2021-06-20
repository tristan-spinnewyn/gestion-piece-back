const BaseDAO = require('../basedao')

module.exports = class MachineDAO extends BaseDAO {
    constructor(db) {
        super(db,'machine')
    }

    createTable(){
        return this.db.query("create table machine (id SERIAL PRIMARY KEY,label_machine TEXT NOT NULL)")
    }

    insert(machine){
        return this.db.query("Insert into machine(label_machine) values ($1)",[machine.label_machine])
    }

    getAll(){
        return new Promise((resolve,reject)=>{
            this.db.query("SELECT * FROM machine")
                .then(res => resolve(res.rows))
                .catch(e => reject(e))
        })
    }

    update(machine){
        return new Promise((resolve,reject)=>{
            this.db.query("UPDATE machine set label_machine=$1 where id=$2",[machine.label_machine,machine.id])
        })
    }
}