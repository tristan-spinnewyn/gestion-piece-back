const Rights = require('./classes/rights')
const User = require('./classes/user')
const UserRight = require('./classes/user_right')

module.exports = (rightsService,
    userRightService,
    userService,
    ) => {
    return new Promise(async (resolve, reject) => {
        try {
            await rightsService.dao.db.connect((err, client, release) => {
                if (err) {
                    console.log(err);
                } else {
                    return console.log("connnected");
                }
            })

            await userService.dao.createTable()
            await rightsService.dao.createTable()
            await userRightService.dao.createTable()
            
            // INSERTs

            await rightsService.dao.insert(new Rights("Admin"))
            await rightsService.dao.insert(new Rights('Ouvrier'))
            await rightsService.dao.insert(new Rights('Gestion'))
    
            await userService.insert('Tristan','Spinnewyn',"tristan.spinnewyn@gmail.com", "azerty")
                .then(_ => userService.dao.getByLogin("tristan.spinnewyn@gmail.com"))
                .then(async user1 => {
                    userRightService.dao.insert(new UserRight(1, 1))
            })
    
            await userService.insert('Tristan','Spinnewyn',"tristan.spinnewyn+ouvrier@gmail.com", "azerty")
                .then(_ => userService.dao.getByLogin("tristan.spinnewyn+ouvrier@gmail.com"))
                .then(async user2 => {
                    userRightService.dao.insert(new UserRight(1, 2))
            })
    
            await userService.insert('Tristan','Spinnewyn',"tristan.spinnewyn+gestion@gmail.com", "azerty")
                .then(_ => userService.dao.getByLogin("tristan.spinnewyn+gestion@gmail.com"))
                .then(async user3 => {
                    userRightService.dao.insert(new UserRight(1, 3))
            })
    
        } catch (e) {
            if (e.code === "42P07") { // TABLE ALREADY EXISTS https://www.postgresql.org/docs/8.2/errcodes-appendix.html
                resolve()
            } else {
                reject(e)
            }
            return
        }

    })
}