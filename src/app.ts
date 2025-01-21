import express from 'express'
import {set, connect, disconnect} from "mongoose"
import {Routes} from "@interfaces/routes-interface";
import {CREDENTIALS, LOG_FORMAT, NODE_ENV, ORIGIN, PORT} from "@config";
import {logger, stream} from "@utils/logger";
import morgan from "morgan";
import cors from "cors"
import hpp from "hpp"
import helmet from "helmet"
import compression from "compression"
import swaggerJsDoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"
import errorMiddleware from "@middlewares/error-middleware";
import {mongoDbConnection} from "@databases";


export default class App {
    public app: express.Application;
    public env: string
    public port: number | string

    constructor(routes: Routes[]){
        this.app = express();
        this.env = NODE_ENV || "development";
        this.port = PORT || 3000;

        this.connectToDatabase()
            .then(
            () => {
                logger.info("Connected to Database successfully");
            })
            .catch((err) => {
                logger.error("Error connecting to Database successfully");
            })
        this.initializeMiddlewares()
        this.initializeRoutes(routes)
        this.initializeSwagger()
        this.initializeErrorHandling()
    }

    public listen(){
        this.app.listen(this.port, () => {
            logger.info(`==================================`);
            logger.info(`======= ENV: ${this.env} =========`);
            logger.info(`🚀 App listening on the port ${this.port}`);
            logger.info(`===================================`)
        })
    }

    public async closeDatabaseConnection(){
        try {
            await disconnect();
            logger.info("Disconnected from MongoDb")
        } catch (err) {
            logger.error("Error Closing the database connection:", err)
        }
    }

    private async connectToDatabase(){
        if (this.env !== "production"){
            set('debug', true)
        }
        await connect(mongoDbConnection.url);
    }

    private initializeMiddlewares(){
        this.app.use(morgan(LOG_FORMAT, {  stream }))
        this.app.use(cors({ origin: ORIGIN, credentials: CREDENTIALS }))
        this.app.use(hpp())
        this.app.use(helmet())
        this.app.use(compression())
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))
    }

    private initializeRoutes(routes: Routes[]){
        routes.forEach(route => {
            this.app.use('/api/v1/', route.router)
        })
    }

    private initializeSwagger(){
        const options = {
            swaggerDefinition: {
                info: {
                    title: 'REST API',
                    version: '1.0.0',
                    description: 'Example docs.',
                },
            },
            apis: ['swagger.yaml']
        }

        const specs = swaggerJsDoc(options);
        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))
    }

    private initializeErrorHandling(){
        this.app.use(errorMiddleware)
    }
}
