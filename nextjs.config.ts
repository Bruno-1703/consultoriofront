export const config = {
  runtime: 'nodejs', // Configura el entorno
};

export default function handler(req, res) {
  res.status(200).json({ message: 'Funciona con Node.js runtime' });
}
