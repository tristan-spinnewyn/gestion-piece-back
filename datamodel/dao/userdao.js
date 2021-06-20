const BaseDAO = require('../basedao')

module.exports = class UserDAO extends BaseDAO {
    constructor(db) {
        super(db,'users')
    }

    createTable(){
        return this.db.query("create table users (id SERIAL PRIMARY KEY,firstname TEXT NOT NULL,lastname TEXT NOT NULL,email TEXT NOT NULL,pwd TEXT NOT NULL)")
    }

    insert(user){
        return this.db.query("INSERT INTO users(firstname,lastname,email,pwd) values ($1,$2,$3,$4)",
            [
                user.firstname,
                user.lastname,
                user.email,
                user.pwd
            ])
    }
    getByLogin(login){
        return new Promise(((resolve, reject) => {
            this.db.query("SELECT * from users where email = $1",[login])
                .then(res => resolve(res.rows[0]))
                .catch(e => reject(e))
        }))
    }

    getAll(){
        return new Promise((resolve,reject)=>{
            this.db.query("SELECT * FROM users")
                .then(res => resolve(res.rows))
                .catch(e => reject(e))
        })
    }

    updateWithPassword(user){
        return this.db.query("update users set firstname=$1, lastname =$2, pwd=$3, email=$4 where id=$5",
            [
                user.firstname,
                user.lastname,
                user.pwd,
                user.email,
                user.id
            ])
    }

    updateWithoutPassword(user){
        return this.db.query("update users set firstname=$1, lastname =$2, email=$3 where id=$4",
            [
                user.firstname,
                user.lastname,
                user.email,
                user.id
            ])
    }

    getRights(id){
        return new Promise((resolve,reject)=>{
            this.db.query("SELECT label_right FROM rights inner join user_right on rights.id = user_right.right_id where user_id = $1", [id])
                .then(res => resolve(res.rows))
                .catch(e => reject(e))
        })
    }

    getOuvrier(){
        return new Promise((resolve,reject)=>{
            this.db.query("SELECT * from users inner join user_right on users.id = user_right.user_id where right_id = 2")
                .then(res=>resolve(res.rows))
                .catch(e=>reject(e))
        })
    }
}