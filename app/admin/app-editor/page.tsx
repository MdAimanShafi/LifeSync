"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function AppEditorPage() {
  const router = useRouter()
  const [adminSession, setAdminSession] = useState<any>(null)
  const [appContent, setAppContent] = useState({
    appName: "lifeSync",
    tagline: "Smart Healthcare Made Simple",
    welcomeMessage: "Welcome back! Here's your health summary for today",
    contactPhone1: "+91 7543983040",
    contactPhone2: "+91 6205413147",
    contactEmail1: "support@lifesync.in",
    contactEmail2: "contact@lifesync.in",
    aboutText: "Empowering health with intelligent technology and compassionate care.",
    footerText: "© 2025 lifeSync. All rights reserved.",
  })
  const [savedContent, setSavedContent] = useState(appContent)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    // Check admin session
    const session = localStorage.getItem("adminSession")
    if (!session) {
      router.push("/admin/login")
    } else {
      setAdminSession(JSON.parse(session))
      // Load saved content from localStorage or API
      const saved = localStorage.getItem("appContent")
      if (saved) {
        setAppContent(JSON.parse(saved))
        setSavedContent(JSON.parse(saved))
      }
    }
  }, [router])

  const handleChange = (field: string, value: string) => {
    setAppContent((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSave = () => {
    setIsSaving(true)
    // Save content to localStorage or API
    localStorage.setItem("appContent", JSON.stringify(appContent))
    setSavedContent(appContent)
    setTimeout(() => {
      setIsSaving(false)
      alert("App content saved successfully.")
    }, 1000)
  }

  const handleReset = () => {
    setAppContent(savedContent)
  }

  if (!adminSession) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-2xl font-bold mb-6">App Editor - lifeSync</h1>
      <div className="max-w-3xl space-y-6">
        <div>
          <Label htmlFor="appName">App Name</Label>
          <Input
            id="appName"
            value={appContent.appName}
            onChange={(e) => handleChange("appName", e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="tagline">Tagline</Label>
          <Input
            id="tagline"
            value={appContent.tagline}
            onChange={(e) => handleChange("tagline", e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="welcomeMessage">Welcome Message</Label>
          <Textarea
            id="welcomeMessage"
            value={appContent.welcomeMessage}
            onChange={(e) => handleChange("welcomeMessage", e.target.value)}
            rows={3}
          />
        </div>
        <div>
          <Label htmlFor="contactPhone1">Contact Phone 1</Label>
          <Input
            id="contactPhone1"
            value={appContent.contactPhone1}
            onChange={(e) => handleChange("contactPhone1", e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="contactPhone2">Contact Phone 2</Label>
          <Input
            id="contactPhone2"
            value={appContent.contactPhone2}
            onChange={(e) => handleChange("contactPhone2", e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="contactEmail1">Contact Email 1</Label>
          <Input
            id="contactEmail1"
            value={appContent.contactEmail1}
            onChange={(e) => handleChange("contactEmail1", e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="contactEmail2">Contact Email 2</Label>
          <Input
            id="contactEmail2"
            value={appContent.contactEmail2}
            onChange={(e) => handleChange("contactEmail2", e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="aboutText">About Text</Label>
          <Textarea
            id="aboutText"
            value={appContent.aboutText}
            onChange={(e) => handleChange("aboutText", e.target.value)}
            rows={4}
          />
        </div>
        <div>
          <Label htmlFor="footerText">Footer Text</Label>
          <Textarea
            id="footerText"
            value={appContent.footerText}
            onChange={(e) => handleChange("footerText", e.target.value)}
            rows={2}
          />
        </div>
        <div className="flex space-x-4">
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
          <Button variant="outline" onClick={handleReset} disabled={isSaving}>
            Reset
          </Button>
        </div>
      </div>
    </div>
  )
}
