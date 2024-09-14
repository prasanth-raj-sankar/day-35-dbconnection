import mongoose from "mongoose";

// const host="127.0.0.1:27017";
const dbname="task-35";

// const localdb = `mongodb://${host}/${dbname}`;
const localdb = "mongodb://127.0.0.1:27017";

export const connectViaMongoose = async () => {
    try{
        await mongoose.connect(`${localdb}/${dbname}`);
        console.log("connect to db via mongoose")
    }catch (e){
        console.log("error in connect to Db", e);
        process.exit(1);
    }
};


