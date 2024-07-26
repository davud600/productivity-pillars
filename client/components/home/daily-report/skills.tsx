import { useDailyReport } from '@/hooks/daily-report'
import { SkillEnum } from '@/types/skills'
import { DailyReportSkill } from './skill'

export function DailyReportSkills() {
  const { skillPoints } = useDailyReport()

  return (
    <div className="flex items-center justify-between w-full">
      {Object.keys(SkillEnum).map((skill) => (
        <DailyReportSkill
          key={skill}
          skill={skill as SkillEnum}
          points={
            skillPoints.find((skillPoint) => skillPoint.skill === skill)!.points
          }
        />
      ))}
    </div>
  )
}
