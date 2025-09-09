"use client";

import { cn } from "@/lib/utils"

interface AppLogoProps extends React.SVGProps<SVGSVGElement> {}

export default function AppLogo({ className, ...props }: AppLogoProps) {
  return (
    <div className="flex items-center gap-2">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 40 40"
      className={cn("h-8 w-8 text-primary", className)}
      {...props}
    >
      <g>
        <path
          fill="currentColor"
          d="M20,0C8.95,0,0,8.95,0,20s8.95,20,20,20s20-8.95,20-20S31.05,0,20,0z M20,36c-8.82,0-16-7.18-16-16S11.18,4,20,4 s16,7.18,16,16S28.82,36,20,36z"
        />
        <path
          fill="currentColor"
          d="M28.28,14.28l-8.48,8.48l-4.24-4.24c-0.78-0.78-2.05-0.78-2.83,0s-0.78,2.05,0,2.83l5.66,5.66 c0.39,0.39,0.9,0.58,1.41,0.58s1.02-0.19,1.41-0.58l10-10c0.78-0.78,0.78-2.05,0-2.83S29.06,13.5,28.28,14.28z"
        />
      </g>
    </svg>
    <span className="text-xl font-bold text-foreground">CLEAR TRUTH</span>
    </div>
  )
}
