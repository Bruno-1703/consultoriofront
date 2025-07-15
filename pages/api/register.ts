// Importamos los tipos para las solicitudes y respuestas en una API de Next.js
import type { NextApiRequest, NextApiResponse } from "next";

// Importamos la conexión al cliente de MongoDB
import clientPromise from "../../lib/mongodb";

// Importamos la librería bcrypt para hashear contraseñas
import bcrypt from "bcryptjs";

// Función principal que maneja la petición HTTP
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Verificamos que el método de la solicitud sea POST
  if (req.method !== "POST") {
    // Si no es POST, devolvemos un error 405 (Método no permitido)
    return res.status(405).json({ message: "Método no permitido" });
  }

  // Extraemos los datos enviados desde el cuerpo de la solicitud
  const { email, password, name } = req.body;

  // Validamos que se haya enviado el email y la contraseña
  if (!email || !password) {
    return res.status(400).json({ message: "Se requieren email y contraseña" });
  }

  try {
    // Conectamos con la base de datos usando el cliente de MongoDB
    const client = await clientPromise;
    const db = client.db("consultorio"); // Nombre de la base de datos
    const usersCollection = db.collection("Usuario"); // Colección de usuarios

    // Verificamos si ya existe un usuario con el mismo email
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      // Si ya existe, devolvemos un error 400
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    // Hasheamos la contraseña antes de guardarla en la base de datos
    const hashedPassword = await bcrypt.hash(password, 10); // 10 es el número de "salt rounds"

    // Insertamos el nuevo usuario en la colección
    await usersCollection.insertOne({ email, password: hashedPassword, name , role: "SIN ROL"});

    // Respondemos con éxito
    res.status(201).json({ message: "Usuario creado exitosamente" });
  } catch (error) {
    // En caso de error interno, respondemos con un estado 500
    res.status(500).json({ message: "Error al crear el usuario" });
  }
}
