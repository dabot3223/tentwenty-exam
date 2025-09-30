
import { Button, Table, Tag } from 'antd'
import moment from 'moment'
import { useRouter } from 'next/navigation'
import React from 'react'

const TimesheetTable = ({ weeklyData, isLoading }) => {
    const router = useRouter()

    const goToWeekPage = (start,end) => {
        router.push(`/weekTask?start=${start}&end=${end}`)
    }

    const columns = [
        {
            title: 'Week#',
            dataIndex: 'week',
            key: 'week',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            render: (_, { week_start, week_end }) => (
                <span>
                    {`${moment(week_start).format('DD')} - ${moment(week_end).format('DD')} of ${moment(week_start).format('MMMM')}, ${moment(week_start).format('YYYY')}`}
                </span>
            )
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (text, record) => (
                <Tag
                    color={text == 0 ? "yellow" : text == 1 ? "green" : "red"}
                >
                    {text == 0 ? "INCOMPLETE" : text == 1 ? "COMPLETE" : "MISSING"}
                </Tag>
            )
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (text, { week_start, week_end, status }) => (

                <Button type='link' onClick={() => goToWeekPage(week_start, week_end)} >
                    {
                        status == 0 ? "Update"
                            : status == 1 ? "View"
                                : "Create"
                    }
                </Button>
            )

        },
    ]

    return (
        <div>
            <Table
                loading={isLoading}
                scroll={{
                    x: 'max-content'
                }}
                pagination={{ pageSize: 5 }}
                columns={columns}
                dataSource={weeklyData || []}
                rowKey="week"
            />
        </div>
    )
}

export default TimesheetTable
