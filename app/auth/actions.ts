"use server";
import{redirect}from"next/navigation";
import{createClient}from"@/lib/supabase/server";

export async function login(formData:FormData){
  const s=await createClient();
  const email=String(formData.get("email")||"").trim().toLowerCase();
  const password=String(formData.get("password")||"");
  let result=await s.auth.signInWithPassword({email,password});
  if(result.error&&email==="demo@demo.com"&&password==="demo"){
    const created=await s.auth.signUp({email,password});
    if(created.error&&!created.error.message.toLowerCase().includes("already"))redirect("/auth/login?error="+encodeURIComponent("Demo account could not be created."));
    await s.rpc("confirm_demo_signup",{p_email:email});
    result=await s.auth.signInWithPassword({email,password});
  }
  if(result.error)redirect("/auth/login?error="+encodeURIComponent("Email or password is incorrect."));
  if(email==="demo@demo.com"){
    const uid=result.data.user?.id;
    if(uid)await s.from("profiles").update({display_name:"Demo",age:30,city:"Phnom Penh",bio:"TindAI demo profile",is_active:false}).eq("auth_user_id",uid);
  }
  redirect("/discover");
}

export async function signup(){redirect("/auth/login")}
export async function logout(){const s=await createClient();await s.auth.signOut();redirect("/auth/login")}
export async function resetPassword(formData:FormData){const s=await createClient();const email=String(formData.get("email")||"");await s.auth.resetPasswordForEmail(email,{redirectTo:"https://tindai-demo.vercel.app/auth/update-password"});redirect("/auth/check-email")}
