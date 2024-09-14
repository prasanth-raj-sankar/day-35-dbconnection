import mongodb from 'mongodb';

const localdb = "127.0.0.1:27017"; //localhost:27017
const dbname= "task-35";

const client = new mongodb.MongoClient(`mongodb://${localdb}`);

export const db = client.db(dbname);
export const connectbd = async () => {
    try{
        await client.connect();
        console.log("db connected successfully");
    }catch (e) {
        console.log("erro in connecting to db", e);
        process.exit();
    }
};


 
