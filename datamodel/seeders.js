const Rights = require('./classes/rights')
const UserRight = require('./classes/user_right')
const TypePiece = require('./classes/type_piece')

module.exports = (rightsService,
                  userRightService,
                  userService,
                  machineService,
                  planDeTravailService,
                  planMachineService,
                  userQualificationService,
                  fournisseurService,
                  gammeOperationService,
                  gammeService,
                  operationService,
                  pieceService,
                  typePieceService,
                  matPremService,
                  compositionService,
                  realisationService,
                  realisationOperationService,
                  achatService,
                  ligneAchatService
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
            await machineService.dao.createTable()
            await planDeTravailService.dao.createTable()
            await userQualificationService.dao.createTable()
            await planMachineService.dao.createTable()
            await typePieceService.dao.createTable()
            await fournisseurService.dao.createTable()
            await pieceService.dao.createTable()
            await gammeService.dao.createTable()
            await operationService.dao.createTable()
            await gammeOperationService.dao.createTable()
            await matPremService.dao.createTable()
            await compositionService.dao.createTable()
            await realisationService.dao.createTable()
            await realisationOperationService.dao.createTable()
            await achatService.dao.createTable()
            await ligneAchatService.dao.createTable()

            // INSERTs

            await rightsService.dao.insert(new Rights("Admin"))
            await rightsService.dao.insert(new Rights('Ouvrier'))
            await rightsService.dao.insert(new Rights('Gestion'))

            await userService.insert('Tristan', 'Spinnewyn', "tristan.spinnewyn@gmail.com", "azerty")
                .then(_ => userService.dao.getByLogin("tristan.spinnewyn@gmail.com"))
                .then(async user1 => {
                    userRightService.dao.insert(new UserRight(1, 1))
                })

            await userService.insert('Tristan', 'Spinnewyn', "tristan.spinnewyn+ouvrier@gmail.com", "azerty")
                .then(_ => userService.dao.getByLogin("tristan.spinnewyn+ouvrier@gmail.com"))
                .then(async user2 => {
                    userRightService.dao.insert(new UserRight(1, 2))
                })

            await userService.insert('Tristan', 'Spinnewyn', "tristan.spinnewyn+gestion@gmail.com", "azerty")
                .then(_ => userService.dao.getByLogin("tristan.spinnewyn+gestion@gmail.com"))
                .then(async user3 => {
                    userRightService.dao.insert(new UserRight(1, 3))
                })

            await typePieceService.dao.insert(new TypePiece("Pièce acheté"))
            await typePieceService.dao.insert(new TypePiece("Pièce intermédiaire"))
            await typePieceService.dao.insert(new TypePiece("Pièce fini"))

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