"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Heart,
  HelpCircle,
  MessageCircle,
  Phone,
  Mail,
  ArrowLeft,
  Search,
  Book,
  Bug,
  Star,
  Send,
  ExternalLink,
  CheckCircle,
} from "lucide-react"
import Link from "next/link"

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [feedbackForm, setFeedbackForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    rating: 0,
  })
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false)

  const faqs = [
    {
      question: "How do I add a new medicine reminder?",
      answer:
        "Go to your dashboard and click the 'Add Medicine' button. Fill in the medicine name, dosage, and set your reminder times. The app will automatically notify you when it's time to take your medicine.",
    },
    {
      question: "Can I set multiple reminder times for one medicine?",
      answer:
        "Yes! When adding a medicine, you can add multiple reminder times. For example, if you need to take a medicine 3 times a day, you can set reminders for 8 AM, 2 PM, and 8 PM.",
    },
    {
      question: "What if I miss a medicine dose?",
      answer:
        "If you miss a dose, the app will show it as 'missed' in your history. You can still mark it as taken if you take it later, or skip it if advised by your doctor. The app tracks your compliance rate to help you stay on track.",
    },
    {
      question: "How do I change my notification settings?",
      answer:
        "Go to Settings > Notifications. You can enable or disable medicine reminders, health tips, and other notifications according to your preference.",
    },
    {
      question: "Is my health data secure?",
      answer:
        "Yes, we take your privacy seriously. All your health data is encrypted and stored securely. We never share your personal health information with third parties without your explicit consent.",
    },
    {
      question: "Can I export my medicine history?",
      answer:
        "Yes, you can export your medicine history from the Reports section. This is useful for sharing with your doctor or for your own records.",
    },
    {
      question: "How do I delete my account?",
      answer:
        "Go to Settings > Privacy & Security > Delete Account. Please note that this action is irreversible and will permanently delete all your data.",
    },
    {
      question: "Does the app work offline?",
      answer:
        "Yes, basic features like viewing your medicine schedule and marking medicines as taken work offline. However, you'll need an internet connection for syncing data and receiving updates.",
    },
  ]

  const filteredFAQs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Save feedback for admin
    const feedback = {
      id: Date.now(),
      ...feedbackForm,
      timestamp: new Date().toISOString(),
      status: "unread",
    }

    // Store feedback in localStorage for admin
    const existingFeedback = JSON.parse(localStorage.getItem("userFeedback") || "[]")
    existingFeedback.push(feedback)
    localStorage.setItem("userFeedback", JSON.stringify(existingFeedback))

    // Create system log for admin
    const systemLog = {
      id: Date.now(),
      type: "user_feedback",
      message: `New feedback received: ${feedbackForm.subject}`,
      timestamp: new Date().toISOString(),
      severity: "info",
      details: feedback,
    }

    const existingLogs = JSON.parse(localStorage.getItem("systemLogs") || "[]")
    existingLogs.push(systemLog)
    localStorage.setItem("systemLogs", JSON.stringify(existingLogs))

    // Update admin data
    const adminData = JSON.parse(localStorage.getItem("adminData") || "{}")
    if (!adminData.feedback) adminData.feedback = []
    adminData.feedback.push(feedback)
    localStorage.setItem("adminData", JSON.stringify(adminData))

    setFeedbackSubmitted(true)

    setTimeout(() => {
      setFeedbackForm({
        name: "",
        email: "",
        subject: "",
        message: "",
        rating: 0,
      })
      setFeedbackSubmitted(false)
    }, 5000)
  }

  const StarRating = ({ rating, onRatingChange }: { rating: number; onRatingChange: (rating: number) => void }) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onRatingChange(star)}
            className={`${star <= rating ? "text-yellow-400" : "text-gray-300"} hover:text-yellow-400 transition-colors`}
          >
            <Star className="h-5 w-5 fill-current" />
          </button>
        ))}
      </div>
    )
  }

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
              <span className="text-xl font-bold text-gray-900">Help & Support</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Quick Actions */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="text-center">
                <MessageCircle className="h-12 w-12 text-blue-600 mx-auto mb-2" />
                <CardTitle>Live Chat</CardTitle>
                <CardDescription>Chat with our support team</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">Start Chat</Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <Phone className="h-12 w-12 text-green-600 mx-auto mb-2" />
                <CardTitle>Call Support</CardTitle>
                <CardDescription>Speak directly with our team</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full">
                    <Phone className="h-4 w-4 mr-2" />
                    +91 9942852002
                  </Button>
                  <p className="text-xs text-center text-gray-500">MD Aiman Shafi</p>                  
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <Mail className="h-12 w-12 text-purple-600 mx-auto mb-2" />
                <CardTitle>Email Support</CardTitle>
                <CardDescription>Send us your questions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full">
                    <Mail className="h-4 w-4 mr-2" />
                    mdaimanshafi492@gmail.com
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Mail className="h-4 w-4 mr-2" />
                    lifesync2025@gmail.com
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* FAQ Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <HelpCircle className="h-6 w-6 mr-2" />
                Frequently Asked Questions
              </CardTitle>
              <CardDescription>Find quick answers to common questions</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Search */}
              <div className="relative mb-6">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search FAQs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* FAQ Accordion */}
              <Accordion type="single" collapsible className="w-full">
                {filteredFAQs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-gray-600">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              {filteredFAQs.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No FAQs found matching your search. Try different keywords or contact support.
                </div>
              )}
            </CardContent>
          </Card>

          {/* User Guide */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Book className="h-6 w-6 mr-2" />
                User Guide
              </CardTitle>
              <CardDescription>Step-by-step instructions for using MadeCare India</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h3 className="font-medium">Getting Started</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Creating your account</li>
                    <li>• Setting up your profile</li>
                    <li>• Adding your first medicine</li>
                    <li>• Understanding the dashboard</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h3 className="font-medium">Advanced Features</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Managing multiple medicines</li>
                    <li>• Viewing health reports</li>
                    <li>• Customizing notifications</li>
                    <li>• Exporting your data</li>
                  </ul>
                </div>
              </div>
              <Button variant="outline" className="mt-4">
                <ExternalLink className="h-4 w-4 mr-2" />
                View Complete Guide
              </Button>
            </CardContent>
          </Card>

          {/* Report a Problem */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bug className="h-6 w-6 mr-2" />
                Report a Problem
              </CardTitle>
              <CardDescription>Found a bug or issue? Let us know so we can fix it</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={handleFeedbackSubmit}>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="issue-type">Issue Type</Label>
                    <select className="w-full p-2 border rounded-md">
                      <option>Select issue type</option>
                      <option>App crashes</option>
                      <option>Notifications not working</option>
                      <option>Data not syncing</option>
                      <option>Login problems</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority</Label>
                    <select className="w-full p-2 border rounded-md">
                      <option>Low</option>
                      <option>Medium</option>
                      <option>High</option>
                      <option>Critical</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Describe the problem</Label>
                  <Textarea
                    id="description"
                    placeholder="Please provide as much detail as possible..."
                    rows={4}
                    value={feedbackForm.message}
                    onChange={(e) =>
                      setFeedbackForm({ ...feedbackForm, message: e.target.value, subject: "Bug Report" })
                    }
                  />
                </div>
                <Button type="submit">
                  <Bug className="h-4 w-4 mr-2" />
                  Submit Report
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Feedback Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Star className="h-6 w-6 mr-2" />
                Send Feedback
              </CardTitle>
              <CardDescription>Help us improve MadeCare India with your suggestions</CardDescription>
            </CardHeader>
            <CardContent>
              {feedbackSubmitted ? (
                <Alert className="bg-green-50 border-green-200">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-700">
                    Thank you for your feedback! It has been sent directly to our admin team.
                  </AlertDescription>
                </Alert>
              ) : (
                <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="feedback-name">Name</Label>
                      <Input
                        id="feedback-name"
                        value={feedbackForm.name}
                        onChange={(e) => setFeedbackForm({ ...feedbackForm, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="feedback-email">Email</Label>
                      <Input
                        id="feedback-email"
                        type="email"
                        value={feedbackForm.email}
                        onChange={(e) => setFeedbackForm({ ...feedbackForm, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Rate your experience</Label>
                    <StarRating
                      rating={feedbackForm.rating}
                      onRatingChange={(rating) => setFeedbackForm({ ...feedbackForm, rating })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="feedback-subject">Subject</Label>
                    <Input
                      id="feedback-subject"
                      value={feedbackForm.subject}
                      onChange={(e) => setFeedbackForm({ ...feedbackForm, subject: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="feedback-message">Your feedback</Label>
                    <Textarea
                      id="feedback-message"
                      placeholder="Tell us what you think..."
                      value={feedbackForm.message}
                      onChange={(e) => setFeedbackForm({ ...feedbackForm, message: e.target.value })}
                      rows={4}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    <Send className="h-4 w-4 mr-2" />
                    Send Feedback to Admin
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
