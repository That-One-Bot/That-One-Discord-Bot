import {MongoClient, ServerApiVersion} from "mongodb";
import * as path from "path";
import * as env from 'dotenv';
env.config();

const dbInit = async () => {
    const pemPath = path.join(__dirname, '../../tobMongo.pem');
    const db = new MongoClient(process.env.MONGO_URI as string, {
        keepAlive: true,
        ssl: true,
        sslKey: pemPath,
        sslCert: pemPath,
        serverApi: ServerApiVersion.v1
    });
    console.log("Connected to MongoDB");
    return db;
}
export default dbInit;



