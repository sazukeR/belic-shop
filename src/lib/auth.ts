/* import { betterAuth } from "better-auth";
import { Pool } from "pg";

export const auth = betterAuth({
 plugins: [],

 // Database

 database: new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: false, // si estamos trabajando en la nube (por ejemplo con neon database) debemos ponerlo en true
 }),

 // Email Provider

 emailAndPassword: {
  enabled: true,
  requireEmailVerification: true,
 },

 emailVerification: {
  sendOnSignIn: true,
  sendOnSignUp: true,
  autoSignInAfterVerification: true,
  sendVerificationEmail: async ({ user, url, token }) => {
   console.log("Verification email", { user, url, token });
  },
 },
 // Providers
 socialProviders: {
  github: {
   clientId: process.env.GITHUB_CLIENT_ID as string,
   clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
  },
  google: {
   clientId: process.env.GOOGLE_CLIENT_ID as string,
   clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
  },
 },
});


*/

import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "@/lib/prisma"; // Asegúrate de que esta ruta apunte a tu archivo prisma.ts

export const auth = betterAuth({
 // 1. Usa el adaptador de Prisma en lugar de `new Pool()`
 database: prismaAdapter(prisma, {
  provider: "postgresql",
 }),

 // 2. Configura el campo adicional `role` para que viaje en la sesión
 user: {
  additionalFields: {
   role: {
    type: "string",
    required: false,
    defaultValue: "user",
    input: false, // Seguridad: evita que el usuario se asigne un rol de admin al registrarse
   },
  },
 },

 // Email Provider
 emailAndPassword: {
  enabled: true,
  requireEmailVerification: true,
 },

 emailVerification: {
  sendOnSignIn: true,
  sendOnSignUp: true,
  autoSignInAfterVerification: true,
  sendVerificationEmail: async ({ user, url, token }) => {
   console.log("Verification email", { user, url, token });
  },
 },

 // Social Providers
 socialProviders: {
  github: {
   clientId: process.env.GITHUB_CLIENT_ID as string,
   clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
  },
  google: {
   clientId: process.env.GOOGLE_CLIENT_ID as string,
   clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
  },
 },
});
