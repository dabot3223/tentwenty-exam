import { Button, Modal } from 'antd'
import React from 'react'
import AddTaskForm from './AddTaskForm'

const NewTaskModal = ({newTaskMod,setNewTaskMod,newTaskDate}) => {
  
  return (
    <div>
       <Modal
        title="Add New Entry"
        open={newTaskMod}
        onOk={()=>setNewTaskMod(false)}
        onCancel={()=>setNewTaskMod(false)}
        footer={false}
      >
        <AddTaskForm setNewTaskMod={setNewTaskMod} />
      </Modal>
    </div>
  )
}

export default NewTaskModal
