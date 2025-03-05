import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "./ui/input";
import { BeatLoader } from "react-spinners";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { signup } from "@/database/apiAuth";
import * as yup from "yup";
import Error from "./Error";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useFetch } from "@/hooks/useFetch";

function Signup() {
  const [error, setError] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    profile_pic: null,
  });

  const navigate = useNavigate();
  let [searchParams] = useSearchParams();
  const extendedLink = searchParams.get("createUrl");

  const handleInputChange = (e: any) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const { data, loading, errors, fn: fnFetch } = useFetch(signup, formData);

  useEffect(() => {
    if (errors === null && data) {
      navigate(`/dashboard?${extendedLink ? `createUrl=${extendedLink}` : ""}`);
    }
  }, [data, error]);

  const handleSignup = async () => {
    setError({});
    try {
      const signupSchema = yup.object({
        name: yup.string().required("Name is Required!"),
        email: yup
          .string()
          .email("Invalid Email")
          .required("Email is Required!"),
        password: yup
          .string()
          .min(6, "must contain at least 6 characters")
          .required("Mandatory field"),
        profile_pic: yup.mixed(),
      });

      await signupSchema.validate(formData, { abortEarly: false });

      //api call

      await fnFetch();
      console.log("111111111111");
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const newError: Record<string, string> = {};

        if (error?.inner) {
          error.inner.forEach((err) => {
            if (err.path) {
              newError[err.path] = err.message;
            }
          });
          setError(newError);
          console.log("111111111111");
        }
      }
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center text-lg">SignUp</CardTitle>
        <CardDescription className="text-center">
          Create new Account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <Input
            type="text"
            placeholder="Enter your Name"
            onChange={handleInputChange}
          />
        </div>
        {error.name && <Error message={error.name} />}
      </CardContent>
      <CardContent>
        <div>
          <Input
            type="email"
            placeholder="Enter your Email"
            onChange={handleInputChange}
          />
        </div>
        {error.email && <Error message={error.email} />}
      </CardContent>
      <CardContent>
        <div>
          <Input
            type="password"
            placeholder="Enter your Password"
            onChange={handleInputChange}
          />
        </div>
        {error.password && <Error message={error.password} />}
      </CardContent>
      <CardContent>
        <div>
          <Input
            type="file"
            accept="image/*"
            onChange={handleInputChange}
            className="cursor-pointer"
          />
        </div>
        {error.profile_pic && <Error message={error.profile_pic} />}
      </CardContent>

      <CardFooter className="flex flex-col items-center">
        <Button onClick={handleSignup} className="w-full text-md">
          {loading ? <BeatLoader size={10} /> : "SignUp"}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default Signup;
