import { useLocation, useNavigate } from "react-router-dom";
import { createContext, useCallback, useEffect, useState } from "react";

export const AuthContext = createContext<IAuthContext>({});

export default function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState<IUser>();

  const checkAuth = useCallback(async () => {
    setLoading(true);

    try {
      const firstName = localStorage.getItem("firstName");
      const lastName = localStorage.getItem("lastName");

      if (!firstName || !lastName) {
        setLoggedIn(false);
        navigate("/");
      } else {
        setLoggedIn(true);
        setUser({ firstName, lastName });
        if (location.pathname === "/") {
          navigate("/dashboard");
        }
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoggedIn(false);
      setLoading(false);
      navigate("/", { replace: true });
    }
  }, [navigate, location.pathname]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ loggedIn, setLoggedIn, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
