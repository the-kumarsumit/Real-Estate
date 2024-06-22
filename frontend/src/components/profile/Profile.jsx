import Chat from "../chat/Chat";
import List from "../list/List";


function ProfilePage() {
  return (
    <div className="flex h-full flex-col lg:flex-row px-2">
      <div className="md:flex-[3] h-max md:h-auto lg:overflow-y-scroll pb-[50px] ">
        <div className="md:pe-[50px] flex flex-col gap-[50px]">
          <div className="flex items-center justify-between">
            <h1 className="font-light">User Information</h1>
            <button className="py-3 px-6 bg-[#fece51] cursor-pointer border-0">Update Profile</button>
          </div>
          <div className="flex flex-col gap-5">
            <span className="flex items-center gap-5">
              Avatar:
              <img className="h-10 w-10 rounded-full object-cover"
                src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt=""
              />
            </span>
            <span className="flex items-center gap-5">
              Username: <b>John Doe</b>
            </span>
            <span className="flex items-center gap-5">
              E-mail: <b>john@gmail.com</b>
            </span>
          </div>
          <div className="flex items-center justify-between">
            <h1>My List</h1>
            <button className="py-3 px-6 bg-[#fece51] cursor-pointer border-0">Create New Post</button>
          </div>
          <List />
          <div className="flex items-center justify-between">
            <h1>Saved List</h1>
          </div>
          <List />
        </div>
      </div>
      <div className="md:flex-[2] h-max md:h-full bg-[#fcf5f3]">
        <div className="px-5 h-full">
          <Chat/>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
