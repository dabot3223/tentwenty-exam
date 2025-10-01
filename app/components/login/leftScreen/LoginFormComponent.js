'use client'
import { Button, Checkbox, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import React from 'react'
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

const LoginFormComponent = () => {
  const [isLoading, setIsLoading] = React.useState(false)
  const [erMsg, setErMsg] = React.useState(false)

  const router = useRouter()

  const onFinish = async (values) => {
    // console.log('Received values of form: ', values);

    setIsLoading(true);

    const options = {
      redirect: false,
      email: values.email.toString().trim(),
      pass: values.password,
      type: "password",
      auth_type: "email",
      remember: values.remember || false,
    };


    const res = await signIn("credentials", options);
    // console.log('res', res)
    if (res?.error) {
      setIsLoading(false);
      setErMsg(res?.error);
      // setTimeout(() => {
      //   setErMsg(false);
      // }, 2000)
    }
    else {
      setErMsg(false);
      setIsLoading(false);
      return router.push(`/`)
    }

  };
  return (
    <div>
      <div className='pl-16 pr-16' >
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
          <div
            className={`transition-all duration-500 ease-in-out ${erMsg ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
              }`}
          >
            {erMsg && <span className="text-red-700">{erMsg}</span>}
          </div>

          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <Form.Item className='mt-4' >
            <Button loading={isLoading} className='bg-[#1A56DB]' block type="primary" htmlType="submit">
              Sign in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default LoginFormComponent
