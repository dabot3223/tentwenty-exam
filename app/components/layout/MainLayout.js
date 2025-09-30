'use client'
import { Layout } from 'antd';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import React from 'react'
import HeaderLayout from './HeaderLayout';
const { Content } = Layout;

const MainLayout = ({children}) => {

    const { data: session, status } = useSession();
    return (
        <Layout>
            <Head>
                <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"></meta>
            </Head>
            {
                status == "authenticated" ?
                    <>
                        <HeaderLayout>
                            <Content
                                style={{
                                    padding: 24,
                                    margin: 0,
                                    borderRadius: 0,
                                    backgroundColor:"#fff"
                                }}
                            >
                                {children}
                            </Content>
                        </HeaderLayout>
                        
                    </>
                    : <>{children}</>
            }
        </Layout>
    )
}

export default MainLayout
