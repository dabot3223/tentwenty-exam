import React from 'react'
import { DatePicker, Select, Space } from 'antd';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';

dayjs.extend(isoWeek);

const { RangePicker } = DatePicker;

const TimesheetFilters = ({setDates,setStatus}) => {


  const onDateChange = (values) => {
    if (!values) {
      setDates([]);
      return;
    }
    const start = values[0].startOf('week').format('YYYY-MM-DD');
    const end = values[1].endOf('week').format('YYYY-MM-DD');
    setDates({start, end});
    console.log('Selected week range:', [start, end]);
  };

  const onSelectChange = (e)=>{
    console.log(e)
    setStatus(e)
  }
  return (
    <div className='flex gap-2' >
      <Space direction="vertical" size={12}>
      <RangePicker
        picker="week"
        format="YYYY-[W]WW"
        onChange={onDateChange}
        allowClear
      />
    </Space>
    
    <Select
      placeholder="Select status"
      onChange={onSelectChange}
      style={{ width: 200 }}
      options={[
        { value: 1, label: 'Complete' },
        { value: 0, label: 'Incomplete' },
        { value: 2, label: 'Missing' },
      ]}
      allowClear
    />
    </div>
  )
}

export default TimesheetFilters
