"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Github,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  Car,
  Sparkles,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Separator } from "@/src/components/ui/separator";
import { useTheme } from "@/src/components/theme-provider";
import { toast } from "sonner";
import Link from "next/link";
// import { signIn } from "@/src/auth";
import { signIn } from "next-auth/react";

// Mock authentication functions
const signInWithGitHub = async () => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1500));
  toast.success("Successfully signed in with GitHub!");
};

const signInWithGoogle = async () => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1500));
  toast.success("Successfully signed in with Google!");
};

const signInWithEmail = async (email: string, password: string) => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1500));
  if (email && password) {
    toast.success("Successfully signed in!");
  } else {
    toast.error("Please fill in all fields");
  }
};

export default function LoginPage() {
  const { theme } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSocialLogin = async (provider: "github" | "google") => {
    setIsLoading(provider);
    try {
      const result = await signIn(provider, {
        callbackUrl: "/browse", // Redirect to home page after successful login
        redirect: false, // Handle redirect manually
      });

      if (result?.error) {
        toast.error(`Failed to sign in with ${provider}`);
        console.error("Sign in error:", result.error);
      } else if (result?.url) {
        toast.success(`Successfully signed in with ${provider}!`);
        // Redirect to the callback URL
        window.location.href = result.url;
      }
    } catch (error) {
      toast.error(`Failed to sign in with ${provider}`);
      console.error("Sign in error:", error);
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Effects */}
      <div
        className={`absolute inset-0 ${
          theme === "dark"
            ? "bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-cyan-900/20"
            : "bg-gradient-to-br from-blue-100/40 via-purple-100/40 to-cyan-100/40"
        }`}
      />

      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {Array.from({ length: 15 }, (_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${Math.random() * 3 + 8}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl font-outfit font-bold mb-2">
              Welcome Back
            </h1>
            <p className="text-muted-foreground">
              Sign in to your AI car marketplace account
            </p>
          </motion.div>

          {/* Login Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="glass border-cyan/20 glow-cyan">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-outfit text-center">
                  Sign In
                </CardTitle>
                <CardDescription className="text-center">
                  Choose your preferred sign-in method
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Social Login Buttons */}
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full border-cyan/30 hover:bg-cyan/10 hover:border-cyan/50 transition-all duration-300"
                    onClick={() => handleSocialLogin("github")}
                    disabled={isLoading !== null}
                  >
                    {isLoading === "github" ? (
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                    ) : (
                      <Github className="h-4 w-4 mr-2" />
                    )}
                    Continue with GitHub
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full border-cyan/30 hover:bg-cyan/10 hover:border-cyan/50 transition-all duration-300"
                    onClick={() => handleSocialLogin("google")}
                    disabled={isLoading !== null}
                  >
                    {isLoading === "google" ? (
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                    ) : (
                      <Mail className="h-4 w-4 mr-2" />
                    )}
                    Continue with Google
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Features Preview */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8 text-center"
          >
            <div className="glass rounded-xl p-4">
              <p className="text-sm text-muted-foreground mb-3">
                Join thousands of users enjoying:
              </p>
              <div className="flex justify-center gap-6 text-xs">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-cyan rounded-full" />
                  <span>AI-Powered Search</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-cyan rounded-full" />
                  <span>Smart Recommendations</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-cyan rounded-full" />
                  <span>Secure Transactions</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
