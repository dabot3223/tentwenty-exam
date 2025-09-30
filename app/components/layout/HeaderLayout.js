'use client'
import React from 'react'
import {  Layout } from 'antd';
import styles from './layout.module.css';
import UserProfileComponent from './UserProfileComponent';
import FooterCard from './FooterCard';

const { Header } = Layout;

const HeaderLayout = ({ children }) => {
  return (
    <Layout className='bg-white' >
      <Header
        style={{
          padding: 0,
          background: '#fff',
          position:'sticky',
          top:0,
          zIndex: 30,
          boxShadow: '2px 2px 4px 0px rgba(2, 45, 98, 0.1)'
        }}
      >
        
        <div className={styles.header}>
            <div className={styles.headLeft}>
                ticktock
            </div>
            <div>
                Timesheets
            </div>
            <div className={styles.headRight}>
              {/* <CreateNewComponent/> */}
              <UserProfileComponent/>
            </div>
        </div>

      </Header>
      
      {children}
      <FooterCard />
    </Layout>
  )
}

export default HeaderLayout