'use client'
import React, { useEffect } from 'react'
import TimesheetTable from './TimesheetTable'
import TimesheetFilters from './TimesheetFilters'
import { Card } from 'antd'
import axios from 'axios'
import { useSession } from 'next-auth/react'

const TimesheetComponent = () => {

    const [dates, setDates] = React.useState([]);
    const [status, setStatus] = React.useState(null);
    const [weeklyData, setWeeklyData] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const { data: session } = useSession();
    const getTimesheetData = async () => {
        try {
            const { data } = await axios.post('/api/timesheet/getWeeklydata', { uid: session?.user?.id, ...dates, status })
            // console.log(data)
            setWeeklyData(data.data)
            setIsLoading(false)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        if (session?.user?.id) {
            setIsLoading(true)
            getTimesheetData()
        }
    }, [status, dates, session])
    return (
        <Card title="Your Timesheets" >
            <TimesheetFilters setDates={setDates} setStatus={setStatus} />
            <TimesheetTable weeklyData={weeklyData} isLoading={isLoading} />
        </Card>
    )
}

export default TimesheetComponent
