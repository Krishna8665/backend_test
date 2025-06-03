import mongoose from "mongoose";

async function connectDB(){
    try {
          const dbURI = process.env.MONGO_URI
        //   console.log(dbURI)
        mongoose.connection.on("connected", () => {
            console.log("MongoDB connected successfully!");
        });
        
        mongoose.connection.on("error", (err) => {
            console.error(`Database connection error: ${err.message}`);
            process.exit(1); // Exit the process if the connection fails
        });
        
       await mongoose.connect(dbURI); 

    
    } catch (error) {
        console.log("Database connection interrupted URI unavailable!")
        process.exit(1) //something unsuccesful happended !
    }
}

export default connectDB