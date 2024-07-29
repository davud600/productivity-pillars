import { type CheckedPillar } from '@/types/daily-reports'
import { type PillarData, PillarDifficultyEnum } from '@/types/pillars'
import { type CheckedState } from '@radix-ui/react-checkbox'
import { useEffect, useState } from 'react'
import { Checkbox } from '../../ui/checkbox'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../../ui/select'

interface DailyReportPillarProps {
  pillar: PillarData
  initiallyChecked: boolean
  initialLevel: PillarDifficultyEnum
  setCheckedPillars: React.Dispatch<React.SetStateAction<CheckedPillar[]>>
  day: string // yyyy-MM-dd
  updatingDailyReportsData: boolean
}

export function DailyReportPillar({
  pillar,
  initiallyChecked,
  initialLevel,
  setCheckedPillars,
  day,
  updatingDailyReportsData,
}: DailyReportPillarProps) {
  const [level, setLevel] = useState(initialLevel)
  const [checked, setChecked] = useState(initiallyChecked)

  useEffect(() => {
    setLevel(initialLevel)
  }, [initialLevel])

  useEffect(() => {
    setChecked(initiallyChecked)
  }, [initiallyChecked])

  useEffect(() => {
    if (updatingDailyReportsData) return
    setCheckedPillars((prevCheckedPillars) => {
      return checked
        ? [
            ...prevCheckedPillars.filter(
              (checkedPillar) => checkedPillar.pillar !== pillar.title
            ),
            {
              pillar: pillar.title,
              level,
            },
          ]
        : [
            ...prevCheckedPillars.filter(
              (checkedPillar) => checkedPillar.pillar !== pillar.title
            ),
          ]
    })
  }, [checked, level])

  const handlePillarCheck = (checked: CheckedState) => {
    if (updatingDailyReportsData) return

    if (checked === false || checked === 'indeterminate') {
      setChecked(false)
      return
    }

    setChecked(true)
  }

  const handleDifficultySelection = (value: string) => {
    const newLevel = parseInt(value)

    if (isNaN(newLevel)) return

    setLevel(newLevel)
  }

  return (
    <div className="w-full flex justify-between items-center">
      <div className="flex items-start md:space-x-6 space-x-2">
        <Checkbox
          onCheckedChange={handlePillarCheck}
          checked={checked}
          id={`${day}-${pillar.title.toLowerCase()}-daily-report`}
        />
        <label
          htmlFor={`${day}-${pillar.title.toLowerCase()}-daily-report`}
          className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-neutral-400"
        >
          {pillar.title}
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
                    <span className="text-sm text-neutral-400 text-left text-nowrap">
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
