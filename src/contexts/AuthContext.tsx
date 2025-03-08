
import React, { createContext, useContext, useState, useEffect } from "react";

type User = {
  id: string;
  name: string;
  email: string;
  riskLevel: "low" | "medium" | "high";
  trustedContacts: { name: string; phone: string }[];
};

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  logout: () => {},
  register: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Simulate checking for stored authentication
    const storedUser = localStorage.getItem("guardianUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate authentication API call
    setIsLoading(true);
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user for demo
      const mockUser: User = {
        id: "user-1",
        name: "Sarah Johnson",
        email,
        riskLevel: "low",
        trustedContacts: [
          { name: "Emergency Contact 1", phone: "555-123-4567" },
          { name: "Emergency Contact 2", phone: "555-987-6543" }
        ]
      };
      
      setUser(mockUser);
      localStorage.setItem("guardianUser", JSON.stringify(mockUser));
    } catch (error) {
      console.error("Login failed:", error);
      throw new Error("Authentication failed");
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    // Simulate registration API call
    setIsLoading(true);
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user creation
      const newUser: User = {
        id: `user-${Date.now()}`,
        name,
        email,
        riskLevel: "low",
        trustedContacts: []
      };
      
      setUser(newUser);
      localStorage.setItem("guardianUser", JSON.stringify(newUser));
    } catch (error) {
      console.error("Registration failed:", error);
      throw new Error("Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("guardianUser");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        register
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
