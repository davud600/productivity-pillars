'use client'

import { CardContent } from './card-content'
import { DailyReportTitle } from './title'

export function DailyReport() {
  return (
    <div className="flex flex-col gap-10 border-header-border border rounded-lg w-full items-center py-10 md:px-10 px-3 bg-[rgb(13,13,13)] shadow-xl">
      <DailyReportTitle />
      <CardContent />
    </div>
  )
}
