import {initializeApp} from 'firebase/app';
import { getFirestore } from "firebase/firestore"
import {getPerformance} from 'firebase/performance'


const serviceAccount = require('../serviceAccountKey.json');
const serviceTest = require('../serviceAccountTest.json')

const dbInit = async () => {

    const db = initializeApp(serviceTest)

    const firestore = getFirestore(db);

    return firestore;
}
export default dbInit;



