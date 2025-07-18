"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Heart,
  Users,
  Activity,
  Bell,
  Settings,
  Search,
  Download,
  Plus,
  Edit,
  Trash2,
  Eye,
  TrendingUp,
  AlertTriangle,
  LogOut,
  FileText,
  MessageSquare,
  Code,
  Star,
  Layers,
  PenTool,
} from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"

interface User {
  id: string
  fullName: string
  email: string
  phone: string
  status: "active" | "inactive"
  registrationTime: string
  lastLogin: string | null
  medicines: number
  complianceRate: number
  totalLogins: number
  location: string
  gender: string
  dob: string
}

interface UserLogin {
  id: number
  email: string
  loginTime: string
  ipAddress: string
  userAgent: string
  deviceInfo: any
  sessionDuration: string | null
  status: string
}

interface SystemLog {
  id: number
  type: string
  message: string
  timestamp: string
  severity: string
  details?: any
}

interface Feedback {
  id: number
  name: string
  email: string
  subject: string
  message: string
  rating: number
  timestamp: string
  status: "read" | "unread"
}

export default function AdminDashboardPage() {
  const router = useRouter()
  const [users, setUsers] = useState<User[]>([])
  const [userLogins, setUserLogins] = useState<UserLogin[]>([])
  const [systemLogs, setSystemLogs] = useState<SystemLog[]>([])
  const [feedback, setFeedback] = useState<Feedback[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isFeedbackDialogOpen, setIsFeedbackDialogOpen] = useState(false)
  const [adminSession, setAdminSession] = useState<any>(null)

  useEffect(() => {
    // Check admin authentication
    const session = localStorage.getItem("adminSession")
    if (!session) {
      router.push("/admin/login")
      return
    }

    setAdminSession(JSON.parse(session))
    loadAdminData()
  }, [router])

  const loadAdminData = () => {
    // Load all admin data
    const adminData = JSON.parse(localStorage.getItem("adminData") || '{"users": [], "userLogins": []}')
    const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]")
    const userLoginData = JSON.parse(localStorage.getItem("userLoginData") || "[]")
    const logs = JSON.parse(localStorage.getItem("systemLogs") || "[]")
    const userFeedback = JSON.parse(localStorage.getItem("userFeedback") || "[]")

    // Combine and format user data
    const combinedUsers = registeredUsers.map((user: any) => ({
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      status: user.status || "active",
      registrationTime: user.registrationTime,
      lastLogin: getLastLogin(user.email, userLoginData),
      medicines: Math.floor(Math.random() * 6), // Simulated
      complianceRate: Math.floor(Math.random() * 40) + 60, // Simulated
      totalLogins: getUserLoginCount(user.email, userLoginData),
      location: user.location,
      gender: user.gender,
      dob: user.dob,
    }))

    setUsers(combinedUsers)
    setUserLogins(adminData.userLogins || [])
    setSystemLogs(logs)
    setFeedback(userFeedback)
  }

  const getLastLogin = (email: string, loginData: any[]) => {
    const userLogins = loginData.filter((login) => login.email === email)
    if (userLogins.length === 0) return null
    return userLogins[userLogins.length - 1].loginTime
  }

  const getUserLoginCount = (email: string, loginData: any[]) => {
    return loginData.filter((login) => login.email === email).length
  }

  const filteredUsers = users.filter(
    (user) =>
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const totalUsers = users.length
  const activeUsers = users.filter((u) => u.status === "active").length
  const totalLogins = userLogins.length
  const unreadFeedback = feedback.filter((f) => f.status === "unread").length
  const avgComplianceRate =
    users.length > 0 ? Math.round(users.reduce((sum, user) => sum + user.complianceRate, 0) / users.length) : 0

  const handleEditUser = (user: User) => {
    setSelectedUser(user)
    setIsEditDialogOpen(true)
  }

  const handleViewUser = (user: User) => {
    setSelectedUser(user)
    setIsViewDialogOpen(true)
  }

  const handleViewFeedback = (item: Feedback) => {
    // Mark as read
    const updatedFeedback = feedback.map((f) => (f.id === item.id ? { ...f, status: "read" } : f))
    localStorage.setItem("userFeedback", JSON.stringify(updatedFeedback))
  

    // Show dialog
    setSelectedFeedback(item)
    setIsFeedbackDialogOpen(true)
  }

  const handleSaveUser = () => {
    if (!selectedUser) return

    // Update user in localStorage
    const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]")
    const updatedUsers = registeredUsers.map((user: any) =>
      user.id === selectedUser.id ? { ...user, ...selectedUser } : user,
    )
    localStorage.setItem("registeredUsers", JSON.stringify(updatedUsers))

    // Update local state
    setUsers(users.map((user) => (user.id === selectedUser.id ? selectedUser : user)))

    // Log the action
    const systemLog = {
      id: Date.now(),
      type: "user_edited",
      message: `Admin edited user: ${selectedUser.email}`,
      timestamp: new Date().toISOString(),
      severity: "info",
      details: { userId: selectedUser.id, adminEmail: adminSession?.email },
    }

    const existingLogs = JSON.parse(localStorage.getItem("systemLogs") || "[]")
    existingLogs.push(systemLog)
    localStorage.setItem("systemLogs", JSON.stringify(existingLogs))

    setIsEditDialogOpen(false)
    alert("User updated successfully!")
    loadAdminData()
  }

  const handleDeleteUser = (userId: string) => {
    if (!confirm("Are you sure you want to delete this user? This action cannot be undone.")) return

    // Remove from localStorage
    const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]")
    const updatedUsers = registeredUsers.filter((user: any) => user.id !== userId)
    localStorage.setItem("registeredUsers", JSON.stringify(updatedUsers))

    // Update local state
    setUsers(users.filter((user) => user.id !== userId))

    // Log the action
    const deletedUser = users.find((user) => user.id === userId)
    const systemLog = {
      id: Date.now(),
      type: "user_deleted",
      message: `Admin deleted user: ${deletedUser?.email}`,
      timestamp: new Date().toISOString(),
      severity: "warning",
      details: { userId, adminEmail: adminSession?.email },
    }

    const existingLogs = JSON.parse(localStorage.getItem("systemLogs") || "[]")
    existingLogs.push(systemLog)
    localStorage.setItem("systemLogs", JSON.stringify(existingLogs))

    alert("User deleted successfully!")
    loadAdminData()
  }

  const handleDeleteFeedback = (feedbackId: number) => {
    if (!confirm("Are you sure you want to delete this feedback?")) return

    // Remove from localStorage
    const updatedFeedback = feedback.filter((f) => f.id !== feedbackId)
    localStorage.setItem("userFeedback", JSON.stringify(updatedFeedback))

    // Update local state
    setFeedback(updatedFeedback)
    setIsFeedbackDialogOpen(false)

    // Log the action
    const systemLog = {
      id: Date.now(),
      type: "feedback_deleted",
      message: `Admin deleted feedback`,
      timestamp: new Date().toISOString(),
      severity: "info",
    }

    const existingLogs = JSON.parse(localStorage.getItem("systemLogs") || "[]")
    existingLogs.push(systemLog)
    localStorage.setItem("systemLogs", JSON.stringify(existingLogs))
  }

  const handleExportAllData = () => {
    const allData = {
      users: users,
      userLogins: userLogins,
      systemLogs: systemLogs,
      feedback: feedback,
      exportTime: new Date().toISOString(),
      exportedBy: adminSession?.email,
    }

    const dataStr = JSON.stringify(allData, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = `madecare_complete_data_${new Date().toISOString().split("T")[0]}.json`
    link.click()
    URL.revokeObjectURL(url)

    // Log the export
    const systemLog = {
      id: Date.now(),
      type: "data_export",
      message: `Admin exported all data`,
      timestamp: new Date().toISOString(),
      severity: "info",
      details: { adminEmail: adminSession?.email, recordCount: users.length },
    }

    const existingLogs = JSON.parse(localStorage.getItem("systemLogs") || "[]")
    existingLogs.push(systemLog)
    localStorage.setItem("systemLogs", JSON.stringify(existingLogs))
  }

  const handleLogout = () => {
    // Log the logout
    const systemLog = {
      id: Date.now(),
      type: "admin_logout",
      message: `Admin logout: ${adminSession?.email}`,
      timestamp: new Date().toISOString(),
      severity: "info",
    }

    const existingLogs = JSON.parse(localStorage.getItem("systemLogs") || "[]")
    existingLogs.push(systemLog)
    localStorage.setItem("systemLogs", JSON.stringify(existingLogs))

    localStorage.removeItem("adminSession")
    router.push("/admin/login")
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Enhanced Header */}
      <header className="bg-white border-b shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">MadeCare India</span>
            <Badge variant="secondary" className="ml-2 bg-red-100 text-red-800">
              Admin Control Center
            </Badge>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="outline" className="bg-green-50 text-green-700">
              {systemLogs.filter((log) => log.severity === "warning").length} Alerts
            </Badge>
            {unreadFeedback > 0 && <Badge variant="destructive">{unreadFeedback} New Feedback</Badge>}
            <Button variant="ghost" size="sm">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Control Center</h1>
            <p className="text-gray-600">
              Complete system control - Welcome back, {adminSession?.fullName || adminSession?.email?.split("@")[0]}!
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Last login: {new Date().toLocaleString()}</p>
            <p className="text-sm text-gray-500">Admin: {adminSession?.email}</p>
          </div>
        </div>

        {/* App Editor Banner */}
        <Card className="mb-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <CardContent className="p-6 flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold mb-2">App Editor & Customization</h2>
              <p>Modify app content, add new features, or customize the entire application</p>
            </div>
            <Link href="/admin/app-editor">
              <Button variant="secondary" size="lg" className="whitespace-nowrap">
                <PenTool className="h-4 w-4 mr-2" />
                Open App Editor
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Enhanced Stats Cards */}
        <div className="grid md:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalUsers}</div>
              <p className="text-xs text-muted-foreground">Registered accounts</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeUsers}</div>
              <p className="text-xs text-muted-foreground">
                {totalUsers > 0 ? Math.round((activeUsers / totalUsers) * 100) : 0}% of total
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Logins</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalLogins}</div>
              <p className="text-xs text-muted-foreground">All time logins</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Feedback</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{feedback.length}</div>
              <p className="text-xs text-muted-foreground">{unreadFeedback} unread</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">System Logs</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{systemLogs.length}</div>
              <p className="text-xs text-muted-foreground">Total events</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid grid-cols-5">
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="logins">Login Tracking</TabsTrigger>
            <TabsTrigger value="feedback">User Feedback</TabsTrigger>
            <TabsTrigger value="logs">System Logs</TabsTrigger>
            <TabsTrigger value="editor">App Editor</TabsTrigger>
          </TabsList>

          {/* Users Tab */}
          <TabsContent value="users">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Complete User Management</CardTitle>
                  <CardDescription>Full control over all user accounts and data</CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={handleExportAllData}>
                    <Download className="h-4 w-4 mr-2" />
                    Export All Data
                  </Button>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add User
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {/* Search */}
                <div className="flex items-center space-x-2 mb-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search users by name, email, or phone..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Users Table */}
                <div className="space-y-4">
                  {filteredUsers.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center justify-between p-4 rounded-lg border bg-white hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-medium">
                            {user.fullName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-medium">{user.fullName}</h3>
                          <p className="text-sm text-gray-600">{user.email}</p>
                          <p className="text-xs text-gray-500">{user.phone}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge variant={user.status === "active" ? "default" : "secondary"}>{user.status}</Badge>
                            <Badge variant="outline">{user.totalLogins} logins</Badge>
                            <Badge variant={user.complianceRate >= 80 ? "default" : "destructive"}>
                              {user.complianceRate}% compliance
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="text-xs text-gray-500">
                            Registered: {new Date(user.registrationTime).toLocaleDateString()}
                          </p>
                          <p className="text-xs text-gray-500">
                            Last login: {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : "Never"}
                          </p>
                          <p className="text-xs text-gray-500">Location: {user.location}</p>
                        </div>
                        <div className="flex flex-col space-y-1">
                          <Button variant="ghost" size="sm" onClick={() => handleViewUser(user)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleEditUser(user)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-600 hover:text-red-700"
                            onClick={() => handleDeleteUser(user.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Login Tracking Tab */}
          <TabsContent value="logins">
            <Card>
              <CardHeader>
                <CardTitle>User Login Tracking</CardTitle>
                <CardDescription>Complete history of all user login activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userLogins.slice(0, 20).map((login) => (
                    <div key={login.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{login.email}</p>
                        <p className="text-sm text-gray-600">{new Date(login.loginTime).toLocaleString()}</p>
                        <p className="text-xs text-gray-500">IP: {login.ipAddress}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant={login.status === "active" ? "default" : "secondary"}>{login.status}</Badge>
                        <p className="text-xs text-gray-500 mt-1">{login.deviceInfo?.platform || "Unknown Platform"}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Feedback Tab */}
          <TabsContent value="feedback">
            <Card>
              <CardHeader>
                <CardTitle>User Feedback</CardTitle>
                <CardDescription>All feedback and suggestions from users</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {feedback.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">No feedback received yet.</div>
                  ) : (
                    feedback.map((item) => (
                      <div
                        key={item.id}
                        className={`flex items-center justify-between p-4 rounded-lg border ${item.status === "unread" ? "bg-blue-50 border-blue-200" : "bg-white"} hover:shadow-md transition-shadow cursor-pointer`}
                        onClick={() => handleViewFeedback(item)}
                      >
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="font-medium">{item.subject}</h3>
                            {item.status === "unread" && <Badge variant="default">New</Badge>}
                          </div>
                          <p className="text-sm text-gray-600">
                            From: {item.name} ({item.email})
                          </p>
                          <p className="text-xs text-gray-500">{new Date(item.timestamp).toLocaleString()}</p>
                          <div className="flex mt-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${i < item.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                              />
                            ))}
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* System Logs Tab */}
          <TabsContent value="logs">
            <Card>
              <CardHeader>
                <CardTitle>System Activity Logs</CardTitle>
                <CardDescription>Complete system activity and security logs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {systemLogs
                    .slice()
                    .reverse()
                    .slice(0, 50)
                    .map((log) => (
                      <Alert
                        key={log.id}
                        className={`${
                          log.severity === "warning"
                            ? "border-orange-300 bg-orange-50"
                            : log.severity === "error"
                              ? "border-red-300 bg-red-50"
                              : "border-blue-300 bg-blue-50"
                        }`}
                      >
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription className="flex justify-between items-center">
                          <div>
                            <strong>{log.type.replace("_", " ").toUpperCase()}</strong>: {log.message}
                            <span className="text-xs text-gray-500 ml-2">
                              ({new Date(log.timestamp).toLocaleString()})
                            </span>
                          </div>
                          <Badge
                            variant={
                              log.severity === "warning"
                                ? "destructive"
                                : log.severity === "error"
                                  ? "destructive"
                                  : "default"
                            }
                          >
                            {log.severity}
                          </Badge>
                        </AlertDescription>
                      </Alert>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* App Editor Tab */}
          <TabsContent value="editor">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Code className="h-6 w-6 mr-2" />
                  App Editor & Customization
                </CardTitle>
                <CardDescription>
                  Modify app content, add new features, or customize the entire application
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader className="bg-blue-50">
                      <CardTitle className="text-blue-700">Content Editor</CardTitle>
                      <CardDescription>Modify text, images, and content throughout the app</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <Link href="/admin/app-editor/content">
                          <Button className="w-full">
                            <PenTool className="h-4 w-4 mr-2" />
                            Edit App Content
                          </Button>
                        </Link>
                        <p className="text-sm text-gray-600">
                          Change text, update images, modify FAQs, and customize all content displayed in the app.
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="bg-purple-50">
                      <CardTitle className="text-purple-700">Feature Manager</CardTitle>
                      <CardDescription>Enable, disable, or customize app features</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <Link href="/admin/app-editor/features">
                          <Button className="w-full" variant="secondary">
                            <Layers className="h-4 w-4 mr-2" />
                            Manage Features
                          </Button>
                        </Link>
                        <p className="text-sm text-gray-600">
                          Control which features are available to users and customize how they work.
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="bg-green-50">
                      <CardTitle className="text-green-700">Page Builder</CardTitle>
                      <CardDescription>Create and modify app pages</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <Link href="/admin/app-editor/pages">
                          <Button className="w-full" variant="outline">
                            <Layers className="h-4 w-4 mr-2" />
                            Edit Pages
                          </Button>
                        </Link>
                        <p className="text-sm text-gray-600">
                          Add new pages, modify existing ones, or change the layout and structure of the app.
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="bg-amber-50">
                      <CardTitle className="text-amber-700">Code Editor</CardTitle>
                      <CardDescription>Advanced customization with direct code access</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <Link href="/admin/app-editor/code">
                          <Button className="w-full" variant="outline">
                            <Code className="h-4 w-4 mr-2" />
                            Edit Code
                          </Button>
                        </Link>
                        <p className="text-sm text-gray-600">
                          For advanced users: directly modify the app's code to add custom functionality.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Edit User Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit User Details</DialogTitle>
            <DialogDescription>Modify user information and settings</DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Full Name</Label>
                  <Input
                    id="edit-name"
                    value={selectedUser.fullName}
                    onChange={(e) => setSelectedUser({ ...selectedUser, fullName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-email">Email</Label>
                  <Input
                    id="edit-email"
                    value={selectedUser.email}
                    onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-phone">Phone</Label>
                  <Input
                    id="edit-phone"
                    value={selectedUser.phone}
                    onChange={(e) => setSelectedUser({ ...selectedUser, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-location">Location</Label>
                  <Input
                    id="edit-location"
                    value={selectedUser.location}
                    onChange={(e) => setSelectedUser({ ...selectedUser, location: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-status">Status</Label>
                  <select
                    id="edit-status"
                    className="w-full p-2 border rounded-md"
                    value={selectedUser.status}
                    onChange={(e) =>
                      setSelectedUser({ ...selectedUser, status: e.target.value as "active" | "inactive" })
                    }
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-compliance">Compliance Rate (%)</Label>
                  <Input
                    id="edit-compliance"
                    type="number"
                    min="0"
                    max="100"
                    value={selectedUser.complianceRate}
                    onChange={(e) =>
                      setSelectedUser({ ...selectedUser, complianceRate: Number.parseInt(e.target.value) || 0 })
                    }
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSaveUser}>Save Changes</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* View User Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Complete User Profile</DialogTitle>
            <DialogDescription>Detailed view of user information and activity</DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium mb-4">Personal Information</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Full Name:</span>
                    <span className="font-medium">{selectedUser.fullName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Email:</span>
                    <span className="font-medium">{selectedUser.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Phone:</span>
                    <span className="font-medium">{selectedUser.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Gender:</span>
                    <span className="font-medium">{selectedUser.gender}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Date of Birth:</span>
                    <span className="font-medium">{selectedUser.dob}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Location:</span>
                    <span className="font-medium">{selectedUser.location}</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-medium mb-4">Account Activity</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Status:</span>
                    <Badge variant={selectedUser.status === "active" ? "default" : "secondary"}>
                      {selectedUser.status}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Registration:</span>
                    <span className="font-medium">{new Date(selectedUser.registrationTime).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Last Login:</span>
                    <span className="font-medium">
                      {selectedUser.lastLogin ? new Date(selectedUser.lastLogin).toLocaleDateString() : "Never"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Total Logins:</span>
                    <span className="font-medium">{selectedUser.totalLogins}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Medicines:</span>
                    <span className="font-medium">{selectedUser.medicines}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Compliance Rate:</span>
                    <Badge variant={selectedUser.complianceRate >= 80 ? "default" : "destructive"}>
                      {selectedUser.complianceRate}%
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* View Feedback Dialog */}
      <Dialog open={isFeedbackDialogOpen} onOpenChange={setIsFeedbackDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>User Feedback</DialogTitle>
            <DialogDescription>Feedback and suggestions from users</DialogDescription>
          </DialogHeader>
          {selectedFeedback && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">{selectedFeedback.subject}</h3>
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${i < selectedFeedback.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="whitespace-pre-line">{selectedFeedback.message}</p>
              </div>

              <div className="flex justify-between text-sm text-gray-500">
                <div>
                  <p>From: {selectedFeedback.name}</p>
                  <p>Email: {selectedFeedback.email}</p>
                </div>
                <p>Submitted: {new Date(selectedFeedback.timestamp).toLocaleString()}</p>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="destructive" onClick={() => handleDeleteFeedback(selectedFeedback.id)}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Feedback
                </Button>
                <Button onClick={() => setIsFeedbackDialogOpen(false)}>Close</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
