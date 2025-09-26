import Card from"../card/Card"

function List({posts}){
  console.log(posts);
  
  return (
    <div className='flex flex-col gap-[50px]'>
      {posts.map(item=>(
        <Card key={item._id} item={item}/>
      ))}
    </div>
  )
}

export default List