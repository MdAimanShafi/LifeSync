"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [allowed, setAllowed] = useState(false)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    const session = localStorage.getItem("adminSession")

    if (session) {
      const data = JSON.parse(session)
      // ✅ Hardcoded check
      if (data.email === "mdaimanshafi492@gmail.com" && data.role === "admin") {
        setAllowed(true)
        setChecking(false)
        return
      }
    }

    router.push("/admin/login")
  }, [router])

  if (checking) {
    return (
      <div className="h-screen flex items-center justify-center text-lg text-gray-600">
        Checking admin access...
      </div>
    )
  }

  return <>{allowed && children}</>
}
