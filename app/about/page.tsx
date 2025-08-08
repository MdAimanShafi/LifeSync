"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import {
  Button,
} from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Heart,
  ArrowLeft,
  Mail,
  Globe,
  Shield,
  Users,
  Target,
  Award,
  Code,
  Smartphone,
} from "lucide-react"
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogAction } from "@/components/ui/alert-dialog"

export default function AboutPage() {
  const [hasMounted, setHasMounted] = useState(false)

  // Medicine Reminder Demo Section state and logic
  interface Medicine {
    name: string;
    time: string;
  }
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [newMedicine, setNewMedicine] = useState("");
  const [reminderTime, setReminderTime] = useState("");
  const [reminderDue, setReminderDue] = useState(false);
  const [taken, setTaken] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    setHasMounted(true)
  }, [])

  // Simulate reminder check (runs every minute)
  useEffect(() => {
    if (!reminderTime || medicines.length === 0 || taken) return;
    const interval = setInterval(() => {
      const now = new Date();
      const [h, m] = reminderTime.split(":");
      if (
        now.getHours() === parseInt(h) &&
        now.getMinutes() === parseInt(m) &&
        !reminderDue
      ) {
        setReminderDue(true);
        setShowDialog(true);
      }
    }, 1000 * 10); // check every 10 seconds for demo
    return () => clearInterval(interval);
  }, [reminderTime, medicines, taken, reminderDue]);

  const handleAddMedicine = () => {
    if (newMedicine && reminderTime) {
      setMedicines([{ name: newMedicine, time: reminderTime }]);
      setTaken(false);
      setReminderDue(false);
      setNewMedicine("");
      setReminderTime("");
    }
  };

  const handleTakeMedicine = () => {
    setTaken(true);
    setReminderDue(false);
    setShowDialog(false);
    setTimeout(() => {
      setMedicines([]); // Remove medicine after taken
      setTaken(false);
    }, 2000); // Remove after 2 seconds for demo
  };

  if (!hasMounted) return null

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
              <span className="text-xl font-bold text-gray-900">
                About LifeSync
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <Heart className="h-16 w-16 text-blue-600 mr-4" />
              <div>
                <h1 className="text-4xl font-bold text-gray-900">LifeSync</h1>
                <p className="text-xl text-blue-600 font-medium">
                  Smart Healthcare Made Simple
                </p>
              </div>
            </div>
            <Badge variant="secondary" className="text-lg px-4 py-2">
             July 2025
            </Badge>
          </div>

          {/* Mission Statement */}
          <Card className="bg-gradient-to-r from-blue-600 to-green-600 text-white">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <Target className="h-6 w-6 mr-2" />
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg leading-relaxed">
                To empower every individual in India with intelligent healthcare
                management tools that make medicine tracking effortless, health
                monitoring seamless, and healthcare accessible to all. We believe
                that technology should serve humanity, especially in healthcare
                where consistency and care can save lives.
              </p>
            </CardContent>
          </Card>

          {/* Key Features */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Smartphone className="h-6 w-6 mr-2" />
                What Makes LifeSync Special
              </CardTitle>
              <CardDescription>
                Comprehensive healthcare management in your pocket
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    icon: Heart,
                    title: "Smart Medicine Reminders",
                    desc:
                      "Never miss a dose with intelligent scheduling and personalized notifications",
                    bg: "bg-blue-100 text-blue-600",
                  },
                  {
                    icon: Shield,
                    title: "Bank-Level Security",
                    desc:
                      "Your health data is encrypted and protected with industry‑standard security",
                    bg: "bg-green-100 text-green-600",
                  },
                  {
                    icon: Code,
                    title: "AI‑Powered Assistant",
                    desc:
                      "Get personalized health insights and emotional support from our caring AI companion",
                    bg: "bg-purple-100 text-purple-600",
                  },
                  {
                    icon: Users,
                    title: "Family Care",
                    desc:
                      "Manage health for your entire family with separate profiles and tracking",
                    bg: "bg-orange-100 text-orange-600",
                  },
                  {
                    icon: Award,
                    title: "Health Analytics",
                    desc:
                      "Track your progress with detailed reports and compliance analytics",
                    bg: "bg-red-100 text-red-600",
                  },
                  {
                    icon: Globe,
                    title: "Offline Support",
                    desc:
                      "Core features work offline, ensuring you never miss important reminders",
                    bg: "bg-teal-100 text-teal-600",
                  },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-3">
                    <div
                      className={`${item.bg} w-8 h-8 rounded-full flex items-center justify-center shrink-0`}
                    >
                      <item.icon className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="font-medium">{item.title}</h3>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Developer Team */}
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="flex justify-center items-center">
                <Code className="h-6 w-6 mr-2" />
                Development Team
              </CardTitle>
              <CardDescription>The passionate minds behind LifeSync</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center gap-8">
                {/* Founder */}
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">VL</span>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Dr. Vijayalaxmi Biradar
                  </h2>
                  <p className="text-blue-600 font-medium">Founder</p>
                </div>

                {/* Team Groups */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full px-4 md:px-20">
                  {/* UI/UX Designers */}
                  <div className="text-center">
                    <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-white">AS</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">
                      Koda Aayushi Rao
                    </h3>
                    <h5 className="text-xl font-bold text-gray-900"> &</h5>
                    <h3 className="text-xl font-bold text-gray-900">
                      Simpi Kumari
                    </h3>
                    <p className="text-blue-600 font-medium">UI/UX Designer</p>
                  </div>

                  {/* Frontend Developers */}
                  <div className="text-center">
                    <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-white">AC</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">
                      Md. Aiman Shafi
                    </h3>
                    <h3 className="text-xl font-bold text-gray-900"> &</h3>
                    <h3 className="text-xl font-bold text-gray-900">
                      Chilikuri Shivani
                    </h3>
                    <p className="text-blue-600 font-medium">Frontend Developer</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full px-4 md:px-20">
                  {/* Backend & DBA */}
                  <div className="text-center">
                    <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-white">VG</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Vedant Raj</h3>
                    <h3 className="text-xl font-bold text-gray-900"> &</h3>
                    <h3 className="text-xl font-bold text-gray-900">
                      Goon Shah
                    </h3>
                    <p className="text-blue-600 font-medium">Backend Developer</p>
                  </div>
                  <div className="text-center">
                    <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-white">PP</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">
                      Piyush Srivastava
                    </h3>
                    <h5 className="text-xl font-bold text-gray-900"> &</h5>
                    <h3 className="text-xl font-bold text-gray-900">
                      Priyanshu Singh
                    </h3>
                    <p className="text-blue-600 font-medium">DBA</p>
                  </div>
                </div>

                {/* Team Message */}
                <div className="text-center px-4 md:px-40">
                  <p className="text-sm text-gray-600 mt-4">
                    Passionate about using technology to solve real-world
                    healthcare challenges. Experienced in full-stack development,
                    AI integration, and healthcare technology.
                  </p>
                  <div className="flex justify-center flex-wrap space-x-2 mt-4">
                    <Badge variant="outline">React Native</Badge>
                    <Badge variant="outline">AI/ML</Badge>
                    <Badge variant="outline">Healthcare Tech</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mail className="h-6 w-6 mr-2" /> Get in Touch
              </CardTitle>
              <CardDescription>We’d love to hear from you</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">
                    Business Inquiries
                  </h4>
                  <p className="text-blue-600">lifesync2025@gmail.com</p>
                </div>
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Office Address</h4>
                  <p className="text-gray-600">
                    Kalinga University, Raipur<br />Kotni, Naya Raipur<br />Chhattisgarh, 492101<br />India
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Legal Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-6 w-6 mr-2" /> Legal & Privacy
              </CardTitle>
              <CardDescription>
                Your privacy and security are our top priorities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
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
                  <Link href="/data-security">
                    <Button variant="outline" className="w-full justify-start">
                      Data Security
                    </Button>
                  </Link>
                </div>
                <div className="space-y-3">
                  <Link href="/cookie-policy">
                    <Button variant="outline" className="w-full justify-start">
                      Cookie Policy
                    </Button>
                  </Link>
                  <Link href="/accessibility">
                    <Button variant="outline" className="w-full justify-start">
                      Accessibility Statement
                    </Button>
                  </Link>
                  <Link href="/compliance">
                    <Button variant="outline" className="w-full justify-start">
                      Healthcare Compliance
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Data Protection:</strong> LifeSync India is fully
                  compliant with Indian data protection laws and international
                  healthcare privacy standards. Your health information is
                  encrypted, stored securely, and never shared without your
                  explicit consent.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Stats & Roadmap and Call to Action */}
          {/* App Statistics */}
          <Card className="mb-8 bg-gradient-to-r from-blue-100 to-green-100 shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl font-bold text-blue-900">
                <Award className="h-7 w-7 mr-3 text-blue-600" /> App Statistics & Achievements
              </CardTitle>
              <CardDescription className="text-lg text-blue-700">Impact Highlights</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                <div className="rounded-xl bg-white shadow p-6 flex flex-col items-center border border-blue-200">
                  <div className="text-4xl font-extrabold text-blue-600 mb-2">100+</div>
                  <div className="text-base text-gray-700 font-medium">Growth Snapshot</div>
                  <div className="text-xs text-gray-400 mt-1">2x users in 6 months</div>
                </div>
                <div className="rounded-xl bg-white shadow p-6 flex flex-col items-center border border-green-200">
                  <div className="text-4xl font-extrabold text-green-600 mb-2">75%</div>
                  <div className="text-base text-gray-700 font-medium">Medicine Compliance</div>
                  <div className="text-xs text-gray-400 mt-1">Avg. daily adherence</div>
                </div>
                <div className="rounded-xl bg-white shadow p-6 flex flex-col items-center border border-purple-200">
                  <div className="text-4xl font-extrabold text-purple-600 mb-2">500+</div>
                  <div className="text-base text-gray-700 font-medium">HealTime</div>
                  <div className="text-xs text-gray-400 mt-1">Consultations done</div>
                </div>
                <div className="rounded-xl bg-white shadow p-6 flex flex-col items-center border border-orange-200">
                  <div className="text-4xl font-extrabold text-orange-600 mb-2">7 days</div>
                  <div className="text-base text-gray-700 font-medium">Streak</div>
                  <div className="text-xs text-gray-400 mt-1">Keep it up!</div>
                </div>
                <div className="rounded-xl bg-white shadow p-6 flex flex-col items-center border border-blue-200">
                  <div className="text-4xl font-extrabold text-blue-600 mb-2">{medicines.length === 0 ? "0" : medicines.length.toString()}</div>
                  <div className="text-base text-gray-700 font-medium">Medicine Reminders</div>
                  <div className="text-xs text-gray-400 mt-1">Active today</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Future Roadmap */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="h-6 w-6 mr-2" /> Future Roadmap
              </CardTitle>
              <CardDescription>What's coming next in LifeSync</CardDescription>
            </CardHeader>
            <CardContent>
              {[
                { quarter: "Q1. 2025", title: "Telemedicine Integration", description: "Video consultations with certified doctors directly in the app" },
                { quarter: "Q2. 2025", title: "IoT Device Integration", description: "Connect with smart pill dispensers and health monitoring devices" },
                { quarter: "Q3. 2025", title: "Advanced AI Diagnostics", description: "AI-powered preliminary health assessments and risk predictions" },
                { quarter: "Q4. 2026", title: "Multi-Language Support", description: "Support for Hindi, Bengali, Tamil, Telugu, and other regional languages" },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start space-x-3">
                  <Badge variant="secondary">{item.quarter}</Badge>
                  <div>
                    <h4 className="font-medium">{item.title}</h4>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Call to Action */}
          <Card className="bg-gradient-to-r from-green-600 to-blue-600 text-white text-center">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-4">
                Join the LifeSync Family
              </h2>
              <p className="text-lg mb-6">
                Be part of India's healthcare revolution. Download LifeSync today
                and take control of your health journey.
              </p>
              <div className="flex justify-center space-x-4">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-blue-600"
                >
                  Download on Play Store
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-blue-600"
                >
                  Download on App Store
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Medicine Reminder Demo Section */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Heart className="h-6 w-6 mr-2" /> Medicine Reminder Demo
              </CardTitle>
              <CardDescription>
                Add a medicine (one time daily) and get a reminder at the set time. Mark as taken after you take your medicine.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <input
                  type="text"
                  placeholder="Medicine Name"
                  value={newMedicine}
                  onChange={e => setNewMedicine(e.target.value)}
                  className="border px-2 py-1 rounded"
                />
                <input
                  type="time"
                  value={reminderTime}
                  onChange={e => setReminderTime(e.target.value)}
                  className="border px-2 py-1 rounded"
                />
                <Button onClick={handleAddMedicine} disabled={!newMedicine || !reminderTime}>
                  Add Medicine
                </Button>
              </div>
              <div className="mt-4">
                <p className="font-medium">Today's Reminders:</p>
                {medicines.length === 0 ? (
                  <p className="text-gray-500">No medicines added yet.</p>
                ) : (
                  <ul>
                    {medicines.map((med, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span>{med.name} at {med.time} - {taken ? <span className="text-green-600">Taken</span> : reminderDue ? <span className="text-red-600">Time to take!</span> : <span className="text-blue-600">Scheduled</span>}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {taken && (
                <div className="mt-2 text-green-700 font-semibold">You have taken your medicine.</div>
              )}
              <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Medicine Reminder</AlertDialogTitle>
                    <AlertDialogDescription>
                      This is your medicine time. Please take your medicine now.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogAction onClick={handleTakeMedicine}>Mark as Taken</AlertDialogAction>
                </AlertDialogContent>
              </AlertDialog>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="text-center py-8 border-t">
            <p className="text-gray-600">
              © 2025 LifeSync. All rights reserved. Made with ❤ for better
              healthcare in India.
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Version 1.0.0 | Last updated: July 2025 | Next.js, React, and AI
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function Stat({
  title,
  subtitle,
  color,
}: {
  title: string
  subtitle: string
  color: string
}) {
  return (
    <div className="text-center">
      <div className={`text-3xl font-bold ${color}`}>{title}</div>
      <p className="text-sm text-gray-600">{subtitle}</p>
    </div>
  )
}