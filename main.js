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

const app = express()
app.use(bodyParser.urlencoded({ extended: false })) // URLEncoded form data
app.use(bodyParser.json()) // application/json
app.use(cors())
app.use(morgan('dev')); // toutes les requêtes HTTP dans le log du serveur

const db = new pg.Pool({ connectionString: config.connectionString, connectionTimeoutMillis: 2000 })
const rightsService = new RightsService(db)
const userRightService = new UserRightService(db)
const userService = new UserService(db)
const jwt = require("./services/jwtservice")(userService)

require('./api/userapi')(app,userService,jwt)
require('./datamodel/seeders')(rightsService,userRightService,userService)
    .then(app.listen(3333))
