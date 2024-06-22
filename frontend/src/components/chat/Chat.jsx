import { useState } from "react";

function Chat() {
  const [chat, setChat] = useState(true);
  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 flex flex-col gap-5 overflow-y-scroll">
        <h1 className="font-light">Messages</h1>
        <div className="bg-white p-5 rounded-[10px] flx items-center gap-5 cursor-pointer">
          <img
            className="w-10 h-10 rounded-full object-fit-cover"
            src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt=""
          />
          <span className="font-bold">John Doe</span>
          <p>Lorem ipsum dolor sit amet...</p>
        </div>
        <div className="bg-white p-5 rounded-[10px] flx items-center gap-5 cursor-pointer">
          <img
            className="w-10 h-10 rounded-full object-fit-cover"
            src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt=""
          />
          <span className="font-bold">John Doe</span>
          <p>Lorem ipsum dolor sit amet...</p>
        </div>
        <div className="bg-white p-5 rounded-[10px] flx items-center gap-5 cursor-pointer">
          <img
            className="w-10 h-10 rounded-full object-fit-cover"
            src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt=""
          />
          <span className="font-bold">John Doe</span>
          <p>Lorem ipsum dolor sit amet...</p>
        </div>
        <div className="bg-white p-5 rounded-[10px] flx items-center gap-5 cursor-pointer">
          <img
            className="w-10 h-10 rounded-full object-fit-cover"
            src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt=""
          />
          <span className="font-bold">John Doe</span>
          <p>Lorem ipsum dolor sit amet...</p>
        </div>
        <div className="bg-white p-5 rounded-[10px] flx items-center gap-5 cursor-pointer">
          <img
            className="w-10 h-10 rounded-full object-fit-cover"
            src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt=""
          />
          <span className="font-bold">John Doe</span>
          <p>Lorem ipsum dolor sit amet...</p>
        </div>
        <div className="bg-white p-5 rounded-[10px] flx items-center gap-5 cursor-pointer">
          <img
            className="w-10 h-10 rounded-full object-fit-cover"
            src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt=""
          />
          <span className="font-bold">John Doe</span>
          <p>Lorem ipsum dolor sit amet...</p>
        </div>
      </div>
      {chat && (
        <div className="flex-1 bg-white flex flex-col justify-between">
          <div className="bg-[#f7c14b85] p-5 font-bold flex items-center justify-between">
            <div className="flex items-center gap-5">
              <img className="w-[30px] h-[30px] rounded-full object-cover"
                src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt=""
              />
              John Doe
            </div>
            <span className="cursor-pointer" onClick={() => setChat(null)}>
              X
            </span>
          </div>
          <div className="h-[350px] overflow-y-scroll px-5 flex flex-col gap-5">
            <div className="w-1/2">
              <p>Lorem ipsum dolor sit amet</p>
              <span>1 hour ago</span>
            </div>
            <div className="w-1/2 self-end text-right">
              <p>Lorem ipsum dolor sit amet</p>
              <span>1 hour ago</span>
            </div>
            <div className="w-1/2">
              <p>Lorem ipsum dolor sit amet</p>
              <span>1 hour ago</span>
            </div>
            <div className="w-1/2 self-end text-right">
              <p>Lorem ipsum dolor sit amet</p>
              <span>1 hour ago</span>
            </div>
            <div className="w-1/2">
              <p>Lorem ipsum dolor sit amet</p>
              <span>1 hour ago</span>
            </div>
            <div className="w-1/2 self-end text-right">
              <p>Lorem ipsum dolor sit amet</p>
              <span>1 hour ago</span>
            </div>
            <div className="w-1/2">
              <p>Lorem ipsum dolor sit amet</p>
              <span>1 hour ago</span>
            </div>
            <div className="w-1/2 self-end text-right">
              <p>Lorem ipsum dolor sit amet</p>
              <span>1 hour ago</span>
            </div>
            <div className="w-1/2">
              <p>Lorem ipsum dolor sit amet</p>
              <span>1 hour ago</span>
            </div>
            <div className="w-1/2 self-end text-right">
              <p>Lorem ipsum dolor sit amet</p>
              <span>1 hour ago</span>
            </div>
          </div>
          <div className="border-top-[2px] border-[#f7c14b85] h-[60px] flex items-center justify-between">
            <textarea className="flex-[3] resize-none overflow-hidden h-full border-0 p-5"></textarea>
            <button className="flex-1 bg-[#f7c14b85] border-0 cursor-pointer">Send</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chat;
