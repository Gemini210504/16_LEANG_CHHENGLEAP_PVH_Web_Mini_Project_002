"use server";

import { signIn } from "@/auth";
import { error } from "console";
import { redirect } from "next/navigation";

export const loginAction = async (_, formData) => {
  const email = formData.get("email");
  const password = formData.get("password");

  if(!password ){
    return{
      errorP : "Password is required"
    }
  }else if(!email){
    return {
      errorE: "Email is required",
    };
  }

  await signIn("credentials", {
    email,
    password,
    redirect: false,
  });
  
  redirect("/todoPage")
};


