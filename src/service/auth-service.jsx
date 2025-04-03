import { apiRequest } from "@/utils/api";
import { redirect } from "next/navigation";

export async function loginService({ email, password }) {
  const data = await apiRequest(
    "/api/v1/auth/login", 
    "POST",
    { email, password }
  );

  console.log("Data: ", data);

  if (data.status !== "OK") {
    redirect("/login");
  }

  return data;
}
