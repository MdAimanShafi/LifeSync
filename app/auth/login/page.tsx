"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Heart, Eye, EyeOff, Mail, Lock } from "lucide-react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate login process
      const loginData = {
        email: formData.email,
        password: formData.password,
        loginTime: new Date().toISOString(),
        ipAddress: "127.0.0.1", // In real app, get actual IP
        userAgent: navigator.userAgent,
        deviceInfo: {
          platform: navigator.platform,
          language: navigator.language,
          cookieEnabled: navigator.cookieEnabled,
        },
        sessionId: `session_${Date.now()}`,
      }

      // Save user login data for admin tracking
      const existingUserLogins = JSON.parse(localStorage.getItem("userLoginData") || "[]")
      existingUserLogins.push(loginData)
      localStorage.setItem("userLoginData", JSON.stringify(existingUserLogins))

      // Save user session
      const userSession = {
        email: formData.email,
        loginTime: new Date().toISOString(),
        sessionId: loginData.sessionId,
        isActive: true,
      }
      localStorage.setItem("userSession", JSON.stringify(userSession))

      // Update admin data with user login
      const adminData = JSON.parse(localStorage.getItem("adminData") || '{"userLogins": []}')
      if (!adminData.userLogins) adminData.userLogins = []

      adminData.userLogins.push({
        id: Date.now(),
        email: formData.email,
        loginTime: new Date().toISOString(),
        ipAddress: loginData.ipAddress,
        userAgent: loginData.userAgent,
        deviceInfo: loginData.deviceInfo,
        sessionDuration: null, // Will be updated on logout
        status: "active",
      })
      localStorage.setItem("adminData", JSON.stringify(adminData))

      // Create system log for admin
      const systemLog = {
        id: Date.now(),
        type: "user_login",
        message: `User login: ${formData.email}`,
        timestamp: new Date().toISOString(),
        severity: "info",
        details: loginData,
      }

      const existingLogs = JSON.parse(localStorage.getItem("systemLogs") || "[]")
      existingLogs.push(systemLog)
      localStorage.setItem("systemLogs", JSON.stringify(existingLogs))

      setTimeout(() => {
        setIsLoading(false)
        alert("Login successful! Your login data has been recorded.")
        router.push("/dashboard")
      }, 1500)
    } catch (error) {
      console.error(error);
      setIsLoading(false)
      alert("Login failed. Please try again.")
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 mb-6">
            <Heart className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">MadeCare India</span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to your healthcare account</p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>Enter your credentials to access your account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <input id="remember" type="checkbox" className="rounded border-gray-300" />
                  <Label htmlFor="remember" className="text-sm">
                    Remember me
                  </Label>
                </div>
                <Link href="/auth/forgot-password" className="text-sm text-blue-600 hover:underline">
                  Forgot password?
                </Link>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link href="/auth/register" className="text-blue-600 hover:underline">
                  Sign up here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Demo Credentials */}
        <Card className="mt-4 bg-blue-50 border-blue-200">
          <CardContent className="pt-4">
            <p className="text-sm text-blue-800 font-medium mb-2">Demo Credentials:</p>
            <p className="text-xs text-blue-700">
              Email: demo@madecare.com
              <br />
              Password: demo123
            </p>
            <p className="text-xs text-blue-600 mt-2">
              Note: All login data is tracked and available to admin for monitoring.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
