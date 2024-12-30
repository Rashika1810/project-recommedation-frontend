// components/RegisterForm.tsx
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
import { useAuth } from "../../store/authContext";

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  const { registerUser } = useAuth(); // Use the register function
  const navigate = useNavigate(); // Hook to navigate programmatically

  const handleRegister = () => {
    // You can add your registration logic here (e.g., API call)
    registerUser(); // Set the user as registered
    navigate("/complete-profile"); // Redirect to complete profile page
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-medium text-gray-800">
          Register
        </CardTitle>
        <CardDescription>
          Create an account by filling in the details below.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-gray-600">
            Name*
          </Label>
          <Input
            id="name"
            placeholder="Enter your full name"
            className="outline outline-violet-200 border-violet-200 focus:outline-violet-200 focus:outline focus:ring-violet-200 focus:border-violet-200 placeholder:text-gray-400"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="branch" className="text-gray-600">
            Branch*
          </Label>
          <Input
            id="branch"
            placeholder="Enter your branch"
            className="outline outline-violet-200 border-violet-200 focus:outline-violet-200 focus:outline focus:ring-violet-200 focus:border-violet-200 placeholder:text-gray-400"
          />
        </div>
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
            placeholder="Create a password"
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
          onClick={handleRegister}
        >
          Register
        </Button>
      </CardFooter>
    </Card>
  );
}
