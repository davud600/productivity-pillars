import { Calendar } from '@/components/home/calendar'
import { DailyReport } from '@/components/home/daily-report'

export default async function Home() {
  return (
    <main className="flex flex-col items-center justify-start p-2 md:p-12 gap-24 mt-16">
      <section className="w-full max-w-2xl">
        <DailyReport />
      </section>

      <section className="flex flex-col gap-8 items-center w-full max-w-2xl">
        <h1 className="text-xl tracking-wide font-semibold text-neutral-200 text-center">
          Calendar reports
        </h1>
        <Calendar />
      </section>
    </main>
  )
}
