import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSearchParams } from "react-router-dom";

function Auth() {
  const [params] = useSearchParams();
  return (
    <div className="flex flex-col items-center gap-10 mt-36">
      <h2 className=" text-5xl text-center text-white font- font-extrabold">
        {params.get("createUrl")
          ? "Holdup you need to Login First"
          : "Login / Signup"}
      </h2>

      <Tabs defaultValue="account" className="w-[400px] ">
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="Login">Login</TabsTrigger>
          <TabsTrigger value="Signup">Signup</TabsTrigger>
        </TabsList>
        <TabsContent value="Login">Login component</TabsContent>
        <TabsContent value="Signup">SignUp component</TabsContent>
      </Tabs>
    </div>
  );
}

export default Auth;
