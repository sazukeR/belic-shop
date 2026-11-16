"use client";

import { AuthDivider } from "../components/auth-divider";
import { AuthField } from "../components/auth-field";
import { SocialSignInButtons } from "../components/social-sign-in-buttons";
import { IoInformationCircleOutline } from "react-icons/io5";
import { useBetterAuthForm } from "@/hooks/auth/useBetterAuthForm";
import clsx from "clsx";

export function LoginForm() {
 const { isLoading, errorMessage, handleLogin } = useBetterAuthForm();

 return (
  <>
   <SocialSignInButtons />
   <AuthDivider />
   <form onSubmit={handleLogin} className="flex flex-col gap-5">
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
