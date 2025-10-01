import { Button, Form, InputNumber, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React from 'react'

const AddTaskForm = ({ setNewTaskMod }) => {

    const [form] = Form.useForm();

    const onFinish = (values) => {
        // console.log("Form values:", values);
    };
    return (
        <div>
            <Form
                form={form}
                initialValues={[]}
                layout="vertical"
                onFinish={onFinish}
                style={{ maxWidth: 500, margin: "0 auto" }}
            >
                <Form.Item
                    label="Select Project"
                    name="project"
                    rules={[{ required: true, message: "Please select a project" }]}
                    tooltip="Choose the project you worked on"
                >
                    <Select
                        placeholder="Project Name"
                        options={[
                            { value: "p1", label: "Project1" },
                            { value: "p2", label: "Project2" },
                            { value: "p3", label: "Project3" },
                        ]}
                    />
                </Form.Item>

                <Form.Item
                    label="Type of Work"
                    name="workType"
                    rules={[{ required: true, message: "Please select work type" }]}
                    tooltip="What kind of task did you do?"
                >
                    <Select
                        placeholder="Bug fixes"
                        options={[
                            { value: 'bg', label: "Bug fixes" },
                            { value: 'ft', label: "Feature" },
                            { value: 'dg', label: "Design" }
                        ]}
                    />
                </Form.Item>

                <Form.Item
                    label="Task description"
                    name="description"
                    rules={[{ required: true, message: "Please enter task description" }]}
                >
                    <TextArea placeholder="Write text here ..." rows={4} />
                </Form.Item>
                <p style={{ marginTop: -12, marginBottom: 16, color: "#8c8c8c" }}>
                    A note for extra info
                </p>

                <Form.Item
                    label="Hours"
                    name="hours"
                    rules={[{ required: true, message: "Please enter hours" }]}
                >
                    <InputNumber min={0} defaultValue={12} />
                </Form.Item>

                <Form.Item>

                    <div className='w-full flex gap-3' >
                        <Button className='w-full' htmlType="submit" type='primary' onClick={() => setNewTaskMod(false)}>Add entry</Button>
                        <Button className='w-full' type='default' onClick={() => setNewTaskMod(false)} >Cancel</Button>
                    </div>
                </Form.Item>
            </Form>
        </div>
    )
}

export default AddTaskForm
