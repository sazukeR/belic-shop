import { useState, type SubmitEvent } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export const useBetterAuthForm = () => {
 const router = useRouter();
 const [errorMessage, setErrorMessage] = useState<string | null>(null);
 const [isLoading, setIsLoading] = useState(false);

 async function handleRegister(event: SubmitEvent<HTMLFormElement>) {
  event.preventDefault();
  setErrorMessage(null);

  const formData = new FormData(event.currentTarget);
  const name = (formData.get("name") as string)?.trim();
  const email = (formData.get("email") as string)?.trim();
  const password = formData.get("password") as string;

  // Validaciones simples antes de enviar
  if (!name || !email || !password) {
   setErrorMessage("Todos los campos son obligatorios.");
   return;
  }

  if (name.length < 2) {
   setErrorMessage("El nombre debe tener al menos 2 caracteres.");
   return;
  }

  if (password.length < 8) {
   setErrorMessage("La contraseña debe tener al menos 8 caracteres.");
   return;
  }

  await authClient.signUp.email(
   {
    email,
    password,
    name,
    callbackURL: "/",
   },
   {
    onRequest: () => {
     setIsLoading(true);
    },
    onSuccess: () => {
     setIsLoading(false);
     router.push("/");
    },
    onError: (ctx) => {
     // display the error message
     alert(ctx.error.message);
    },
   }
  );
 }

 async function handleLogin(event: SubmitEvent<HTMLFormElement>) {
  event.preventDefault();
  setErrorMessage(null);
  const formData = new FormData(event.currentTarget);
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { data, error } = await authClient.signIn.email(
   {
    email,
    password,
    callbackURL: "/",
    rememberMe: false,
   },
   {
    //callbacks

    onRequest: () => {
     setIsLoading(true);
     console.log("Loading...");
    },

    onSuccess: () => {
     setIsLoading(false);
     console.log("Success...");
    },
    onError: async (ctx) => {
     setIsLoading(false);

     if (ctx.error.status === 401) {
      setErrorMessage(
       "El correo electrónico o la contraseña no son correctos."
      );
      return;
     }

     if (ctx.error.status === 403) {
      alert("Email no ha sido verificado.");

      await authClient.sendVerificationEmail({
       email: email,
       callbackURL: "/",
      });
      return;
     }
    },
   }
  );
 }

 return {
  // props
  errorMessage,
  isLoading,

  // methods
  handleRegister,
  handleLogin,
 };
};
