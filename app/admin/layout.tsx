"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function AdminSignupPage() {
  const router = useRouter()

  useEffect(() => {
    // REMOVE the admin setup/signup page, redirect to login always
    router.replace("/admin/login")
  }, [])

  return null
}
