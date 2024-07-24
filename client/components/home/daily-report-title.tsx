'use client'

interface DailyReportTitleProps {}

export function DailyReportTitle({}: DailyReportTitleProps) {
  return (
    <h1 className="text-xl tracking-wider font-semibold text-neutral-200">
      Daily report - {new Date().toISOString().split('T')[0]}
    </h1>
  )
}
