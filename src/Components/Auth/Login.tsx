// components/LoginForm.tsx
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { PiEyeBold, PiEyeClosedBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/authContext"; // Import auth context

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { loginUser } = useAuth();
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  const navigate = useNavigate();
  const handleLogin = () => {
    // Your login logic (e.g., validate credentials)
    loginUser(); // Set the user as logged in
    navigate("/home"); // Redirect to the home page after login
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-medium text-gray-800">
          Login
        </CardTitle>
        <CardDescription>
          Enter your email and password to log in.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-gray-600">
            Email*
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            className="outline outline-violet-200 border-violet-200 focus:outline-violet-200 focus:outline focus:ring-violet-200 focus:border-violet-200 placeholder:text-gray-400"
          />
        </div>
        <div className="space-y-2 relative">
          <Label htmlFor="password" className="text-gray-600">
            Password*
          </Label>
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            className="outline outline-violet-200 border-violet-200 focus:outline-violet-200 focus:outline focus:ring-violet-200 focus:border-violet-200 placeholder:text-gray-400"
          />
          <span
            className="absolute right-3 top-8 cursor-pointer"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? (
              <PiEyeClosedBold
                size={20}
                className="text-violet-800 font-semibold"
              />
            ) : (
              <PiEyeBold size={20} className="text-violet-800 font-semibold" />
            )}
          </span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button
          className="w-2/3 bg-violet-400 text-white font-medium text-base active:bg-violet-500 hover:bg-violet-400"
          onClick={handleLogin}
        >
          Login
        </Button>
      </CardFooter>
    </Card>
  );
}
