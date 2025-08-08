"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Heart, Eye, EyeOff, Mail, Lock, Shield, User, Phone, AlertTriangle } from "lucide-react"
import { useRouter } from "next/navigation"

export default function AdminSignupPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    recoveryEmail: "",
    adminCode: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [adminExists, setAdminExists] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check if admin already exists
    const existingAdmin = localStorage.getItem("adminAccount")
    if (existingAdmin) {
      setAdminExists(true)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Validate admin code (in real app, this would be a secure server-side check)
      const validAdminCode = "LifeSync2025Admin"
      if (formData.adminCode !== validAdminCode) {
        alert("Invalid admin setup code. Contact system administrator.")
        setIsLoading(false)
        return
      }

      // Check if passwords match
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords don't match!")
        setIsLoading(false)
        return
      }

      // Check password strength
      if (formData.password.length < 8) {
        alert("Password must be at least 8 characters long!")
        setIsLoading(false)
        return
      }

      // Check if admin already exists
      if (adminExists) {
        alert("Admin account already exists! Only one admin account is allowed.")
        setIsLoading(false)
        return
      }

      // Create admin account
      const adminAccount = {
        id: "admin_001",
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password, // In real app, this would be hashed
        recoveryEmail: formData.recoveryEmail,
        createdAt: new Date().toISOString(),
        lastLogin: null,
        loginCount: 0,
        permissions: {
          userManagement: true,
          dataExport: true,
          systemSettings: true,
          emergencyAccess: true,
          fullControl: true,
        },
      }

      // Save admin account
      localStorage.setItem("adminAccount", JSON.stringify(adminAccount))

      // Initialize admin data storage
      const adminData = {
        users: [],
        userLogins: [],
        systemLogs: [],
        emergencyAlerts: [],
        dataExports: [],
        createdAt: new Date().toISOString(),
      }
      localStorage.setItem("adminData", JSON.stringify(adminData))

      // Create system log
      const systemLog = {
        id: Date.now(),
        type: "admin_created",
        message: `Admin account created: ${formData.email}`,
        timestamp: new Date().toISOString(),
        severity: "info",
      }

      const existingLogs = JSON.parse(localStorage.getItem("systemLogs") || "[]")
      existingLogs.push(systemLog)
      localStorage.setItem("systemLogs", JSON.stringify(existingLogs))

      alert("Admin account created successfully! You can now login.")
      router.push("/admin/login")
    } catch (error) {
      console.error(error);
      alert("Error creating admin account. Please try again.")
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

  if (adminExists) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-700 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-2xl border-slate-600 bg-slate-800">
          <CardContent className="pt-6">
            <div className="text-center">
              <AlertTriangle className="h-16 w-16 text-red-400 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-white mb-4">Admin Account Exists</h1>
              <Alert className="mb-6">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  An admin account has already been created for this system. Only one admin account is allowed for
                  security purposes.
                </AlertDescription>
              </Alert>
              <div className="space-y-3">
                <Link href="/admin/login">
                  <Button className="w-full">Go to Admin Login</Button>
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
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 mb-6">
            <Heart className="h-8 w-8 text-blue-400" />
            <span className="text-2xl font-bold text-white">MadeCare India</span>
          </Link>
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Shield className="h-8 w-8 text-blue-400" />
            <h1 className="text-3xl font-bold text-white">Admin Setup</h1>
          </div>
          <p className="text-slate-300">Create the first and only admin account for the system</p>
        </div>

        <Card className="shadow-2xl border-slate-600 bg-slate-800">
          <CardHeader>
            <CardTitle className="text-white">Administrator Account Setup</CardTitle>
            <CardDescription className="text-slate-300">
              This is a one-time setup. After creating this account, no additional admin accounts can be created.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Alert className="mb-6 bg-blue-900/50 border-blue-700">
              <Shield className="h-4 w-4" />
              <AlertDescription className="text-blue-200">
                <strong>Security Notice:</strong> This admin account will have full system access including user
                management, data export, and system configuration.
              </AlertDescription>
            </Alert>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-white">
                    Full Name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input
                      id="fullName"
                      name="fullName"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="pl-10 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                      required
                    />
                  </div>
                </div>

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
                      placeholder="admin@madecare.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="pl-10 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-white">
                    Phone Number
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+91 9876543210"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="pl-10 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="recoveryEmail" className="text-white">
                    Recovery Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input
                      id="recoveryEmail"
                      name="recoveryEmail"
                      type="email"
                      placeholder="recovery@example.com"
                      value={formData.recoveryEmail}
                      onChange={handleInputChange}
                      className="pl-10 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
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
                      placeholder="Create a strong password"
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

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-white">
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="pl-10 pr-10 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-3 text-slate-400 hover:text-slate-200"
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="adminCode" className="text-white">
                  Admin Setup Code
                </Label>
                <div className="relative">
                  <Shield className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    id="adminCode"
                    name="adminCode"
                    type="password"
                    placeholder="Enter admin setup code"
                    value={formData.adminCode}
                    onChange={handleInputChange}
                    className="pl-10 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                    required
                  />
                </div>
                <p className="text-xs text-slate-400">
                  
                </p>
              </div>

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
                {isLoading ? "Creating Admin Account..." : "Create Admin Account"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-slate-400">
                Already have an admin account?{" "}
                <Link href="/admin/login" className="text-blue-400 hover:underline">
                  Sign in here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
        
        {/* Security Notice */}
        <div className="mt-4 text-center">
          <p className="text-xs text-slate-400">
            🔒 This admin account will have complete system access. Keep credentials secure.
          </p>
        </div>
      </div>
    </div>
  )
}
