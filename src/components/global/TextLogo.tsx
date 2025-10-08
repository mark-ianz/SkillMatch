import React from 'react'
import { twMerge } from 'tailwind-merge'

type Props = {className?: string}

export default function TextLogo({className}: Props) {
  return (
    <p className={twMerge("text-skillmatch-light font-sansation text-3xl",className)}>SkillMatch</p>
  )
}