"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
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
    const { isAuthenticated, isLoading } = useAuth();

    // Redirect authenticated users away from signup page
    useEffect(() => {
        if (!isLoading && isAuthenticated) {
            router.replace("/dashboard");
        }
    }, [isAuthenticated, isLoading, router]);

  const handleSignup = async (formData) => {
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await signupUser(formData);
      if (res?.success) {
        // Set fresh login session flag after successful signup
        sessionStorage.setItem("freshLogin", "true");
        // Store auth token if provided
        if (res?.token) {
          localStorage.setItem("authToken", res.token);
        } else {
          localStorage.setItem("authToken", "authenticated");
        }
        if (res?.user) {
          localStorage.setItem("user", JSON.stringify(res.user));
        }
        router.push("/dashboard");
      } else alert(res?.message || "Signup failed");
    } catch (err) {
      alert(err.response?.data?.message);
    }
  };

  // Don't render signup form if user is authenticated
  if (isLoading || isAuthenticated) {
    return null;
  }

  return (
    <AuthForm
      fields={signupFields}
      onSubmit={handleSignup}
      title="Create an Account"
      buttonText="Sign Up"
    />
  );
}