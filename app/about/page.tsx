"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, ArrowLeft, Mail, Globe, Shield, Users, Target, Award, Code, Smartphone } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
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
              <span className="text-xl font-bold text-gray-900">About LifeSync</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <Heart className="h-16 w-16 text-blue-600 mr-4" />
              <div>
                <h1 className="text-4xl font-bold text-gray-900">LifeSync</h1>
                <p className="text-xl text-blue-600 font-medium">Smart Healthcare Made Simple</p>
              </div>
            </div>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              Version 1.0.0 - January 2024
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
                To empower every individual in India with intelligent healthcare management tools that make medicine
                tracking effortless, health monitoring seamless, and healthcare accessible to all. We believe that
                technology should serve humanity, especially in healthcare where consistency and care can save lives.
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
              <CardDescription>Comprehensive healthcare management in your pocket</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Heart className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Smart Medicine Reminders</h3>
                      <p className="text-sm text-gray-600">
                        Never miss a dose with intelligent scheduling and personalized notifications
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Shield className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Bank-Level Security</h3>
                      <p className="text-sm text-gray-600">
                        Your health data is encrypted and protected with industry-standard security
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Code className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">AI-Powered Assistant</h3>
                      <p className="text-sm text-gray-600">
                        Get personalized health insights and emotional support from our caring AI companion
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Users className="h-4 w-4 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Family Care</h3>
                      <p className="text-sm text-gray-600">
                        Manage health for your entire family with separate profiles and tracking
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Award className="h-4 w-4 text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Health Analytics</h3>
                      <p className="text-sm text-gray-600">
                        Track your progress with detailed reports and compliance analytics
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Globe className="h-4 w-4 text-teal-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Offline Support</h3>
                      <p className="text-sm text-gray-600">
                        Core features work offline, ensuring you never miss important reminders
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Developer Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Code className="h-6 w-6 mr-2" />
                Development Team
              </CardTitle>
              <CardDescription>The passionate minds behind LifeSync</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">MA</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">MD Aiman Shafi</h3>
                  <p className="text-blue-600 font-medium">Lead Developer & Founder</p>
                  <p className="text-sm text-gray-600 mt-2">
                    Passionate about using technology to solve real-world healthcare challenges. Experienced in
                    full-stack development, AI integration, and healthcare technology.
                  </p>
                  <div className="flex justify-center space-x-2 mt-4">
                    <Badge variant="outline">React Native</Badge>
                    <Badge variant="outline">AI/ML</Badge>
                    <Badge variant="outline">Healthcare Tech</Badge>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">Technical Expertise</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Frontend Development</span>
                      <span className="text-sm font-medium">React, Next.js, React Native</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Backend Development</span>
                      <span className="text-sm font-medium">Node.js, PostgreSQL, MongoDB</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">AI Integration</span>
                      <span className="text-sm font-medium">OpenAI, TensorFlow, ML Models</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Cloud Services</span>
                      <span className="text-sm font-medium">AWS, Firebase</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mail className="h-6 w-6 mr-2" />
                Get in Touch
              </CardTitle>
              <CardDescription>We'd love to hear from you</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900">Support Email</h4>
                    <p className="text-blue-600">rajvedant26@gmail.com</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Business Inquiries</h4>
                    <p className="text-blue-600">lifesync2025@gmail.com</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Developer Contact</h4>
                    <p className="text-blue-600">mdaimanshafi492@gmail.com</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900"></h4>
                    <p className="text-red-600"></p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900">Office Address</h4>
                    <p className="text-gray-600">
                      Kalinga University, Raipur
                      <br />
                      Kotni, Naya Raipur
                      <br />
                      Raipur Chhattisgarh, 492101
                      <br />
                      India
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Website</h4>
                    <p className="text-blue-600">https://kalingauniversity.ac.in/</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Legal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-6 w-6 mr-2" />
                Legal & Privacy
              </CardTitle>
              <CardDescription>Your privacy and security are our top priorities</CardDescription>
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
                  <strong>Data Protection:</strong> LifeSync India is fully compliant with Indian data protection laws
                  and international healthcare privacy standards. Your health information is encrypted, stored securely,
                  and never shared without your explicit consent.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* App Statistics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="h-6 w-6 mr-2" />
                App Statistics & Achievements
              </CardTitle>
              <CardDescription>Impact Highilights</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">100+</div>
                  <p className="text-sm text-gray-600">Growth Snapshot</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">75%</div>
                  <p className="text-sm text-gray-600">Medicine Compliance Rate</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">500+</div>
                  <p className="text-sm text-gray-600">HealTime</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600">24/7</div>
                  <p className="text-sm text-gray-600">AI Support Available</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Future Roadmap */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="h-6 w-6 mr-2" />
                Future Roadmap
              </CardTitle>
              <CardDescription>What's coming next in LifeSy</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Badge variant="secondary">Q1. 2025</Badge>
                  <div>
                    <h4 className="font-medium">Telemedicine Integration</h4>
                    <p className="text-sm text-gray-600">
                      Video consultations with certified doctors directly in the app
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Badge variant="secondary">Q2. 2025</Badge>
                  <div>
                    <h4 className="font-medium">IoT Device Integration</h4>
                    <p className="text-sm text-gray-600">
                      Connect with smart pill dispensers and health monitoring devices
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Badge variant="secondary">Q3. 2025</Badge>
                  <div>
                    <h4 className="font-medium">Advanced AI Diagnostics</h4>
                    <p className="text-sm text-gray-600">
                      AI-powered preliminary health assessments and risk predictions
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Badge variant="secondary">Q4. 2026</Badge>
                  <div>
                    <h4 className="font-medium">Multi-Language Support</h4>
                    <p className="text-sm text-gray-600">
                      Support for Hindi, Bengali, Tamil, Telugu, and other regional languages
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Call to Action */}
          <Card className="bg-gradient-to-r from-green-600 to-blue-600 text-white text-center">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-4">Join the LifeSync Family</h2>
              <p className="text-lg mb-6">
                Be part of India's healthcare revolution. Download LifeSync today and take control of your health
                journey.
              </p>
              <div className="flex justify-center space-x-4">
                <Button variant="secondary" size="lg">
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

          {/* Footer */}
          <div className="text-center py-8 border-t">
            <p className="text-gray-600">
              © 2025 LifeSync. All rights reserved. Made with ❤️❤️ for better healthcare in India.
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Version 1.0.0 | Last updated: January 2025 | Next.js, React, and AI
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
