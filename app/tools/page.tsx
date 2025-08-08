"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Heart, Calculator, Droplets, Moon, MapPin, DollarSign, ArrowLeft, Plus, Minus } from "lucide-react"
import Link from "next/link"

export default function ToolsPage() {
  // BMI Calculator State
  const [bmiData, setBmiData] = useState({
    height: "",
    weight: "",
    result: null as number | null,
    category: "",
  })

  // Water Tracker State
  const [waterIntake, setWaterIntake] = useState({
    current: 4, 
    target: 8,
    glasses: [] as string[],
  })

  // Sleep Tracker State
  const [sleepData, setSleepData] = useState({
    bedtime: "",
    wakeup: "",
    duration: "",
    quality: "",
  })

  // Expense Tracker State
  const [expenses, setExpenses] = useState([
    { id: 1, medicine: "Vitamin D3", amount: 250, date: "2025-01-15" },
    { id: 2, medicine: "Omega-3", amount: 450, date: "2025-01-14" },
    { id: 3, medicine: "Multivitamin", amount: 180, date: "2025-01-13" },
  ])

  const calculateBMI = () => {
    const height = Number.parseFloat(bmiData.height) / 100 // Convert cm to m
    const weight = Number.parseFloat(bmiData.weight)

    if (height > 0 && weight > 0) {
      const bmi = weight / (height * height)
      let category = ""

      if (bmi < 18.5) category = "Underweight"
      else if (bmi < 25) category = "Normal weight"
      else if (bmi < 30) category = "Overweight"
      else category = "Obese"

      setBmiData({
        ...bmiData,
        result: Math.round(bmi * 10) / 10,
        category,
      })
    }
  }

  const addWaterGlass = () => {
    if (waterIntake.current < 20) {
      setWaterIntake({
        ...waterIntake,
        current: waterIntake.current + 1,
        glasses: [...waterIntake.glasses, new Date().toLocaleTimeString()],
      })
    }
  }

  const removeWaterGlass = () => {
    if (waterIntake.current > 0) {
      setWaterIntake({
        ...waterIntake,
        current: waterIntake.current - 1,
        glasses: waterIntake.glasses.slice(0, -1),
      })
    }
  }

  const calculateSleepDuration = () => {
    if (sleepData.bedtime && sleepData.wakeup) {
      const bedtime = new Date(`2025-01-01 ${sleepData.bedtime}`)
      const wakeup = new Date(`2025-01-01 ${sleepData.wakeup}`)

      if (wakeup < bedtime) {
        wakeup.setDate(wakeup.getDate() + 1)
      }

      const duration = (wakeup.getTime() - bedtime.getTime()) / (1000 * 60 * 60)
      setSleepData({
        ...sleepData,
        duration: `${Math.floor(duration)}h ${Math.round((duration % 1) * 60)}m`,
      })
    }
  }

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <header className="bg-white border-b">
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
              <span className="text-xl font-bold text-gray-900">Health Tools</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* BMI Calculator */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calculator className="h-5 w-5 mr-2" />
                  BMI Calculator
                </CardTitle>
                <CardDescription>Calculate your Body Mass Index to assess your weight status</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="height">Height (cm)</Label>
                    <Input
                      id="height"
                      type="number"
                      placeholder="170"
                      value={bmiData.height}
                      onChange={(e) => setBmiData({ ...bmiData, height: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="weight">Weight (kg)</Label>
                    <Input
                      id="weight"
                      type="number"
                      placeholder="70"
                      value={bmiData.weight}
                      onChange={(e) => setBmiData({ ...bmiData, weight: e.target.value })}
                    />
                  </div>
                </div>

                <Button onClick={calculateBMI} className="w-full">
                  Calculate BMI
                </Button>

                {bmiData.result && (
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600">{bmiData.result}</div>
                      <Badge variant={bmiData.category === "Normal weight" ? "default" : "secondary"} className="mt-2">
                        {bmiData.category}
                      </Badge>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Water Tracker */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Droplets className="h-5 w-5 mr-2" />
                  Water Tracker
                </CardTitle>
                <CardDescription>Track your daily water intake to stay hydrated</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    {waterIntake.current}/{waterIntake.target}
                  </div>
                  <p className="text-sm text-gray-600">Glasses of water today</p>
                  <Progress value={(waterIntake.current / waterIntake.target) * 100} className="mt-4" />
                </div>

                <div className="flex justify-center space-x-4">
                  <Button variant="outline" size="sm" onClick={removeWaterGlass} disabled={waterIntake.current === 0}>
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Button onClick={addWaterGlass} disabled={waterIntake.current >= 20}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Glass
                  </Button>
                </div>

                {waterIntake.current >= waterIntake.target && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-center">
                    <p className="text-green-800 font-medium">🎉 Great job! You've reached your daily water goal!</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Sleep Tracker */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Moon className="h-5 w-5 mr-2" />
                  Sleep Tracker
                </CardTitle>
                <CardDescription>Monitor your sleep patterns for better health</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="bedtime">Bedtime</Label>
                    <Input
                      id="bedtime"
                      type="time"
                      value={sleepData.bedtime}
                      onChange={(e) => setSleepData({ ...sleepData, bedtime: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="wakeup">Wake up time</Label>
                    <Input
                      id="wakeup"
                      type="time"
                      value={sleepData.wakeup}
                      onChange={(e) => setSleepData({ ...sleepData, wakeup: e.target.value })}
                    />
                  </div>
                </div>

                <Button onClick={calculateSleepDuration} className="w-full">
                  Calculate Sleep Duration
                </Button>

                {sleepData.duration && (
                  <div className="p-4 bg-purple-50 rounded-lg text-center">
                    <div className="text-2xl font-bold text-purple-600">{sleepData.duration}</div>
                    <p className="text-sm text-purple-700 mt-1">Total sleep time</p>
                    <Badge
                      variant={
                        sleepData.duration.includes("7") || sleepData.duration.includes("8") ? "default" : "secondary"
                      }
                      className="mt-2"
                    >
                      {sleepData.duration.includes("7") || sleepData.duration.includes("8")
                        ? "Good"
                        : "Needs improvement"}
                    </Badge>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Medical Expense Tracker */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="h-5 w-5 mr-2" />
                  Medical Expenses
                </CardTitle>
                <CardDescription>Track your medicine and healthcare costs</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">₹{totalExpenses}</div>
                    <p className="text-sm text-green-700">Total this month</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Recent Expenses</h4>
                  {expenses.map((expense) => (
                    <div key={expense.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <div>
                        <p className="font-medium text-sm">{expense.medicine}</p>
                        <p className="text-xs text-gray-600">{expense.date}</p>
                      </div>
                      <span className="font-medium">₹{expense.amount}</span>
                    </div>
                  ))}
                </div>

                <Button variant="outline" className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Expense
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Hospital Locator */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                Nearby Hospitals
              </CardTitle>
              <CardDescription>Find hospitals and clinics near your location</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium">Saptgiri Hospital</h3>
                  <p className="text-sm text-gray-600">Mandir Hasaud, Chowk,Raipur,Chhattisgarh 492101</p>
                  <p className="text-sm text-gray-600">Emergency Helpline:09770190413 Available 24/7</p>
                  <Button size="sm" className="mt-2">
                    Get Directions
                  </Button>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium">Balco Hospital</h3>
                  <p className="text-sm text-gray-600">Sector 36,uparwara,Atalnagar Nava Raipu 493661r</p>
                  <p className="text-sm text-gray-600">Open:24/7</p>
                  <Button size="sm" className="mt-2">
                    Get Directions
                  </Button>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium">Urmila Memorial Hospital</h3>
                  <p className="text-sm text-gray-600">Bhatagaon Raipur</p>
                  <p className="text-sm text-gray-600">Specialist available</p>
                  <Button size="sm" className="mt-2">
                    Get Directions
                  </Button>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium">NHMMI Hospital</h3>
                  <p className="text-sm text-gray-600">Dhamtari Road,Pachpedi Naka,Raipur</p>
                  <p className="text-sm text-gray-600">Specialist available</p>
                  <Button size="sm" className="mt-2">
                    Get Directions
                  </Button>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium">VY Hospital</h3>
                  <p className="text-sm text-gray-600">Kamla Vihar near Sector 12 492001</p>
                  <p className="text-sm text-gray-600">Specialist available</p>
                  <Button size="sm" className="mt-2">
                    Get Directions
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
