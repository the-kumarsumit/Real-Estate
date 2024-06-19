import React from 'react'
import Filter from '../filter/Filter'
import Card from '../card/Card'
import { listData } from '../../lib/dummydata'
import Map from '../map/Map';

function Listpage() {

    const data=listData;
  return (
    <div className='flex h-full flex-col sm:flex-row gap-1 p-2'>
        <div className='sm:flex-[3] h-full'>
            <div className='h-full flex flex-col overflow-y-scroll pb-12 gap-[50px]'>
                <Filter/>
                {data.map(item=>(
                    <Card key={item.id} item={item}/>
                ))}
            </div>
        </div>
        <div className=' hidden lg:flex sm:flex-[2] '>
            <Map items={data}/>
        </div>
    </div>
  )
}

export default Listpage