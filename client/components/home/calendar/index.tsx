'use client'

import React, { useState, useEffect } from 'react'
import { format, startOfMonth, endOfMonth, addDays, getDay } from 'date-fns'
import { range } from 'lodash'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { type DailyReport } from '@/types/daily-reports'
import { DailyReportsService } from '@/services/daily-reports.service'
import { useAuth } from '@/hooks/auth'
import { useDailyReports } from '@/hooks/daily-reports'
import { Icons } from '@/components/icons'
import { DailyReportModal } from './daily-report-modal'
import { INITIAL_SKILL_POINTS } from '@/constants/pillars'

interface PillarProps {
  percentage: number
  color: string
}

export function Pillar({ percentage, color }: PillarProps) {
  return (
    <div
      className={`w-2 ${color} bg-opacity-70 mt-auto`}
      style={{ height: `${percentage}%` }}
    ></div>
  )
}

export function Calendar() {
  const { fetchedDailyReportsData } = useDailyReports()
  const [dailyReports, setDailyReports] = useState<DailyReport[]>([])
  const currentDate = new Date()
  const [selectedMonth, setSelectedMonth] = useState<number>(
    currentDate.getMonth()
  )
  const [selectedYear, setSelectedYear] = useState<number>(
    currentDate.getFullYear()
  )
  const [days, setDays] = useState<Date[]>([])
  const { token } = useAuth()

  useEffect(() => {
    if (!!!token) return

    const fetchDailyReports = async () => {
      const data = await DailyReportsService.all(token)
      setDailyReports(data)
    }

    fetchDailyReports()
  }, [token])

  useEffect(() => {
    const start = startOfMonth(new Date(selectedYear, selectedMonth))
    const end = endOfMonth(start)
    const dateArray: Date[] = []
    let date = start
    while (date <= end) {
      dateArray.push(new Date(date))
      date = addDays(date, 1)
    }
    setDays(dateArray)
  }, [selectedMonth, selectedYear])

  const handleMonthChange = (value: string) => {
    setSelectedMonth(Number(value))
  }

  const handleYearChange = (value: string) => {
    setSelectedYear(Number(value))
  }

  const renderDays = () => {
    const daysArray: JSX.Element[] = []
    const firstDayOfMonth =
      (getDay(startOfMonth(new Date(selectedYear, selectedMonth))) + 6) % 7

    // Fill in the empty slots for days before the first of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      daysArray.push(
        <div
          key={`empty-${i}`}
          className="text-center border-0 border-header-border p-2 flex flex-col items-center bg-[rgb(13,13,13)]"
        />
      )
    }

    // Fill in the days of the month
    days.forEach((day, index) => {
      const dailyReportData = dailyReports.find(
        (dailyReport) => dailyReport.day === format(day, 'yyyy-MM-dd')
      )

      daysArray.push(
        <DailyReportModal
          key={index}
          dailyReportData={
            dailyReportData || {
              skillPoints: INITIAL_SKILL_POINTS,
              checkedPillars: [],
              day: format(day, 'yyyy-MM-dd'),
            }
          }
        />
      )
    })

    // Fill in the empty slots for days after the last day of the month
    while (daysArray.length % 7 !== 0) {
      daysArray.push(
        <div
          key={`empty-${daysArray.length}`}
          className="text-center border-0 border-header-border p-2 flex flex-col items-center bg-[rgb(13,13,13)]"
        />
      )
    }

    return daysArray
  }

  return (
    <div className="text-white p-4 border-header-border border rounded-lg bg-[rgb(13,13,13)] shadow-xl w-full">
      <div className="flex justify-between mb-4 w-full">
        <Select
          value={selectedMonth.toString()}
          onValueChange={handleMonthChange}
        >
          <SelectTrigger className="w-fit h-fit">
            <SelectValue placeholder="Select Month" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Select Month</SelectLabel>
              {range(0, 12).map((month) => (
                <SelectItem key={month} value={month.toString()}>
                  {format(new Date(2024, month), 'MMMM')}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select
          value={selectedYear.toString()}
          onValueChange={handleYearChange}
        >
          <SelectTrigger className="w-fit h-fit">
            <SelectValue placeholder="Select Year" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Select Year</SelectLabel>
              {range(2024, 2026).map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      {fetchedDailyReportsData ? (
        <div className="grid grid-cols-7 gap-[1px] bg-header-border w-full">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
            <div
              key={day}
              className="text-center bg-[rgb(13,13,13)] text-neutral-400"
            >
              {day}
            </div>
          ))}
          {renderDays()}
        </div>
      ) : (
        <div className="w-full h-full flex justify-center items-center">
          <Icons.spinner className="mr-2 md:h-10 h-8 md:w-10 w-8 animate-spin" />
        </div>
      )}
    </div>
  )
}
