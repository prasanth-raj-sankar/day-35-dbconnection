// import mongoose from "mongoose";

// const host="127.0.0.1:27017";
// const dbname="task-35";

// const localdb = `mongodb://${host}/${dbname}`;

// export const connectViaMongoose = async () => {
//     try{
//         await mongoose.connect(localdb);
//         console.log("connect to db via mongoose")
//     }catch (e){
//         console.log("error in connect to Db", e);
//         process.exit(1);
//     }
// };



import mongoose from "mongoose";

const host = "127.0.0.1:27017";  // Change this if using a cloud DB
const dbname = "task-35";
const localdb = `mongodb://${host}/${dbname}`;

// Replace localdb with cloudDb if you are using MongoDB Atlas or similar services
// const cloudDb = "mongodb+srv://username:password@cluster.mongodb.net/task-35?retryWrites=true&w=majority";

export const connectViaMongoose = async () => {
  try {
    await mongoose.connect(localdb, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to DB via Mongoose");
  } catch (e) {
    console.log("Error in connecting to DB", e);
    process.exit(1);
  }
};

