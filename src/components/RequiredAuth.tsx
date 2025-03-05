import { AuthState } from "@/context";
import { PropsWithChildren, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BarLoader } from "react-spinners";

function RequiredAuth({ children }: PropsWithChildren) {
  const navigate = useNavigate();
  const { isAuthenticated, loading }: Record<string, any> = AuthState();

  useEffect(() => {
    if (!isAuthenticated && loading === false) {
      navigate("/auth");
    }
  }, [isAuthenticated, loading]);

  if (loading) return <BarLoader width={"100%"} color="#36d7d7" />;

  if (isAuthenticated) return children;
}

export default RequiredAuth;
