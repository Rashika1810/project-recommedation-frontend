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

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    first_name: "",
    last_name: "",
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleRegister = async () => {
    setIsLoading(true); // Start loading
    try {
      const formDataObj = new FormData();
      formDataObj.append("username", formData.username);
      formDataObj.append("email", formData.email);
      formDataObj.append("password", formData.password);
      formDataObj.append("first_name", formData.first_name);
      formDataObj.append("last_name", formData.last_name);

      const response = await fetch(
        "https://project-rec-backend.vercel.app/api/register/",
        {
          method: "POST",
          body: formDataObj,
        }
      );

      const responseData = await response.json(); // Parse the response JSON

      if (!response.ok) {
        // Check for 404 and other error statuses
        if (response.status === 404) {
          toast.error(responseData.message || "Resource not found");
        } else {
          toast.error(
            responseData.message || `HTTP error! Status: ${response.status}`
          );
        }
        return; // Exit the function after showing the error
      }

      // Handle success
      if (responseData.success) {
        toast.success("Registered Successfully!");
        localStorage.setItem("Token", responseData.data.Token);
        localStorage.setItem("username", responseData.data.Username);
        localStorage.setItem("fname", responseData.data.first_name);
        localStorage.setItem("lname", responseData.data.last_name);
        console.log("Registration successful:", responseData);
        navigate("/complete-profile");
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      // Handle network errors or unexpected issues
      console.error("Error during registration:", error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-medium text-gray-800">
          REGISTER
        </CardTitle>
        <CardDescription>
          Create an account by filling in the details below.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="username" className="text-gray-600">
            Username*
          </Label>
          <Input
            id="username"
            placeholder="Enter your username"
            value={formData.username}
            onChange={handleInputChange}
            className="outline outline-purple-200 border-purple-200 focus:outline-purple-200 focus:ring-purple-200 placeholder:text-gray-400"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="first_name" className="text-gray-600">
            First Name*
          </Label>
          <Input
            id="first_name"
            placeholder="Enter your first name"
            value={formData.first_name}
            onChange={handleInputChange}
            className="outline outline-purple-200 border-purple-200 focus:outline-purple-200 focus:ring-purple-200 placeholder:text-gray-400"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="last_name" className="text-gray-600">
            Last Name*
          </Label>
          <Input
            id="last_name"
            placeholder="Enter your last name"
            value={formData.last_name}
            onChange={handleInputChange}
            className="outline outline-purple-200 border-purple-200 focus:outline-purple-200 focus:ring-purple-200 placeholder:text-gray-400"
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
            value={formData.email}
            onChange={handleInputChange}
            className="outline outline-purple-200 border-purple-200 focus:outline-purple-200 focus:ring-purple-200 placeholder:text-gray-400"
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
            value={formData.password}
            onChange={handleInputChange}
            className="outline outline-purple-200 border-purple-200 focus:outline-purple-200 focus:ring-purple-200 placeholder:text-gray-400"
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
          onClick={handleRegister}
          disabled={isLoading} // Disable button while loading
        >
          {isLoading ? "Registering..." : "Register"} {/* Button text */}
        </Button>
      </CardFooter>
    </Card>
  );
}

/*{
    "success": true,
    "message": "User registered successfully.",
    "data": {
        "Token": "ae17dbcf75aa47407198ec6e4a524572214e2a55",
        "first_name": "Test",
        "last_name": "",
        "username": "test_user",
        "email": "test@gmail.com"
    }
}*/
