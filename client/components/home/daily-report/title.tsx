import { Calendar } from 'lucide-react'

export function DailyReportTitle() {
  return (
    <div className="w-full flex items-center justify-center gap-4">
      <Calendar className="md:w-8 md:h-8 w-6 h-6" />
      <h1 className="linear-wipe animate-scroll-text font-normal text-lg md:font-[500] md:text-2xl text-center tracking-wide !leading-[1.25] md:!leading-[4rem]">
        Daily report {new Date().toISOString().split('T')[0]}
      </h1>
    </div>
  )
}
