import NextAuth from 'next-auth';
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "../../../lib/mongodb";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from 'bcryptjs';

interface Credentials {
  email: string;
  password: string;
}

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials: Credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("¡Se requiere email y contraseña!");
        }

        try {
          const client = await clientPromise;

          const usersCollection = client.db("consultorio").collection("Usuario");

          const user = await usersCollection.findOne({
            email: credentials.email
          });

          if (!user) {
            throw new Error("¡Usuario no encontrado!");
          }

          const isValid = await compare(credentials.password, user.password);

          if (!isValid) {
            throw new Error("¡La contraseña no coincide!");
          }
          console.log(user)
          return {
            id: user._id.toString(),
            email: user.email,
            name: user.nombre_completo,
            role: user.rol_usuario,
            matricula: user.matricula,
            dni: user.dni,
            centroSaludId: user.centroSaludId?.toString() || null,
            // especialidad: user.especialidad,
            // nombre_usuario: user.nombre_usuario,
            // telefono: user.telefono,
          };

        } catch (error) {
          throw new Error(error instanceof Error ? error.message : "Ocurrió un error");
        }
      }
    })
  ],
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 días
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const u = user as any;
        token.id = u.id;
        token.role = u.role;
        token.email = u.email;
        token.name = u.name;
        token.matricula = u.matricula;
        token.dni = u.dni;
        token.especialidad = u.especialidad;
        token.nombre_usuario = u.nombre_usuario;
        token.centroSaludId = u.centroSaludId; // <--- AGREGADO AL TOKEN
        token.telefono = u.telefono;
      }
      return token;
    },

    async session({ session, token }) {
      if (token && session.user) {

        (session.user as any).id = token.id as string;
        (session.user as any).role = token.role as string;
        (session.user as any).centroSaludId = token.centroSaludId as string;

      }
      console.log({
        "msg": "Inicio de session del usuario",
        "token": token,
        "session": session
      })
      return session;
    }
  }
  ,
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  secret: process.env.NEXTAUTH_SECRET,
  //debug: process.env.NODE_ENV === 'development',
});