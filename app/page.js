import React from 'react'
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/lib/authOptions';
import DashboardComponent from './components/home/DashboardComponent';

const page = async() => {
    const session = await getServerSession(authOptions);
    console.log(session)
    if (!session) {
        redirect('/login')
    }
  return (
    <section>
        <DashboardComponent />
    </section>
  )
}

export default page
