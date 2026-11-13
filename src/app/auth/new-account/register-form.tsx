// "use client";

// import type { SubmitEvent } from "react";
// import { useRouter } from "next/navigation";
// import { authClient } from "@/lib/auth-client";
// import { AuthDivider } from "../components/auth-divider";
// import { AuthField } from "../components/auth-field";
// import { SocialSignInButtons } from "../components/social-sign-in-buttons";

// export function RegisterForm() {
//  const router = useRouter();

//  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
//   event.preventDefault();
//   const formData = new FormData(event.currentTarget);
//   const name = formData.get("name") as string;
//   const email = formData.get("email") as string;
//   const password = formData.get("password") as string;
//   console.log("Register:", { name, email, password });

//   const { data, error } = await authClient.signUp.email(
//    {
//     email, // user email address
//     password, // user password -> min 8 characters by default
//     name, // user display name

//     callbackURL: "/", // A URL to redirect to after the user verifies their email (optional)
//    },
//    {
//     onRequest: () => {
//      console.log("Loading...");
//     },
//     onSuccess: (ctx) => {
//      console.log("All fine...", ctx);
//      router.push("/");
//     },
//     onError: (ctx) => {
//      // display the error message
//      alert(ctx.error.message);
//     },
//    }
//   );
//  }

//  return (
//   <>
//    <SocialSignInButtons />
//    <AuthDivider />
//    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
//     <AuthField
//      id="name"
//      label="Nombre"
//      type="text"
//      name="name"
//      autoComplete="name"
//     />
//     <AuthField
//      id="email"
//      label="Email"
//      type="email"
//      name="email"
//      autoComplete="email"
//     />
//     <AuthField
//      id="password"
//      label="Contraseña"
//      type="password"
//      name="password"
//      autoComplete="new-password"
//     />
//     <button
//      type="submit"
//      className="mt-1 h-11 rounded-lg bg-zinc-900 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
//     >
//      Registrarse
//     </button>
//    </form>
//   </>
//  );
// }

"use client";

import { useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { AuthDivider } from "../components/auth-divider";
import { AuthField } from "../components/auth-field";
import { SocialSignInButtons } from "../components/social-sign-in-buttons";

type FormInputs = {
 name: string;
 email: string;
 password: string;
};

export function RegisterForm() {
 const router = useRouter();
 const [errorMessage, setErrorMessage] = useState("");

 const {
  register,
  handleSubmit,
  formState: { errors, isSubmitting },
 } = useForm<FormInputs>();

 const onSubmit: SubmitHandler<FormInputs> = async (data) => {
  setErrorMessage("");

  const { name, email, password } = data;

  await authClient.signUp.email(
   {
    email: email.toLowerCase(),
    password,
    name,
    callbackURL: "/",
   },
   {
    onSuccess: (ctx) => {
     console.log("All fine...", ctx);
     router.push("/");
    },
    onError: (ctx) => {
     setErrorMessage(ctx.error.message);
    },
   }
  );
 };

 return (
  <>
   <SocialSignInButtons />
   <AuthDivider />

   <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
    <AuthField
     id="name"
     label="Nombre"
     type="text"
     autoComplete="name"
     {...register("name", {
      required: "El nombre es obligatorio",
      minLength: {
       value: 2,
       message: "El nombre debe tener al menos 2 caracteres",
      },
     })}
    />

    {errors.name && (
     <span className="text-sm text-red-500">{errors.name.message}</span>
    )}

    <AuthField
     id="email"
     label="Email"
     type="email"
     autoComplete="email"
     {...register("email", {
      required: "El correo electrónico es obligatorio",
      pattern: {
       value: /^\S+@\S+\.\S+$/,
       message: "Introduce un correo electrónico válido",
      },
     })}
    />

    {errors.email && (
     <span className="text-sm text-red-500">{errors.email.message}</span>
    )}

    <AuthField
     id="password"
     label="Contraseña"
     type="password"
     autoComplete="new-password"
     {...register("password", {
      required: "La contraseña es obligatoria",
      minLength: {
       value: 8,
       message: "La contraseña debe tener al menos 8 caracteres",
      },
     })}
    />

    {errors.password && (
     <span className="text-sm text-red-500">{errors.password.message}</span>
    )}

    {errorMessage && (
     <span className="text-sm text-red-500">{errorMessage}</span>
    )}

    <button
     type="submit"
     disabled={isSubmitting}
     className="mt-1 h-11 rounded-lg bg-zinc-900 text-sm font-medium text-white transition-colors hover:bg-zinc-700 disabled:opacity-50 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
    >
     {isSubmitting ? "Registrando..." : "Registrarse"}
    </button>
   </form>
  </>
 );
}
