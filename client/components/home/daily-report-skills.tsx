import { SkillEnum } from '@/types/skills'
import { DailyReportSkill } from './daily-report-skill'

export function DailyReportSkills() {
  return (
    <>
      {Object.keys(SkillEnum).map((skill) => (
        <DailyReportSkill key={skill} skill={skill as SkillEnum} />
      ))}
    </>
  )
}
