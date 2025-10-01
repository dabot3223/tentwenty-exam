'use client'
import React from 'react'
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { Dropdown, Avatar, Space } from 'antd';
import { signOut, useSession } from 'next-auth/react';



const UserProfileComponent = () => {
  const { data: session, status } = useSession();
  const onLogout = async () => {
    signOut({
      redirect: true,
      callbackUrl: `/login`, // This will be returned in result.url
    });

  }
  const items = [
    {
      label: 'Profile',
      key: '1',
      icon: <span><i className="las la-user"></i></span>,
    },
    {
      label: 'Account Settings',
      key: '2',
      icon: <span><i className="las la-cog"></i></span>,
    },
    {
      type: 'divider',
    },
    {
      label: <><a
        onClick={(e) => onLogout()}>Logout</a></>,
      key: '3',
      icon: <span><i className="las la-sign-out-alt"></i></span>,

    },
  ];
  //// console.log(session)
  return (
    <div className={'userProfile'}>
      <Dropdown
        menu={{
          items,
        }}
        className={'userProfileMenu'}
      >
        <a className='flex' onClick={(e) => e.preventDefault()}>
          {status == 'authenticated' ? session?.user?.name : ""}
          <DownOutlined />
        </a>
      </Dropdown>
    </div>
  )
}

export default UserProfileComponent