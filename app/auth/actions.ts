"use server";
import{redirect}from"next/navigation";
import{createClient}from"@/lib/supabase/server";

export async function login(formData:FormData){
  const s=await createClient();
  const email=String(formData.get("email")||"").trim().toLowerCase();
  const password=String(formData.get("password")||"");
  const{error}=await s.auth.signInWithPassword({email,password});
  if(error)redirect("/auth/login?error="+encodeURIComponent("Email or password is incorrect."));
  redirect("/discover");
}

export async function signup(formData:FormData){
  const s=await createClient();
  const email=String(formData.get("email")||"").trim().toLowerCase();
  const password=String(formData.get("password")||"");
  if(formData.get("age")!=="on")redirect("/auth/signup?error="+encodeURIComponent("You must confirm that you are 18 or older."));
  const{error}=await s.auth.signUp({email,password});
  if(error)redirect("/auth/signup?error="+encodeURIComponent(error.message));
  const{error:confirmError}=await s.rpc("confirm_demo_signup",{p_email:email});
  if(confirmError)redirect("/auth/signup?error="+encodeURIComponent("Could not activate the account. Please try again."));
  const{error:loginError}=await s.auth.signInWithPassword({email,password});
  if(loginError)redirect("/auth/login?error="+encodeURIComponent("Account created. Please log in."));
  redirect("/profile/setup");
}

export async function logout(){const s=await createClient();await s.auth.signOut();redirect("/auth/login")}
export async function resetPassword(formData:FormData){const s=await createClient();const email=String(formData.get("email")||"").trim().toLowerCase();await s.auth.resetPasswordForEmail(email,{redirectTo:"https://tindai-demo.vercel.app/auth/update-password"});redirect("/auth/check-email")}
