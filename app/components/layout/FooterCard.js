import { Card } from 'antd'
import moment from 'moment'
import React from 'react'

const FooterCard = () => {
    return (
        <div className='pl-0 md:pl-20 pr-0 md:pr-20  '>
            <Card className='flex justify-center' >
                © {moment().format("YYYY")} tentwenty. All rights reserved.
            </Card>
        </div>
    )
}

export default FooterCard
