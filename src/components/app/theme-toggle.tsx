"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Sun, Moon } from 'lucide-react'

import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"

export function ThemeToggle() {
  const [mounted, setMounted] = React.useState(false)
  const { theme, setTheme } = useTheme()

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const handleThemeChange = (checked: boolean) => {
    setTheme(checked ? 'dark' : 'light')
  }

  if (!mounted) {
    return (
        <div className="flex items-center justify-between p-2 space-x-2">
            <Skeleton className="h-5 w-12" />
            <Skeleton className="h-6 w-11 rounded-full" />
        </div>
    )
  }

  return (
    <div className="flex items-center justify-between p-2">
        <div className="flex items-center gap-2">
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <Label htmlFor="theme-switch" className="text-sm">
                Theme
            </Label>
        </div>
      <Switch
        id="theme-switch"
        checked={theme === 'dark'}
        onCheckedChange={handleThemeChange}
      />
    </div>
  )
}
