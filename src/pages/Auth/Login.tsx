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
import { toast } from "react-hot-toast";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Loading state
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

    setIsLoading(true); // Start loading

    await toast.promise(
      (async () => {
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
          throw new Error("Invalid credentials");
        }

        const data = await response.json();
        console.log("Login successful:", data);

        // Store the token in localStorage
        localStorage.setItem("Token", data.data.Token);
        localStorage.setItem("username", data.data.Username);
        localStorage.setItem("fname", data.data.first_name);
        localStorage.setItem("lname", data.data.last_name);

        navigate("/home");
      })(),
      {
        loading: "Logging in...",
        success: <b>Logged in successfully!</b>,
        error: <b>Invalid credentials. Please try again.</b>,
      }
    );

    setIsLoading(false); // Stop loading
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-medium text-gray-800">
          LOGIN
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
            className="outline outline-purple-200 border-purple-200 focus:outline-purple-200 focus:outline focus:ring-purple-200 focus:border-purple-200 placeholder:text-gray-400"
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
            className="outline outline-purple-200 border-purple-200 focus:outline-purple-200 focus:outline focus:ring-purple-200 focus:border-purple-200 placeholder:text-gray-400"
          />
          <span
            className="absolute right-3 top-8 cursor-pointer"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? (
              <PiEyeClosedBold
                size={20}
                className="text-purple-600 font-semibold"
              />
            ) : (
              <PiEyeBold size={20} className="text-purple-600 font-semibold" />
            )}
          </span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button
          className="w-2/3 bg-purple-400 py-3 text-white font-medium text-base active:bg-purple-500 hover:bg-purple-400"
          onClick={handleLogin}
          disabled={isLoading} // Disable button while loading
        >
          Login {/* Button text */}
        </Button>
      </CardFooter>
    </Card>
  );
}
