"use server";



export const registerAction = async (_, formData ) => {
  const username = formData.get("username");
  const email = formData.get("email");
  const password = formData.get("password");


  if (!username) {
    return {
      errorU: "Username is required",
    };
  } else if (!email) {
    return {
      errorE: "Email is required",
    };
  } else if(!password){
    return {
      errorE: "Password is required",
    };
  }

  fetch(`http://96.9.81.187:8080/api/v1/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  });

  console.log("Register success!");
};