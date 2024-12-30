import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { LoginForm } from "./Login";
import { RegisterForm } from "./Register";

export function AuthPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-[600px] border rounded-lg shadow-lg bg-white p-5">
        <Tabs defaultValue="login" className="w-full text-base">
          <TabsList className="grid w-full grid-cols-2 bg-violet-400 text-gray-800 font-bold rounded-md mb-5 h-12">
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
