"use client"

import { useRouter } from "next/navigation";
import { signupUser } from "@/services/auth";
import AuthForm from "@/components/forms/auth";

const signupFields = [
  { name: "first_name", label: "First Name" },
  {name: 'last_name', label: "Last Name"},
  { name: "email", label: "Email", type: "email" },
  { name: "password", label: "Password", type: "password" },
  {name: "phone_no", label: "Phone Number", type: "number"},
  {name: "avatar", label: "Upload your Avatar", type: "file"},
  {name: "monthly_budget", label: "Monthly Budget", type: "number"},
  {name: "balance", label: "Account Balance", type: "number"}
];

export default function Signup(){
    const router = useRouter();

  const handleSignup = async (formData) => {
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await signupUser(formData);
      if (res?.success) router.push("/dashboard");
      else alert(res?.message || "Signup failed");
    } catch (err) {
      alert(err.response?.data?.message);
    }
  };

  return (
    <AuthForm
      fields={signupFields}
      onSubmit={handleSignup}
      title="Create an Account"
      buttonText="Sign Up"
    />
  );
}