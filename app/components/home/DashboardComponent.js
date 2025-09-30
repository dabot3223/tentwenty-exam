'use client'
import React from 'react'
import TimesheetComponent from './timesheets/TimesheetComponent'
import { Container } from 'react-bootstrap'

const DashboardComponent = () => {
  return (
    <Container className='pl-0 md:pl-16 pr-0 md:pr-16' >
      <TimesheetComponent />
    </Container>
  )
}

export default DashboardComponent
