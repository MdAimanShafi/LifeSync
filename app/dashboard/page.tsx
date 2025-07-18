"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Heart,
  Bell,
  Clock,
  Plus,
  Settings,
  User,
  Activity,
  Pill,
  TrendingUp,
  AlertCircle,
  Brain,
  HelpCircle,
} from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const [todaysMedicines] = useState([
    { id: 1, name: "Vitamin D3", dosage: "1000 IU", time: "08:00 AM", taken: true },
    { id: 2, name: "Omega-3", dosage: "500mg", time: "12:00 PM", taken: true },
    { id: 3, name: "Multivitamin", dosage: "1 tablet", time: "06:00 PM", taken: false },
    { id: 4, name: "Calcium", dosage: "600mg", time: "09:00 PM", taken: false },
  ])

  const [upcomingReminders] = useState([
    { id: 1, medicine: "Multivitamin", time: "6:00 PM", timeLeft: "2 hours" },
    { id: 2, medicine: "Calcium", time: "9:00 PM", timeLeft: "5 hours" },
  ])

  const completionRate = Math.round((todaysMedicines.filter((m) => m.taken).length / todaysMedicines.length) * 100)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">LifeSync Smart Care</span>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <User className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back</h1>
          <p className="text-gray-600">Here&apos;s your health summary for today</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Progress</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completionRate}%</div>
              <Progress value={completionRate} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-2">
                {todaysMedicines.filter((m) => m.taken).length} of {todaysMedicines.length} medicines taken
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Medicines</CardTitle>
              <Pill className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4</div>
              <p className="text-xs text-muted-foreground">Currently tracking</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Streak</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7 days</div>
              <p className="text-xs text-muted-foreground">Keep it up!</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Next Reminder</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2h</div>
              <p className="text-xs text-muted-foreground">Multivitamin at 6:00 PM</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Today's Medicines */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Today's Medicines</CardTitle>
                  <CardDescription>Track your daily medication schedule</CardDescription>
                </div>
                <Link href="/medicines/add">
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Medicine
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {todaysMedicines.map((medicine) => (
                    <div
                      key={medicine.id}
                      className={`flex items-center justify-between p-4 rounded-lg border ${
                        medicine.taken ? "bg-green-50 border-green-200" : "bg-white border-gray-200"
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`w-3 h-3 rounded-full ${medicine.taken ? "bg-green-500" : "bg-gray-300"}`} />
                        <div>
                          <h3 className="font-medium">{medicine.name}</h3>
                          <p className="text-sm text-gray-600">{medicine.dosage}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="text-sm font-medium">{medicine.time}</p>
                          <Badge variant={medicine.taken ? "default" : "secondary"}>
                            {medicine.taken ? "Taken" : "Pending"}
                          </Badge>
                        </div>
                        {!medicine.taken && <Button size="sm">Mark Taken</Button>}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Reminders */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="h-5 w-5 mr-2" />
                  Upcoming Reminders
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingReminders.map((reminder) => (
                    <div key={reminder.id} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div>
                        <p className="font-medium text-sm">{reminder.medicine}</p>
                        <p className="text-xs text-gray-600">{reminder.time}</p>
                      </div>
                      <Badge variant="outline">{reminder.timeLeft}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Health Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  Health Tip
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg">
                  <h3 className="font-medium mb-2">Stay Hydrated</h3>
                  <p className="text-sm text-gray-600">
                    Drink at least 8 glasses of water daily to help your body absorb medications effectively.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Link href="/medicines/add">
                    <Button variant="outline" className="w-full justify-start">
                      <Plus className="h-4 w-4 mr-2" />
                      Add New Medicine
                    </Button>
                  </Link>
                  <Link href="/tools">
                    <Button variant="outline" className="w-full justify-start">
                      <Activity className="h-4 w-4 mr-2" />
                      Health Tools
                    </Button>
                  </Link>
                  <Link href="/ai-assistant">
                    <Button variant="outline" className="w-full justify-start">
                      <Brain className="h-4 w-4 mr-2" />
                      AI Assistant
                    </Button>
                  </Link>
                  <Link href="/settings">
                    <Button variant="outline" className="w-full justify-start">
                      <Settings className="h-4 w-4 mr-2" />
                      Settings
                    </Button>
                  </Link>
                  <Link href="/help">
                    <Button variant="outline" className="w-full justify-start">
                      <HelpCircle className="h-4 w-4 mr-2" />
                      Help & Support
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
