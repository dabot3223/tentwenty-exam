import { Button, Card } from 'antd'
import moment from 'moment'
import React from 'react'
import TaskListCard from './TaskListCard'
import { PlusOutlined } from '@ant-design/icons';

const DateListCard = ({ taskList, date,setNewTaskMod }) => {
    const createNewModel = ()=>{
        setNewTaskMod(true)
    }
    return (
        <div className='flex w-full ' >
            <span className='w-16' >{moment(date).format("MMM DD")}</span>
            <div className='w-full flex flex-col gap-1' >
                {
                    taskList.map((task, id) => {
                        return <TaskListCard key={id} task={task} />
                    })
                }
                <Button onClick={createNewModel} className='items-center' type='dashed'><PlusOutlined /> Add new task</Button>
            </div>
        </div>
    )
}

export default DateListCard
