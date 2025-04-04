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



// fetch(`http://96.9.81.187:8080/api/v1/auth/register`, {
//   method: "POST",
//   headers: { "Content-Type": "application/json" },
//   body: JSON.stringify({ username, email, password }),
// });


// export async function registerService({ username, email, password }) {
//   try {
//     const response = await fetch(
//       `http://96.9.81.187:8080/api/v1/auth/register`,
//       {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ username, email, password }),
//       }
//     );

//     const data = await response.json(); 

//     console.log("Data: ", data);

//     if (data.status !== "OK") {
//       return { error: "Registration failed. Please try again." };
//     }

//     return data;
//   } catch (error) {
//     console.error("Registration error:", error);
//     return { error: "An error occurred. Please check your connection." };
//   }
// }
