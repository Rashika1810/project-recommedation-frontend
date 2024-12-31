// components/LoginForm.tsx
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../Components/components/ui/card";
import { Input } from "../../Components/components/ui/input";
import { Label } from "../../Components/components/ui/label";
import { Button } from "../../Components/components/ui/button";
import { PiEyeBold, PiEyeClosedBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  const navigate = useNavigate();

  const handleLogin = async () => {
    const payload = {
      username: username,
      password: password,
    };

    try {
      const response = await fetch(
        "https://project-rec-backend.vercel.app/api/login/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      console.log("Registration successful:", data);

      // Store the token in localStorage
      localStorage.setItem("Token", data.Token);

      // Check if token exists, then navigate
      const token = localStorage.getItem("Token");
      if (token) {
        navigate("/home");
      } else {
        console.error("Token not found!");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-medium text-gray-800">
          Login
        </CardTitle>
        <CardDescription>
          Enter your username and password to log in.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="username" className="text-gray-600">
            Username*
          </Label>
          <Input
            id="username"
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="outline outline-violet-200 border-violet-200 focus:outline-violet-200 focus:outline focus:ring-violet-200 focus:border-violet-200 placeholder:text-gray-400"
          />
          <span
            className="absolute right-3 top-8 cursor-pointer"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? (
              <PiEyeClosedBold
                size={20}
                className="text-violet-600 font-semibold"
              />
            ) : (
              <PiEyeBold size={20} className="text-violet-600 font-semibold" />
            )}
          </span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button
          className="w-2/3 bg-violet-600 py-3 text-white font-medium text-base active:bg-violet-500 hover:bg-violet-400"
          onClick={handleLogin}
        >
          Login
        </Button>
      </CardFooter>
    </Card>
  );
}
