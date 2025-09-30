import { Dropdown, Space, Tag } from 'antd'
import React from 'react'
import { EllipsisOutlined } from '@ant-design/icons';

const TaskListCard = ({ task }) => {
    const items = [
        {
            label: <a >Edit </a>,
            key: '0',
            icon: <span><i className="las la-edit"></i></span>,
        },
        {
            label: <a>Delete </a>,
            key: '1',
            icon: <span><i className="las la-trash"></i></span>,
        },

    ];
    return (
        <div className='border-2 w-full rounded-md p-1 pl-2 flex' >
            <div className='flex flex-col md:flex-row w-full mr-3 items-start md:items-center ' >
                <span className='font-semibold' >{task.ts_name}</span>
                <span className='ml-0 md:ml-auto text-neutral-500 '>{task.time} hrs</span>
            </div>
            <div className=' flex justify-center items-center '>
                <Tag className='h-5' color='blue' >{task.p_name}</Tag>
                <Dropdown menu={items}
                    trigger={['click']}
                >
                    <a style={{ color: '#545151' }}>
                        <Space>
                            <EllipsisOutlined style={{ fontSize: 25 }} />
                        </Space>
                    </a>

                </Dropdown>
            </div>
        </div>
    )
}

export default TaskListCard
