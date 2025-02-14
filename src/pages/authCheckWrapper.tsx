// AuthCheckWrapper.tsx

import { useAuthCheck } from "@/hooks";



export const AuthCheckWrapper = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useAuthCheck(); // Gọi hook ở đây

  // Nếu chưa đăng nhập, có thể show loading hoặc redirect đi đâu đó
  if (isAuthenticated === null) {
    return <div>Loading...</div>; // Hoặc có thể là một spinner/loading screen
  }

  if (!isAuthenticated) {
    window.location.href = '/login'; // Redirect nếu không đăng nhập
    return null;
  }

  return <>{children}</>; // Nếu đã đăng nhập, render children
};
