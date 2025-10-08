import React from 'react'
import { cn } from '@/lib/utils'

type Props = {className?: string}

export default function TextLogo({className}: Props) {
  return (
    <p className={cn("text-skillmatch-light font-sansation text-3xl",className)}>SkillMatch</p>
  )
}