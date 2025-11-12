"use client";
import { useRouter } from "next/navigation";
import { loginUser } from "@/services/auth";
import AuthForm from "@/components/forms/auth";

const loginFields = [
  { name: "email", label: "Enter username or email", type: "email" },
  { name: "password", label: "Enter Password", type: "password" },
];

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = async (formData) => {
    try {
      const res = await loginUser(formData);
      console.log('result from login page: ', res)
      if (res?.success) {
        router.push("/dashboard");
      } else alert(res?.message || "Login failed");
    } catch (err) {
      alert(err.response?.data?.message || "Login error");
    }
  };

  return (
    <AuthForm
      fields={loginFields}
      onSubmit={handleLogin}
      title="Login to your Account"
      buttonText="Login"
    />
  );
}
