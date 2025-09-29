import React from 'react'
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/lib/authOptions';

const page = async() => {
    const session = await getServerSession(authOptions);
    if (!session) {
        redirect('/login')
    }
  return (
    <section>
        hello
    </section>
  )
}

export default page
