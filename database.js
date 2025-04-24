const mongoose=require("mongoose")

const dbURI =
  "mongodb+srv://RonalBoruah:123%40Shuvam@amazoncluster.t4lx4ia.mongodb.net/?retryWrites=true&w=majority&appName=AmazonCluster";



//connecting database
const db = async () => {
  try {
    mongoose
      .connect(dbURI)
      .then(() => {
        console.log("MongoDB connected successfully!");
      })
      .catch((err) => {
        console.error("MongoDB connection error:", err);
      });
  } catch (err) {
    throw err;
  }
};

module.exports=db;
