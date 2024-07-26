import { DailyReport } from '@/components/home/daily-report'

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-3 md:p-12 gap-24 mt-16">
      <section className="h-svh w-full max-w-2xl">
        <DailyReport />
      </section>

      {/* <section className="flex flex-col gap-8 items-center">
        <h1 className="text-xl tracking-wide font-semibold text-neutral-200 text-center">
          Calendar reports
        </h1>
      </section>

      <section className="flex flex-col gap-8 items-center h-svh">
        <h1 className="text-xl tracking-wide font-semibold text-neutral-200 text-center">
          Statistics
        </h1>
      </section> */}
    </main>
  )
}
