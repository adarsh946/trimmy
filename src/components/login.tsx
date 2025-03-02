import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import * as yup from "yup";
import Error from "./Error";
import { useFetch } from "@/hooks/useFetch";
import { login } from "@/database/apiAuth";
import { useNavigate, useSearchParams } from "react-router-dom";
import { AuthState } from "@/context";

function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<Record<string, string>>({});

  const navigate = useNavigate();
  let [searchParams] = useSearchParams();
  const extendedLink = searchParams.get("createUrl");

  const loginData = { email, password };

  const {
    data,
    loading,
    errors,
    fn: fnLogin,
  } = useFetch(login, { email, password });
  const { fetchUser } = AuthState();

  useEffect(() => {
    if (errors === null && data) {
      navigate(`/dashboard?${extendedLink ? `createUrl=${extendedLink}` : ""}`);
      fetchUser();
    }
  }, [data, errors]);

  const handleLogin = async () => {
    try {
      const loginSchema = yup.object({
        email: yup
          .string()
          .email("Invalid Email")
          .required("Email is required"),
        password: yup
          .string()
          .min(6, "password must be of minimum 6 characters")
          .required(),
      });

      await loginSchema.validate(loginData, { abortEarly: false });
      setError({});

      // API Call
      fnLogin();
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const newError: Record<string, string> = {};

        error.inner.forEach((err) => {
          if (err.path) {
            newError[err.path] = err.message;
          }
        });
        setError(newError);
      }
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center text-lg">Login</CardTitle>
        <CardDescription className="text-center">
          Continue with your Account
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div>
          <Input
            type="text"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => [...email, setEmail(e.target.value)]}
          />
        </div>
        {error.email && <Error message={error.email} />}
      </CardContent>
      <CardContent>
        <div>
          <Input
            type="password"
            placeholder="Enter your Password"
            value={password}
            onChange={(e) => [...password, setPassword(e.target.value)]}
          />
        </div>
        {error.password && <Error message={error.password} />}
      </CardContent>

      <CardFooter className="flex flex-col items-center">
        <Button onClick={handleLogin} className="w-full text-md">
          {loading ? <BeatLoader size={10} /> : "Login"}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default Login;
