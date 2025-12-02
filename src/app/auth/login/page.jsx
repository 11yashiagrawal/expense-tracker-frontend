"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import AuthForm from "@/components/forms/auth";

const loginFields = [
  { name: "email", label: "Enter username or email", type: "email" },
  { name: "password", label: "Enter Password", type: "password" },
];

export default function LoginPage() {
  const router = useRouter();
  const { login, isAuthenticated, isLoading } = useAuth();

  // Redirect authenticated users away from login page
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace("/dashboard");
    }
  }, [isAuthenticated, isLoading, router]);

  const handleLogin = async (formData) => {
    try {
      const res = await login(formData);
      console.log('result from login page: ', res)
      if (res?.success) {
        router.push("/dashboard");
      } else alert(res?.message || "Login failed");
    } catch (err) {
      alert(err.message || "Login error");
    }
  };

  // Don't render login form if user is authenticated
  if (isLoading || isAuthenticated) {
    return null;
  }

  return (
    <AuthForm
      fields={loginFields}
      onSubmit={handleLogin}
      title="Login to your Account"
      buttonText="Login"
    />
  );
}
