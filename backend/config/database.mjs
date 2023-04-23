import mongoose from "mongoose";
import colors from "colors";

export const connDatabase = async () => {
  try {
    const connDb = await mongoose.connect(process.env.DB_USER, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(
      `connected to database ${connDb.connection.host}`.bgGreen.white
    );
  } catch (e) {
    console.log(`Error in MongoDb ${e}`.bgRed.white);
  }
};
