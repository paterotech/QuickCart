import dbConnect from "@/config/db";

export async function GET() {
  try {
    await dbConnect();
    console.log("✅ Conexión a MongoDB establecida");
    return new Response("Conexión exitosa", { status: 200 });
  } catch (error) {
    console.error("❌ Error al conectar a MongoDB:", error);
    return new Response("Error de conexión", { status: 500 });
  }
}
