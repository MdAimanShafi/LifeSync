import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Shield, Clock, Users, Smartphone, Activity } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900"></span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">
              Features
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-blue-600 transition-colors">
              About
            </Link>
            <Link href="/help" className="text-gray-600 hover:text-blue-600 transition-colors">
              Help
            </Link>
            <Link href="/auth/login" className="text-gray-600 hover:text-blue-600 transition-colors">
              Login
            </Link>
            <Link href="/auth/register">
              <Button>Get Started</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Smart Healthcare
              <span className="text-blue-600 block">Made Simple</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Empowering health with intelligent medicine reminders, secure medical records, and comprehensive
              healthcare management for patients and providers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/register">
                <Button size="lg" className="w-full sm:w-auto">
                  Start Your Health Journey
                </Button>
              </Link>
              <Link href="/admin/login">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Admin Access
                </Button>
              </Link>
              <Link href="/admin/signup">
                
                  
                
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Comprehensive Healthcare Features</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to manage your health effectively, all in one secure platform
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Clock className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>Smart Medicine Reminders</CardTitle>
                <CardDescription>Never miss a dose with intelligent scheduling and customizable alarms</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Custom dosage schedules</li>
                  <li>• Background notifications</li>
                  <li>• Missed dose tracking</li>
                  <li>• Multiple medicine support</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Shield className="h-12 w-12 text-green-600 mb-4" />
                <CardTitle>Secure Authentication</CardTitle>
                <CardDescription>Bank-level security with encrypted data and secure access controls</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• JWT-based sessions</li>
                  <li>• Password encryption</li>
                  <li>• OTP verification</li>
                  <li>• Forgot password recovery</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="h-12 w-12 text-purple-600 mb-4" />
                <CardTitle>Admin Dashboard</CardTitle>
                <CardDescription>Comprehensive management tools for healthcare administrators</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Complete user management</li>
                  <li>• Real-time data tracking</li>
                  <li>• System activity logs</li>
                  <li>• Data export tools</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Smartphone className="h-12 w-12 text-orange-600 mb-4" />
                <CardTitle>Mobile Responsive</CardTitle>
                <CardDescription>Access your health data anywhere, anytime on any device</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Cross-platform compatibility</li>
                  <li>• Offline functionality</li>
                  <li>• Touch-friendly interface</li>
                  <li>• Fast loading times</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Activity className="h-12 w-12 text-red-600 mb-4" />
                <CardTitle>Health Tracking</CardTitle>
                <CardDescription>Monitor your health progress with detailed analytics and reports</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Medicine compliance tracking</li>
                  <li>• Health trend analysis</li>
                  <li>• Progress reports</li>
                  <li>• Goal setting</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Heart className="h-12 w-12 text-pink-600 mb-4" />
                <CardTitle>Admin Control</CardTitle>
                <CardDescription>Complete system control with user data tracking and management</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• One-time admin setup</li>
                  <li>• Complete user data access</li>
                  <li>• Login activity tracking</li>
                  <li>• System security logs</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Healthcare Experience?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of users who trust MadeCare India for their healthcare management needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                Create Account

              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Heart className="h-6 w-6 text-blue-400" />
                <span className="text-xl font-bold">MadeCare India</span>
              </div>
              <p className="text-gray-400">Empowering health with intelligent technology and compassionate care.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Features</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Medicine Reminders</li>
                <li>Health Tracking</li>
                <li>Admin Dashboard</li>
                <li>Secure Authentication</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Admin</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/admin/signup">Admin Setup</Link>
                </li>
                <li>
                  <Link href="/admin/login">Admin Login</Link>
                </li>
                <li>System Monitoring</li>
                <li>Data Management</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 LifeSync. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
