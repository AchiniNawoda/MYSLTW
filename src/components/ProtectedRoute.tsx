import { Navigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

type JwtPayload = {
  exp?: number;
};

interface ProtectedRouteProps {
  children: JSX.Element;
}

const isTokenValid = (token: string | null): boolean => {
  if (!token) {
    return false;
  }
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    if (!decoded || !decoded.exp) {
      return true; // No exp claim; treat presence as a valid session
    }
    const nowInSeconds = Math.floor(Date.now() / 1000);
    return decoded.exp > nowInSeconds;
  } catch {
    // Token isn't a JWT (opaque token). Presence implies valid session per app contract.
    return true;
  }
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const location = useLocation();
  const accessToken = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
  const sessionFlag = typeof window !== "undefined" ? sessionStorage.getItem("isAuthenticated") : null;

  if (!sessionFlag || !isTokenValid(accessToken)) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;


