import {initializeApp} from 'firebase/app';
import { getFirestore } from "firebase/firestore"


const serviceAccount = require('../serviceAccountKey.json');

const dbInit = async () => {

    const db = initializeApp(serviceAccount)

    const firestore = getFirestore(db);

    return firestore;
}
export default dbInit;



