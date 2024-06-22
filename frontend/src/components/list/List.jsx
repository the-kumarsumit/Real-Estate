import Card from"../card/Card"
import {listData} from"../../lib/dummydata"

function List(){
  return (
    <div className='flex flex-col gap-[50px]'>
      {listData.map(item=>(
        <Card key={item.id} item={item}/>
      ))}
    </div>
  )
}

export default List