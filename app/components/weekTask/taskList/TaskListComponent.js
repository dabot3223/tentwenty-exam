import axios from 'axios'
import { useSession } from 'next-auth/react';
import React, { useEffect } from 'react'
import DateListCard from './DateListCard';

const TaskListComponent = ({ setHours, start, end, setIsLoading }) => {

    console.log(start, end)
    const { data: session } = useSession();
    const [taskData, setTaskData] = React.useState(null)

    const getHours = (times) => {
        const totalMinutes = times.reduce((sum, time) => {
            const [h, m] = time.split(":").map(Number);
            return sum + (h * 60 + m);
        }, 0);

        return Math.round(totalMinutes / 60);

    }

    const getTaskList = async () => {
        try {
            const { data } = await axios.post('/api/timesheet/getTasksData', { uid: session?.user?.id, start, end })
            
            setHours(getHours(data.data.map(v => v.time)))

            const grouped = data.data.reduce((acc, task) => {
                const date = task.date.split("T")[0]; 
                if (!acc[date]) acc[date] = [];
                acc[date].push(task);
                return acc;
            }, {});
            console.log(data.data, grouped)
            setTaskData(grouped)

            setIsLoading(false)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        if (session?.user?.id) {
            setIsLoading(true)
            getTaskList()
        }
    }, [session])
    return (
        <div className='flex flex-col gap-2' >
            {
                taskData && Object.keys(taskData).map((date,idx)=>{
                    return <DateListCard key={idx} taskList={taskData[date]} date={date} />
                })
            }
        </div>
    )
}

export default TaskListComponent
