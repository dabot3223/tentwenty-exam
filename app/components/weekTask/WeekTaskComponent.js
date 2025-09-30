'use client'
import { Card, Progress, Spin } from 'antd'
import moment from 'moment'
import { useSearchParams } from 'next/navigation'
import React from 'react'
import { Container } from 'react-bootstrap'
import TaskListComponent from './taskList/TaskListComponent'

const WeekTaskComponent = () => {
    const [hours, setHours] = React.useState(0)
    const searchParams = useSearchParams()
    const start = searchParams.get('start')
    const end = searchParams.get('end')
    const [isLoading, setIsLoading] = React.useState(false);
    return (
        <Container className='pl-0 md:pl-16 pr-0 md:pr-16' >
            <Spin spinning={isLoading}>
                <Card
                    title={
                        <div>
                            <div className='flex justify-center md:items-center flex-wrap md:flex-nowrap' >
                                <h2>This week's timesheet</h2>
                                <div className='ml-0 md:ml-auto flex flex-col items-center'>
                                    <span>{hours}/40 hrs</span>
                                    <Progress className='w-52' percent={hours * 100 / 40} />
                                </div>
                            </div>
                            <span className=' text-neutral-500 text-xs' >
                                {`${moment(start).format('DD')} - ${moment(end).format('DD')} of ${moment(start).format('MMMM')}, ${moment(start).format('YYYY')}`}
                            </span>
                        </div>
                    }
                >
                    <TaskListComponent setIsLoading={setIsLoading} setHours={setHours} start={moment(start).format("YYYY-MM-DD")} end={moment(end).format("YYYY-MM-DD")} />
                </Card>
            </Spin>
        </Container>
    )
}

export default WeekTaskComponent
