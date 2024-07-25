'use client'

import {
  usePillar,
  usePillars,
  useSkillPoints,
} from '@/hooks/pillars-and-skills'
import { PillarsEnum } from '@/types/pillars'
import { SkillDifficultyEnum } from '@/types/skills'
import { type CheckedState } from '@radix-ui/react-checkbox'
import { useEffect, useState } from 'react'
import { Checkbox } from '../ui/checkbox'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../ui/select'

interface DailyReportPillarProps {
  pillarTitle: PillarsEnum
  initiallyChecked?: boolean
  initialLevel?: SkillDifficultyEnum
}

export function DailyReportPillar({
  pillarTitle,
  initiallyChecked = false,
  initialLevel = SkillDifficultyEnum.Easy,
}: DailyReportPillarProps) {
  const { addPointsOfSkill } = useSkillPoints()
  const { checkedPillars, setCheckedPillars } = usePillars()
  const pillar = usePillar(pillarTitle)
  const [level, setLevel] = useState<SkillDifficultyEnum>(initialLevel)
  const [checked, setChecked] = useState(initiallyChecked)

  useEffect(() => {
    setCheckedPillars((prevCheckedPillars) => {
      return checked
        ? [
            ...prevCheckedPillars.filter(
              (checkedPillar) => checkedPillar.pillar !== pillarTitle
            ),
            {
              pillar: pillarTitle,
              level,
            },
          ]
        : [
            ...prevCheckedPillars.filter(
              (checkedPillar) => checkedPillar.pillar !== pillarTitle
            ),
          ]
    })
  }, [checked, level])

  if (!!!pillar)
    return (
      <span className="text-lg text-red-500 font-medium">Missing pillar</span>
    )

  const handlePillarCheck = (checked: CheckedState) => {
    if (checked === false || checked === 'indeterminate') {
      pillar.skillPoints.forEach((skillPoint) => {
        addPointsOfSkill(skillPoint.skill, -(skillPoint.points + level))
      })
      setChecked(false)
      return
    }

    pillar.skillPoints.forEach((skillPoint) => {
      addPointsOfSkill(skillPoint.skill, skillPoint.points + level)
    })
    setChecked(true)
  }

  const handleDifficultySelection = (value: string) => {
    const newLevel = parseInt(value)

    if (isNaN(newLevel)) return

    if (checked) {
      pillar.skillPoints.forEach((skillPoint) => {
        addPointsOfSkill(skillPoint.skill, newLevel - level)
      })
    }
    setLevel(newLevel)
  }

  return (
    <div className="w-full flex justify-between items-center">
      <div className="flex items-start md:space-x-6 space-x-2">
        <Checkbox
          onCheckedChange={handlePillarCheck}
          id={`${pillarTitle.toLowerCase()}-daily-report`}
        />
        <label
          htmlFor={`${pillarTitle.toLowerCase()}-daily-report`}
          className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-neutral-400"
        >
          {pillarTitle}
        </label>
      </div>
      <div>
        <Select
          onValueChange={handleDifficultySelection}
          value={level.toString()}
        >
          <SelectTrigger className="w-[180px] h-fit">
            <SelectValue placeholder="Difficulty" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Level</SelectLabel>
              {pillar.levels.map((level) => (
                <SelectItem
                  key={level.title}
                  value={level.difficulty.toString()}
                >
                  <div className="flex flex-col items-start gap-2">
                    <span className="text-base">{level.title}</span>
                    <span className="text-sm text-neutral-400 text-left">
                      {level.description}
                    </span>
                  </div>
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
