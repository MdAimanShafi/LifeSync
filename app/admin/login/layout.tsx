"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    // ✅ Hardcoded admin session check
    const adminSession = JSON.parse(localStorage.getItem("adminSession") || "null")
    if (
      adminSession &&
      adminSession.email === "mdaimanshafi492@gmail.com" && 
      adminSession.role === "admin"
    ) {
      setIsAdmin(true)
    } else {
      router.push("/admin/login")
    }
  }, [])

  if (!isAdmin) {
    return null 
  }

  return <>{children}</>
}
