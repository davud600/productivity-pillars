import { DailyReportPillars } from '@/components/home/daily-report-pillars'
import { DailyReportSkills } from '@/components/home/daily-report-skills'
import { DailyReportTitle } from '@/components/home/daily-report-title'

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-3 md:p-12 gap-24">
      <section className="flex flex-col gap-10 border border-neutral-200 rounded-lg max-w-2xl w-full items-center py-10 md:px-10 px-4 bg-neutral-950">
        <DailyReportTitle />
        <div className="flex flex-col gap-5 items-start w-full">
          <DailyReportPillars />
        </div>
        <div className="flex items-center justify-between w-full">
          <DailyReportSkills />
        </div>
      </section>

      <section className="flex flex-col gap-8 items-center">
        <h1 className="text-xl tracking-wide font-semibold text-neutral-200 text-center">
          Calendar reports
        </h1>
      </section>
    </main>
  )
}
