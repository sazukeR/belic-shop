"use client";

import { useState, type SubmitEvent } from "react";
import { AuthDivider } from "../components/auth-divider";
import { AuthField } from "../components/auth-field";
import { SocialSignInButtons } from "../components/social-sign-in-buttons";
import { authClient } from "@/lib/auth-client";
import {
 IoInformationCircleOutline,
 IoInformationOutline,
} from "react-icons/io5";
import { useFormStatus } from "react-dom";
import clsx from "clsx";

export function LoginForm() {
 const [errorMessage, setErrorMessage] = useState<string | null>(null);
 const [isLoading, setIsLoading] = useState(false);

 async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
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

 return (
  <>
   <SocialSignInButtons />
   <AuthDivider />
   <form onSubmit={handleSubmit} className="flex flex-col gap-5">
    <AuthField
     id="email"
     label="Email"
     type="email"
     name="email"
     autoComplete="email"
    />
    <AuthField
     id="password"
     label="Contraseña"
     type="password"
     name="password"
     autoComplete="current-password"
    />

    {errorMessage && (
     <div className="flex flex-row mb-2">
      <IoInformationCircleOutline className="h-5 w-5 text-red-500" />
      <p className="text-sm text-red-500">{errorMessage}</p>
     </div>
    )}

    <LoginButton isLoading={isLoading} />

    {/* <button
     type="submit"
     className="mt-1 h-11 rounded-lg bg-zinc-900 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
    >
     "Entrar"
    </button> */}
   </form>
  </>
 );
}

function LoginButton({ isLoading }: { isLoading: boolean }) {
 return (
  <button
   type="submit"
   disabled={isLoading}
   className={clsx(
    "mt-1 h-11 rounded-lg bg-zinc-900 text-sm font-medium text-white transition-colors hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200",
    {
     "btn-disabled": isLoading,
    }
   )}
  >
   {isLoading ? "Ingresando..." : "Ingresar"}
  </button>
 );
}
