// Example hook: useAuthCheck
import { useState, useEffect } from "react";

export const useAuthCheck = (): boolean | null => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (token) {
      // Giải mã và kiểm tra token
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  return isAuthenticated;
};
