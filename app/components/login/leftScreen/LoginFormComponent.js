'use client'
import { Button, Checkbox, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import React from 'react'

const LoginFormComponent = () => {

  const onFinish = values => {
    console.log('Received values of form: ', values);
  };
  return (
    <div className="h-screen flex justify-center flex-col" >
      <div className='p-16' >
        <h4 className=' pb-5 font-semibold' >Welcome back</h4>
        <Form
          className='w-full'
          name="login"
          initialValues={{ remember: true }}
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please input your Email-Id!' }]}
            label={<span className='font-semibold' >Email</span>}
          >
            <Input placeholder="user@emai.com" />
          </Form.Item>
          <Form.Item
            name="password"
            label={<span className='font-semibold' >Password</span>}
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input type="password" placeholder="Password" />
          </Form.Item>
          <Form.Item  name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <Form.Item className=' mt-4' >
            <Button style={{backgroundColor:"#1A56DB"}} block type="primary" htmlType="submit">
              Sign in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default LoginFormComponent
