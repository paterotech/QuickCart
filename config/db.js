import mongoose from "mongoose";

let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
     console.log("✅ Conexión reutilizada a MongoDB");
    return cached.conn;
  }
    
    if (!cached.promise) {
        const opts = {
            bufferCommands: false, 
        };
        console.log("🔄 Estableciendo nueva conexión a MongoDB...");
        cached.promise = mongoose.connect(`${process.env.MONGODB_URI}/QuickCartDB`, opts).then((mongoose) => {
            console.log("✅ Conectado exitosamente a MongoDB");
            return mongoose;
        })
        .catch((error) => {
        console.error("❌ Error al conectar a MongoDB:", error);
        throw error;
      });
    }
  
    cached.conn = await cached.promise;
    return cached.conn;
   
}
export default dbConnect;