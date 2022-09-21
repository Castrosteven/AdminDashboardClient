import type { NextPage } from "next";
import { useState } from "react";
import { SignInForm } from "../../components/SignInForm";
import { SignUpForm } from "../../components/SignupForm";

const Login: NextPage = () => {
  type AuthState = "SIGNUP" | "SIGNIN";
  const [tab, setTabs] = useState<AuthState>("SIGNUP");
  const AuthTab = ({ label }: { label: AuthState }) => {
    const isActive = tab == label;
    return (
      <div
        onClick={() => setTabs(label)}
        className={`flex items-center justify-center text-center border-2 border-gray-200 w-full ${
          isActive && "font-bold"
        } hover:bg-gray-200 cursor-pointer `}
      >
        <p>{label === "SIGNIN" ? "Sign In" : "Register"}</p>
      </div>
    );
  };
  return (
    <div className="container mx-auto h-full flex justify-center items-center">
      <div className="w-96 h-96 bg-white rounded-md flex flex-col">
        <div className="flex text-black h-14">
          <AuthTab label="SIGNIN" />
          <AuthTab label="SIGNUP" />
        </div>
        {tab === "SIGNUP" ? <SignUpForm /> : <SignInForm />}
      </div>
    </div>
  );
};

export default Login;
