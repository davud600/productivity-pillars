import { DailyReportPillars } from '@/components/home/daily-report-pillars'
import { DailyReportSkills } from '@/components/home/daily-report-skills'
import { DailyReportTitle } from '@/components/home/daily-report-title'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-3 md:p-24">
      <article className="flex flex-col gap-12 border border-neutral-200 rounded-lg max-w-2xl w-full items-center py-16 md:px-10 px-4">
        <DailyReportTitle />
        <section className="flex flex-col gap-5 items-start w-full">
          <DailyReportPillars />
        </section>
        <section className="flex items-center justify-between w-full">
          <DailyReportSkills />
        </section>
      </article>
    </main>
  )
}
