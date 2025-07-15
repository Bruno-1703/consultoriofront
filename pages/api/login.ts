import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método no permitido" });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Se requieren email y contraseña" });
  }

  try {
    const nestApiUrl = "http://localhost:3006/api/auth/login";

    const response = await fetch(nestApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (!response.ok) {
      // Devolver el error que vino desde NestJS
      return res.status(response.status).json({
        message: data.message || "Error de autenticación"
      });
    }

    // Devolver al frontend el token y el usuario autenticado
    return res.status(200).json({
      message: "Inicio de sesión exitoso",
      token: data.access_token,
      user: data.user
    });

  } catch (error) {
    console.error("Error en login:", error);
    return res.status(500).json({ message: "Error al conectar con el backend" });
  }
}