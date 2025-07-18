"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Heart, Eye, EyeOff, Mail, Lock, Shield, AlertTriangle } from "lucide-react"
import { useRouter } from "next/navigation"

export default function AdminLoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [adminExists, setAdminExists] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check if admin account exists
    const adminAccount = localStorage.getItem("adminAccount")
    setAdminExists(!!adminAccount)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Get admin account
      const adminAccount = JSON.parse(localStorage.getItem("adminAccount") || "null")

      if (!adminAccount) {
        alert("No admin account found. Please complete admin setup first.")
        router.push("/admin/signup")
        return
      }

      // Validate credentials
      if (adminAccount.email === formData.email && adminAccount.password === formData.password) {
        // Update login info
        adminAccount.lastLogin = new Date().toISOString()
        adminAccount.loginCount = (adminAccount.loginCount || 0) + 1
        localStorage.setItem("adminAccount", JSON.stringify(adminAccount))

        // Create admin session
        const adminSession = {
          id: adminAccount.id,
          email: adminAccount.email,
          fullName: adminAccount.fullName,
          loginTime: new Date().toISOString(),
          role: "admin",
          permissions: adminAccount.permissions,
        }
        localStorage.setItem("adminSession", JSON.stringify(adminSession))

        // Log the login
        const loginLog = {
          id: Date.now(),
          type: "admin_login",
          message: `Admin login: ${formData.email}`,
          timestamp: new Date().toISOString(),
          ip: "127.0.0.1", // In real app, get actual IP
          userAgent: navigator.userAgent,
        }

        const existingLogs = JSON.parse(localStorage.getItem("systemLogs") || "[]")
        existingLogs.push(loginLog)
        localStorage.setItem("systemLogs", JSON.stringify(existingLogs))

        alert("Admin login successful!")
        router.push("/admin/dashboard")
      } else {
        alert("Invalid admin credentials. Please check your email and password.")
      }
    } catch (error) {
      console.error(error);
      alert("Login failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  if (!adminExists) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-700 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-2xl border-slate-600 bg-slate-800">
          <CardContent className="pt-6">
            <div className="text-center">
              <Shield className="h-16 w-16 text-blue-400 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-white mb-4">Admin Setup Required</h1>
              <Alert className="mb-6">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  No admin account found. You need to complete the one-time admin setup before you can login.
                </AlertDescription>
              </Alert>
              <div className="space-y-3">
                <Link href="/admin/signup">
                  <Button className="w-full">Complete Admin Setup</Button>
                </Link>
                <Link href="/">
                  <Button variant="outline" className="w-full">
                    Back to Home
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-700 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 mb-6">
            <Heart className="h-8 w-8 text-blue-400" />
            <span className="text-2xl font-bold text-white">MadeCare India</span>
          </Link>
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Shield className="h-8 w-8 text-blue-400" />
            <h1 className="text-3xl font-bold text-white">Admin Portal</h1>
          </div>
          <p className="text-slate-300">Secure access to administrative controls</p>
        </div>

        <Card className="shadow-2xl border-slate-600 bg-slate-800">
          <CardHeader>
            <CardTitle className="text-white">Administrator Sign In</CardTitle>
            <CardDescription className="text-slate-300">
              Enter your admin credentials to access the dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">
                  Admin Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter admin email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="pl-10 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter admin password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="pl-10 pr-10 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-200"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <input id="remember" type="checkbox" className="rounded border-slate-600 bg-slate-700" />
                  <Label htmlFor="remember" className="text-sm text-slate-300">
                    Remember me
                  </Label>
                </div>
                <Link href="/admin/forgot-password" className="text-sm text-blue-400 hover:underline">
                  Forgot password?
                </Link>
              </div>

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In to Admin Panel"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-slate-400">
                Need to setup admin account?{" "}
                <Link href="/admin/signup" className="text-blue-400 hover:underline">
                  Complete setup
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        res.setHeader('Set-Cookie', `token=admin_token; Path=/; HttpOnly;`);


        {/* Security Notice */}
        <div className="mt-4 text-center">
          <p className="text-xs text-slate-400">
            🔒 This is a secure admin portal. All activities are logged and monitored.
          </p>
        </div>
      </div>
    </div>
  )
}
