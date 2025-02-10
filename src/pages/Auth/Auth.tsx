import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../Components/components/ui/tabs";
import { LoginForm } from "./Login";
import { RegisterForm } from "./Register";
import logo from "../../assets/new_logo.png";
import bit_logo from "../../assets/bit logo.png";
export function AuthPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <img src={bit_logo} className="h-28" />
      <img src={logo} className="h-20" alt="Logo" />
      <p className="text-gray-600 mb-10">
        Provides tailored suggestions for projects, and courses based on
        students' skills and career goals..
      </p>

      <div className="w-[600px] border rounded-lg shadow-lg bg-white p-5">
        <Tabs defaultValue="login" className="w-full text-base">
          <TabsList className="grid w-full grid-cols-2 bg-purple-400 text-gray-800 font-bold rounded-md mb-5 h-12">
            <TabsTrigger
              value="login"
              className="h-9 text-lg text-white group-data-[state=active]:text-gray-800"
            >
              Login
            </TabsTrigger>
            <TabsTrigger
              value="register"
              className="h-9 text-lg text-white group-data-[state=active]:text-gray-800"
            >
              Register
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <LoginForm />
          </TabsContent>

          <TabsContent value="register">
            <RegisterForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
