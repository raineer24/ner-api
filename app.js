const express = require('express')
const app = express();
const config = require('./config/config');
const log = require('color-logs')(true, true, __filename);
const Conn = require('./service/connection');
const bodyParser = require('body-parser');
const sql = require('sql');
const apiSubPath = express();
const morgan = require('morgan');
// const fs = require('fs');
const path = require('path');
const cors = require('cors');

const SwaggerParser = require('swagger-parser');
const SwaggerExpress = require('swagger-express-mw');
const SwaggerUi = require('swagger-tools/middleware/swagger-ui');

const { authenticate } = require('./middleware/authenticate').authenticate;
const { authorize } = require('./middleware/authorize').authorize;

// Validate swagger definition
SwaggerParser.validate(config.swaggerFile)
    .then((result) => {
        log.info('Validation OK', result.info);
    })
    .catch((err) => {
        log.info('Swagger Error:', err);
    });

    SwaggerParser.bundle(config.swaggerFile)
    .then((api) => {
        const swaggerConfig = {
            appRoot: __dirname,
            swagger: api,
            swaggerSecurityHandlers: {
                userSecurity: authenticate,
                roles: authorize,
            },
            
        };
        // Initialise swagger express middleware
        SwaggerExpress.create(swaggerConfig, (err, swaggerExpress) => { 
            if (err) { throw err; }

            app.use(cors({
                origin: '*',
                exposedHeaders: ['Content-Range', 'X-Content-Range', 'Content-Disposition', 'Content-Error'],
                credentials: true,
            }));
            
            app.use(bodyParser.json());
            app.use(bodyParser.urlencoded({
                extended: true
            }));

            apiSubPath.use((req, res, next) => {
                res.setHeader('X-Powered-By', 'EOS');
                next();
            });
            app.use(SwaggerUi(swaggerExpress.runner.swagger));
            apiSubPath.get('/v1/swagger.json', (req, res) => {
                res.json(api);
            });

            swaggerExpress.register(apiSubPath);

            app.use(apiSubPath);

            app.listen(config.env.port, '0.0.0.0', () => {
                log.info(`Server started on ${config.env.port}`);
            });
        });  
    }); //end of swagger parser.bundle





