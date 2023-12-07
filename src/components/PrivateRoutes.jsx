import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthProvider";

export default function PrivateRoutes({ requireAdmins, children }) {
  const { user } = useAuthContext();

  //Navigate 와 Link 차이?

  if (!user || (requireAdmins && !user.isAdmins)) {
    return <Navigate to="/" />;
  }
  return children;
}
