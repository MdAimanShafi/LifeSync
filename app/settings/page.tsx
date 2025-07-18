"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Heart, User, Bell, Palette, Shield, Trash2, Info, ArrowLeft, Save, Moon, Sun } from "lucide-react"
import Link from "next/link"

export default function SettingsPage() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [notifications, setNotifications] = useState({
    medicineReminders: true,
    healthTips: true,
    systemUpdates: false,
    emailNotifications: true,
  })

  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john@example.com",
    phone: "+91 9876543210",
    language: "english",
  })

  const handleSaveProfile = () => {
    // Save profile changes
    localStorage.setItem("userProfile", JSON.stringify(profile))
    alert("Profile updated successfully!")
  }

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: value,
    }))
    localStorage.setItem(
      "notificationSettings",
      JSON.stringify({
        ...notifications,
        [key]: value,
      }),
    )
  }

  const handleDeleteAccount = () => {
    if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      // In real app, this would call API to delete account
      localStorage.clear()
      alert("Account deletion request submitted. You will be contacted within 24 hours.")
    }
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? "bg-gray-900" : "bg-gradient-to-br from-blue-50 to-green-50"}`}>
      {/* Header */}
      <header className={`${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white"} border-b`}>
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <Heart className="h-6 w-6 text-blue-600" />
              <span className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>Settings</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Profile Settings */}
          <Card className={isDarkMode ? "bg-gray-800 border-gray-700" : ""}>
            <CardHeader>
              <CardTitle className={`flex items-center ${isDarkMode ? "text-white" : ""}`}>
                <User className="h-5 w-5 mr-2" />
                Profile Settings
              </CardTitle>
              <CardDescription className={isDarkMode ? "text-gray-300" : ""}>
                Update your personal information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className={isDarkMode ? "text-white" : ""}>
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className={isDarkMode ? "bg-gray-700 border-gray-600 text-white" : ""}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className={isDarkMode ? "text-white" : ""}>
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className={isDarkMode ? "bg-gray-700 border-gray-600 text-white" : ""}
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone" className={isDarkMode ? "text-white" : ""}>
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    className={isDarkMode ? "bg-gray-700 border-gray-600 text-white" : ""}
                  />
                </div>
                <div className="space-y-2">
                  <Label className={isDarkMode ? "text-white" : ""}>Language</Label>
                  <Select
                    value={profile.language}
                    onValueChange={(value) => setProfile({ ...profile, language: value })}
                  >
                    <SelectTrigger className={isDarkMode ? "bg-gray-700 border-gray-600 text-white" : ""}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="english">English (US)</SelectItem>
                      <SelectItem value="english-uk">English (UK)</SelectItem>
                      <SelectItem value="english-au">English (Australia)</SelectItem>
                      <SelectItem value="english-ca">English (Canada)</SelectItem>
                      <SelectItem value="simple-english">Simple English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button onClick={handleSaveProfile} className="w-full md:w-auto">
                <Save className="h-4 w-4 mr-2" />
                Save Profile
              </Button>
            </CardContent>
          </Card>

          {/* Theme Settings */}
          <Card className={isDarkMode ? "bg-gray-800 border-gray-700" : ""}>
            <CardHeader>
              <CardTitle className={`flex items-center ${isDarkMode ? "text-white" : ""}`}>
                <Palette className="h-5 w-5 mr-2" />
                Appearance
              </CardTitle>
              <CardDescription className={isDarkMode ? "text-gray-300" : ""}>
                Customize how the app looks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {isDarkMode ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                  <div>
                    <p className={`font-medium ${isDarkMode ? "text-white" : ""}`}>Dark Mode</p>
                    <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                      Switch to dark theme for better night viewing
                    </p>
                  </div>
                </div>
                <Switch checked={isDarkMode} onCheckedChange={setIsDarkMode} />
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card className={isDarkMode ? "bg-gray-800 border-gray-700" : ""}>
            <CardHeader>
              <CardTitle className={`flex items-center ${isDarkMode ? "text-white" : ""}`}>
                <Bell className="h-5 w-5 mr-2" />
                Notifications
              </CardTitle>
              <CardDescription className={isDarkMode ? "text-gray-300" : ""}>
                Manage your notification preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className={`font-medium ${isDarkMode ? "text-white" : ""}`}>Medicine Reminders</p>
                  <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                    Get notified when it's time to take your medicine
                  </p>
                </div>
                <Switch
                  checked={notifications.medicineReminders}
                  onCheckedChange={(value) => handleNotificationChange("medicineReminders", value)}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className={`font-medium ${isDarkMode ? "text-white" : ""}`}>Health Tips</p>
                  <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                    Receive daily health tips and advice
                  </p>
                </div>
                <Switch
                  checked={notifications.healthTips}
                  onCheckedChange={(value) => handleNotificationChange("healthTips", value)}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className={`font-medium ${isDarkMode ? "text-white" : ""}`}>System Updates</p>
                  <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                    Get notified about app updates and new features
                  </p>
                </div>
                <Switch
                  checked={notifications.systemUpdates}
                  onCheckedChange={(value) => handleNotificationChange("systemUpdates", value)}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className={`font-medium ${isDarkMode ? "text-white" : ""}`}>Email Notifications</p>
                  <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                    Receive important updates via email
                  </p>
                </div>
                <Switch
                  checked={notifications.emailNotifications}
                  onCheckedChange={(value) => handleNotificationChange("emailNotifications", value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Privacy & Security */}
          <Card className={isDarkMode ? "bg-gray-800 border-gray-700" : ""}>
            <CardHeader>
              <CardTitle className={`flex items-center ${isDarkMode ? "text-white" : ""}`}>
                <Shield className="h-5 w-5 mr-2" />
                Privacy & Security
              </CardTitle>
              <CardDescription className={isDarkMode ? "text-gray-300" : ""}>
                Manage your privacy and security settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link href="/auth/change-password">
                <Button variant="outline" className="w-full justify-start">
                  Change Password
                </Button>
              </Link>
              <Link href="/privacy-policy">
                <Button variant="outline" className="w-full justify-start">
                  Privacy Policy
                </Button>
              </Link>
              <Link href="/terms-of-service">
                <Button variant="outline" className="w-full justify-start">
                  Terms of Service
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* App Information */}
          <Card className={isDarkMode ? "bg-gray-800 border-gray-700" : ""}>
            <CardHeader>
              <CardTitle className={`flex items-center ${isDarkMode ? "text-white" : ""}`}>
                <Info className="h-5 w-5 mr-2" />
                App Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className={isDarkMode ? "text-gray-300" : "text-gray-600"}>Version</span>
                <span className={isDarkMode ? "text-white" : "text-gray-900"}>1.0.0</span>
              </div>
              <div className="flex justify-between">
                <span className={isDarkMode ? "text-gray-300" : "text-gray-600"}>Last Updated</span>
                <span className={isDarkMode ? "text-white" : "text-gray-900"}>January 2024</span>
              </div>
              <div className="flex justify-between">
                <span className={isDarkMode ? "text-gray-300" : "text-gray-600"}>Developer</span>
                <span className={isDarkMode ? "text-white" : "text-gray-900"}>MD Aiman Shafi</span>
              </div>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="flex items-center text-red-700">
                <Trash2 className="h-5 w-5 mr-2" />
                Danger Zone
              </CardTitle>
              <CardDescription className="text-red-600">
                Irreversible actions that will affect your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="destructive" onClick={handleDeleteAccount} className="w-full">
                Delete Account
              </Button>
              <p className="text-xs text-red-600 mt-2">
                This will permanently delete your account and all associated data. This action cannot be undone.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
