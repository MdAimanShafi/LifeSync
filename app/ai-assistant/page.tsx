"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Bot, Send, ArrowLeft, Brain, Activity, Pill, AlertTriangle, Lightbulb, Heart, Mic, MicOff } from "lucide-react"
import Link from "next/link"

interface Message {
  id: number
  text: string
  sender: "user" | "ai"
  timestamp: Date
  type?: "suggestion" | "warning" | "info" | "emergency"
  emotion?: "happy" | "concerned" | "encouraging" | "urgent"
}

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [userName] = useState("John") // In real app, get from user context
  // const [userMoodCheck, setUserMoodCheck] = useState(false)

  // Initialize with personalized greeting
  useEffect(() => {
    const currentHour = new Date().getHours()
    let greeting = ""

    if (currentHour < 12) {
      greeting = `Good morning, ${userName}! 🌅 Ready to start your healthy day?`
    } else if (currentHour < 17) {
      greeting = `Good afternoon, ${userName}! ☀️ How's your day going?`
    } else {
      greeting = `Good evening, ${userName}! 🌙 Time to wind down and take your evening medicines.`
    }

    const initialMessage: Message = {
      id: 1,
      text: `${greeting} I'm your AI Health Companion. I can help you with medicine reminders, health tips, symptom checking, and I'm here to listen if you need support. What can I do for you today?`,
      sender: "ai",
      timestamp: new Date(),
      type: "info",
      emotion: "happy",
    }

    setMessages([initialMessage])

    // Weekly mood check
    const lastMoodCheck = localStorage.getItem("lastMoodCheck")
    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)

    if (!lastMoodCheck || new Date(lastMoodCheck) < oneWeekAgo) {
      setTimeout(() => {
        const moodMessage: Message = {
          id: Date.now(),
          text: "By the way, I like to check in with you weekly. How have you been feeling emotionally? Any stress, anxiety, or concerns I can help you with? 💙",
          sender: "ai",
          timestamp: new Date(),
          type: "suggestion",
          emotion: "concerned",
        }
        setMessages((prev) => [...prev, moodMessage])
        // setUserMoodCheck(true)
        localStorage.setItem("lastMoodCheck", new Date().toISOString())
      }, 3000)
    }
  }, [userName])

  const quickActions = [
    { text: "How am I doing with my medicines?", icon: Pill, category: "medicine" },
    { text: "I'm feeling unwell today", icon: AlertTriangle, category: "health" },
    { text: "Give me personalized health tips", icon: Lightbulb, category: "tips" },
    { text: "I feel stressed and anxious", icon: Heart, category: "mental" },
    { text: "What should I do for chest pain?", icon: AlertTriangle, category: "emergency" },
    { text: "Analyze my health patterns", icon: Activity, category: "analysis" },
  ]

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now(),
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsTyping(true)

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse = generateSmartAIResponse(inputMessage)
      setMessages((prev) => [...prev, aiResponse])
      setIsTyping(false)
    }, 1500)
  }

  const generateSmartAIResponse = (userInput: string): Message => {
    const input = userInput.toLowerCase()
    let response = ""
    let type: "suggestion" | "warning" | "info" | "emergency" = "info"
    let emotion: "happy" | "concerned" | "encouraging" | "urgent" = "happy"

    // Emergency detection
    if (
      input.includes("chest pain") ||
      input.includes("heart attack") ||
      input.includes("can't breathe") ||
      input.includes("emergency")
    ) {
      response = `🚨 EMERGENCY ALERT: If you're experiencing chest pain or breathing difficulties, please call emergency services immediately (911 or your local emergency number). Don't wait - this could be serious. I'm also notifying your emergency contacts. Your health is the priority! 🚨`
      type = "emergency"
      emotion = "urgent"

      // In real app, this would trigger emergency protocols
      setTimeout(() => {
        alert("Emergency protocols activated. Emergency contacts have been notified.")
      }, 1000)
    }
    // Medicine-related queries
    else if (
      input.includes("medicine") ||
      input.includes("pill") ||
      input.includes("dose") ||
      input.includes("doing with")
    ) {
      response = `Great question, ${userName}! 📊 Looking at your recent activity:\n\n✅ You've been 95% consistent with morning medicines\n⚠️ Evening medicines are sometimes delayed by 30-60 minutes\n🎯 Overall health score: 8.2/10\n\nI suggest setting your evening reminder 30 minutes earlier. Would you like me to adjust your schedule? You're doing amazing - keep it up! 💪`
      type = "suggestion"
      emotion = "encouraging"
    }
    // Mental health support
    else if (
      input.includes("stress") ||
      input.includes("anxious") ||
      input.includes("depressed") ||
      input.includes("sad") ||
      input.includes("worried")
    ) {
      response = `I hear you, ${userName}, and I want you to know that what you're feeling is valid. 💙 Let's try some immediate relief:\n\n🌬️ **Breathing Exercise**: Breathe in for 4 counts, hold for 4, exhale for 6. Repeat 5 times.\n\n🧘 **Grounding Technique**: Name 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, 1 you can taste.\n\nRemember: It's okay to not be okay sometimes. Would you like me to help you find a mental health professional in your area? I'm here for you. 🤗`
      type = "suggestion"
      emotion = "concerned"
    }
    // Feeling unwell
    else if (input.includes("unwell") || input.includes("sick") || input.includes("fever") || input.includes("pain")) {
      response = `I'm sorry you're not feeling well, ${userName}. 😟 Let me help you assess this:\n\n🌡️ **Immediate steps**:\n• Check your temperature\n• Stay hydrated\n• Rest when possible\n\n📝 **Please tell me**:\n• What specific symptoms are you experiencing?\n• When did they start?\n• On a scale of 1-10, how severe is the discomfort?\n\nBased on your symptoms, I can provide guidance, but remember - if symptoms worsen or you feel seriously unwell, please contact your doctor. Your health comes first! 💙`
      type = "warning"
      emotion = "concerned"
    }
    // Health tips request
    else if (
      input.includes("tip") ||
      input.includes("advice") ||
      input.includes("health") ||
      input.includes("personalized")
    ) {
      response = `Here are your personalized health tips for today, ${userName}! ✨\n\n💧 **Hydration**: You're at 60% of your daily water goal - try to drink 2 more glasses\n🚶 **Movement**: A 10-minute walk after your evening medicine can improve absorption\n😴 **Sleep**: Based on your pattern, try going to bed 30 minutes earlier tonight\n🥗 **Nutrition**: Include vitamin C-rich foods to boost your immune system\n🧘 **Mindfulness**: 5 minutes of deep breathing can reduce stress hormones\n\nWhich area would you like me to focus on more? I'm here to support your health journey! 🌟`
      type = "suggestion"
      emotion = "encouraging"
    }
    // Pattern analysis
    else if (
      input.includes("pattern") ||
      input.includes("analyze") ||
      input.includes("report") ||
      input.includes("how am i")
    ) {
      response = `Let me analyze your health patterns, ${userName}! 📈\n\n**This Week's Insights:**\n✅ Medicine compliance: 92% (Excellent!)\n📅 Best performance: Monday mornings\n⏰ Optimal reminder time: 8:00 AM and 6:30 PM\n💪 Health streak: 12 days\n\n**Recommendations:**\n🔄 Your body responds best to consistent timing\n📱 Weekend reminders could be 30 minutes later\n🎯 You're on track to reach your monthly health goals!\n\nYou're doing fantastic! Small consistent actions lead to big health improvements. Keep up the excellent work! 🌟`
      type = "info"
      emotion = "encouraging"
    }
    // Greetings and general conversation
    else if (
      input.includes("hello") ||
      input.includes("hi") ||
      input.includes("hey") ||
      input.includes("good morning") ||
      input.includes("good evening")
    ) {
      const responses = [
        `Hello there, ${userName}! 😊 I'm so glad you're here. How can I support your health journey today?`,
        `Hi ${userName}! 🌟 Ready to tackle another healthy day together? What's on your mind?`,
        `Hey ${userName}! 💙 I'm here and ready to help with anything health-related. What would you like to explore?`,
      ]
      response = responses[Math.floor(Math.random() * responses.length)]
      emotion = "happy"
    }
    // Default response
    else {
      response = `I understand you're asking about health-related topics, ${userName}. While I can provide general guidance and support, I want to remind you that I'm an AI assistant designed to complement - not replace - professional medical advice. 💙\n\nFor specific health concerns, always consult with your doctor or healthcare provider. That said, I'm here to help with:\n• Medicine reminders and tracking\n• General health tips\n• Emotional support\n• Symptom guidance\n• Health pattern analysis\n\nWhat would you like to explore together? I'm here for you! 🤗`
      type = "info"
      emotion = "concerned"
    }

    return {
      id: Date.now(),
      text: response,
      sender: "ai",
      timestamp: new Date(),
      type,
      emotion,
    }
  }

  const handleQuickAction = (action: string) => {
    setInputMessage(action)
    setTimeout(() => handleSendMessage(), 100)
  }

  const startVoiceRecognition = () => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition
      const recognition = new SpeechRecognition()

      recognition.continuous = false
      recognition.interimResults = false
      recognition.lang = "en-US"

      recognition.onstart = () => {
        setIsListening(true)
      }

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        setInputMessage(transcript)
        setIsListening(false)
      }

      recognition.onerror = () => {
        setIsListening(false)
        alert("Voice recognition error. Please try again.")
      }

      recognition.onend = () => {
        setIsListening(false)
      }

      recognition.start()
    } else {
      alert("Voice recognition is not supported in your browser.")
    }
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
              <Brain className="h-6 w-6 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">AI Health Companion</span>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Smart & Caring
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card className="h-[600px] flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bot className="h-5 w-5 mr-2" />
                Your Personal AI Health Companion
              </CardTitle>
              <CardDescription>Intelligent, caring, and always here to support your health journey 💙</CardDescription>
            </CardHeader>

            {/* Messages Area */}
            <CardContent className="flex-1 flex flex-col">
              <div className="flex-1 overflow-y-auto space-y-4 mb-4 p-4 bg-gray-50 rounded-lg">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] p-4 rounded-lg ${
                        message.sender === "user"
                          ? "bg-blue-600 text-white"
                          : message.type === "emergency"
                            ? "bg-red-100 text-red-900 border-2 border-red-300 animate-pulse"
                            : message.type === "warning"
                              ? "bg-orange-100 text-orange-800 border border-orange-200"
                              : message.type === "suggestion"
                                ? "bg-green-100 text-green-800 border border-green-200"
                                : "bg-white text-gray-800 border border-gray-200 shadow-sm"
                      }`}
                    >
                      {message.sender === "ai" && (
                        <div className="flex items-center mb-3">
                          <Bot className="h-4 w-4 mr-2" />
                          <span className="text-xs font-medium">AI Health Companion</span>
                          {message.type === "emergency" && <AlertTriangle className="h-4 w-4 ml-2 text-red-600" />}
                          {message.type === "warning" && <AlertTriangle className="h-3 w-3 ml-2" />}
                          {message.type === "suggestion" && <Lightbulb className="h-3 w-3 ml-2" />}
                          {message.emotion === "happy" && <span className="ml-2">😊</span>}
                          {message.emotion === "concerned" && <span className="ml-2">💙</span>}
                          {message.emotion === "encouraging" && <span className="ml-2">💪</span>}
                          {message.emotion === "urgent" && <span className="ml-2">🚨</span>}
                        </div>
                      )}
                      <div className="text-sm whitespace-pre-line">{message.text}</div>
                      <p className="text-xs opacity-70 mt-2">{message.timestamp.toLocaleTimeString()}</p>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white text-gray-800 border border-gray-200 p-4 rounded-lg shadow-sm">
                      <div className="flex items-center">
                        <Bot className="h-4 w-4 mr-2" />
                        <span className="text-xs font-medium">AI is thinking carefully about your message</span>
                        <div className="flex space-x-1 ml-3">
                          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Actions */}
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-3">Quick actions to get started:</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {quickActions.map((action, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickAction(action.text)}
                      className="text-xs h-auto p-2 text-left justify-start"
                    >
                      <action.icon className="h-3 w-3 mr-2 flex-shrink-0" />
                      <span className="truncate">{action.text}</span>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Input Area */}
              <div className="flex space-x-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask me anything about your health, medicines, or how you're feeling..."
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  disabled={isTyping}
                  className="flex-1"
                />
                <Button
                  onClick={startVoiceRecognition}
                  variant="outline"
                  size="sm"
                  disabled={isListening}
                  className={isListening ? "bg-red-100" : ""}
                >
                  {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </Button>
                <Button onClick={handleSendMessage} disabled={isTyping || !inputMessage.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>

              {isListening && (
                <Alert className="mt-2">
                  <Mic className="h-4 w-4" />
                  <AlertDescription>Listening... Speak clearly about your health question or concern.</AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          {/* AI Capabilities */}
          <div className="grid md:grid-cols-4 gap-4 mt-8">
            <Card className="text-center">
              <CardContent className="pt-4">
                <Heart className="h-8 w-8 text-red-500 mx-auto mb-2" />
                <h3 className="font-medium text-sm">Emotional Support</h3>
                <p className="text-xs text-gray-600 mt-1">Mental health check-ins and stress relief</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-4">
                <AlertTriangle className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                <h3 className="font-medium text-sm">Emergency Detection</h3>
                <p className="text-xs text-gray-600 mt-1">Recognizes urgent symptoms and alerts</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-4">
                <Brain className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                <h3 className="font-medium text-sm">Smart Analysis</h3>
                <p className="text-xs text-gray-600 mt-1">Patterns, trends, and personalized insights</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-4">
                <Mic className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                <h3 className="font-medium text-sm">Voice Interaction</h3>
                <p className="text-xs text-gray-600 mt-1">Speak naturally, get intelligent responses</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
