const pg = require('pg')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const nodemailer = require('nodemailer')
const config = require('./conf')

const RightsService = require('./services/rightsservice')
const UserRightService = require('./services/user_rightservice')
const UserService = require('./services/userservice')
const MachineService = require('./services/machineservice')
const PlanMachineService = require('./services/plan_machineservice')
const UserQualificationService = require('./services/user_qualificationservice')
const PlanDeTravailService = require('./services/plan_de_travailservice')
const FournisseurService = require('./services/fournisseurservice')
const GammeOperationService = require('./services/gamme_operationservice')
const GammeService = require('./services/gammeservice')
const OperationService = require('./services/operationservice')
const PieceService = require('./services/pieceservice')
const TypePieceService = require('./services/type_pieceservice')
const MatPremService = require('./services/mat_premservice')
const CompositionService = require('./services/compositionservice')
const RealisationService = require('./services/realisationservice')
const StockService = require('./services/stock')
const RealisationOperationService = require('./services/operation_realisationservice')
const AchatService = require('./services/achatservice')
const LigneAchatService = require('./services/ligne_achatservice')

const app = express()
app.use(bodyParser.urlencoded({ extended: false })) // URLEncoded form data
app.use(bodyParser.json()) // application/json
app.use(cors())
app.use(morgan('dev')); // toutes les requêtes HTTP dans le log du serveur

const db = new pg.Pool({ connectionString: config.connectionString, connectionTimeoutMillis: 2000 })
const rightsService = new RightsService(db)
const userRightService = new UserRightService(db)
const userService = new UserService(db)
const machineService = new MachineService(db)
const userQualificationService = new UserQualificationService(db)
const planMachineService = new PlanMachineService(db)
const planDeTravailService = new PlanDeTravailService(db)
const fournisseurService = new FournisseurService(db)
const gammeOperationService = new GammeOperationService(db)
const gammeService = new GammeService(db)
const operationService = new OperationService(db)
const pieceService = new PieceService(db)
const typePieceService = new TypePieceService(db)
const realisationService = new RealisationService(db)
const compositionService = new CompositionService(db)
const matPremService = new MatPremService(db)
const realisationOperationService = new RealisationOperationService(db)
const achatService = new AchatService(db)
const ligneAchatService = new LigneAchatService(db)

const jwt = require("./services/jwtservice")(userService)
const stock= new StockService(db)

require('./api/userapi')(app,userService,jwt)
require('./api/machineapi')(app,userService,machineService,planMachineService,planDeTravailService,jwt)
require('./api/plantravailapi')(app,userService,planDeTravailService,userQualificationService,jwt)
require('./api/fournisseurapi')(app,userService,fournisseurService,jwt)
require('./api/pieceapi')(app,userService,pieceService,typePieceService,gammeService,jwt)
require('./api/operationapi')(app,userService,gammeService,operationService,gammeOperationService,planMachineService,jwt)
require('./api/matpremapi')(app,userService,matPremService,jwt)
require('./api/compositionapi')(app,userService,compositionService,jwt)
require('./api/realisationapi')(app,userService,realisationService,realisationOperationService,stock,jwt)
require('./api/achatapi')(app,userService,achatService,ligneAchatService,pieceService,matPremService,jwt)
require('./datamodel/seeders')(rightsService, userRightService,userService,machineService,planDeTravailService,planMachineService,userQualificationService,
    fournisseurService,gammeOperationService,gammeService,operationService,pieceService,typePieceService,matPremService,compositionService,realisationService,realisationOperationService,
    achatService,ligneAchatService
    )
    .then(app.listen(3333))
