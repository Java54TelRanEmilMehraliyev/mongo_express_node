import {MongoClient} from 'mongodb'
export default class MongoConnection {
    #db
    #client
    constructor(connectionStr, dbName){
        this.#client = new MongoClient(connectionStr);
        this.#db = this.#client.db(dbName);
        console.log("Connected to database:", this.#db.databaseName);

    }
    getCollection(collectionName){
        return this.#db.collection(collectionName)
    }
    closeConnection() {
        this.#client.close();
    }
}