import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useMe } from "../../features/auth/hooks";
import { useAuthStore } from "../../stores/authStore";
import { LoadingSkeleton } from "../ui/LoadingSkeleton";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({
  children,
}: ProtectedRouteProps) => {
  const { data, isPending, isError } = useMe();

  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    if (data?.user) {
      setUser(data.user);
    }
  }, [data, setUser]);

  if (isPending) {
    return <LoadingSkeleton title="Checking session" items={1} className="max-w-md mx-auto mt-24" />;
  }

  if (isError || !data?.user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};