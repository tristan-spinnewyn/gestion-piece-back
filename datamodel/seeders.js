const List = require('./list')
const Item = require('./item')
const Role = require('./role')
const UserRole = require('./user_role')

module.exports = (roleService,
    userRightService,
    userService,
    userQualificationService,
    planDeTravailService,
    planMachineService,
    machineService,
    operationService,
    gammeOperationService,
    gammeService,
    realisationService,
    pieceService,
    typePieceService,
    fournisseurService,
    compositionService,
    matPremService,
    achatService,
    ligneAchatService,
    commandeService,
    clientService,
    devisService,
    ligneDevisService) => {
    return new Promise(async (resolve, reject) => {
        try {
            await roleService.dao.db.connect((err, client, release) => {
                if (err) {
                    console.log(err);
                } else {
                    return console.log("connnected");
                }
            })
            
            // INSERTs
        } catch (e) {
            if (e.code === "42P07") { // TABLE ALREADY EXISTS https://www.postgresql.org/docs/8.2/errcodes-appendix.html
                resolve()
            } else {
                reject(e)
            }
            return
        }
        await roleService.dao.insert(new Role("Admin"))
        await roleService.dao.insert(new Role('Ouvrier'))
        await roleService.dao.insert(new Role('Gestion'))
    })
}