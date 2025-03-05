import Login from "@/components/login";
import Signup from "@/components/signup";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AuthState } from "@/context";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function Auth() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const extendedLink = params.get("createUrl");

  const { isAuthenticated, loading }: Record<string, any> = AuthState();

  useEffect(() => {
    if (isAuthenticated && !loading) {
      navigate(`/dashboard?${extendedLink ? `createUrl=${extendedLink}` : ""}`);
    }
  }, [isAuthenticated, loading]);

  return (
    <div className="flex flex-col items-center gap-10 ">
      <h2 className=" text-5xl text-center text-white font- font-extrabold">
        {extendedLink ? "Holdup you need to Login First" : "Login / Signup"}
      </h2>

      <Tabs defaultValue="account" className="w-[400px] ">
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="Login">Login</TabsTrigger>
          <TabsTrigger value="Signup">Signup</TabsTrigger>
        </TabsList>
        <TabsContent value="Login">
          <Login />
        </TabsContent>
        <TabsContent value="Signup">
          <Signup />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Auth;
