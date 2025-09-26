import Map from "../../components/map/Map";
import Slider from "../slider/Slider";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import apiRequest from "../../lib/apiRequest";
import UserContext from "../../context/UserContext";
import DOMPurify from "dompurify";

function SinglePage() {
  let post = useLoaderData();
  
  const [saved, setSaved] = useState(post.isSaved);
  post=post._doc
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSave = async (e) => {
    e.preventDefault();
    if (!user) {
      return navigate("/login");
    }

    // AFTER REACT 19 UPDATE TO USEOPTIMISTIK HOOK
    setSaved((prev) => !prev);
    try {
      await apiRequest.post("/users/save", { postId: post._id });
    } catch (err) {
      console.log(err);
      setSaved((prev) => !prev);
    }
  };

  return (
    <div className="flex h-full flex-col lg:flex-row overflow-scroll lg:overflow-hidden gap-2">
      <div className="flex-none h-max mb-[50px] md:flex-[3] md:h-full overflow-x-scroll">
        <div className="lg:pe-[50px] md:pe-5 p-2">
          <Slider images={post.images} />
          <div className="mt-[50px]">
            <div className="flex-col gap-5 flex sm:flex-row justify-between sm:gap-0">
              <div className="flex flex-col gap-5">
                <h1 className="font-normal">{post.title}</h1>
                <div className="flex gap-2.5 items-center text-[#888] text-sm">
                  <img className="w-4 h-4" src="/pin.png" alt="" />
                  <span>{post.address}</span>
                </div>
                <div className="p-[5px] bg-[#fecd5170] rounded-[5px] w-max text-xl font-light">
                  $ {post.price}
                </div>
              </div>
              <div className="flex flex-col items-center justify-center gap-5 py-5 sm:py-0 px-[50px] rounded-[10px] bg-[#fecd5135] font-semibold">
                <img
                  className="w-[50px] h-[50px] rounded-[50%] object-cover"
                  src={post?.user?.avatar}
                  alt=""
                />
                <span>{post?.userId?.username}</span>
              </div>
            </div>
            <div
              className="mt-[50px] text-[#555] leading-5"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(post.postDetail.desc),
              }}
            />
          </div>
        </div>
      </div>
      <div className="flex-none h-max mb-[50px] md:flex-2 md:h-full lg:overflow-y-scroll bg-[#fcf5f3] pb-5">
        <div className="p-5 md:px-5 py-0 flex flex-col gap-5">
          <p className="font-bold text-lg mb-2.5">General</p>
          <div className="flex flex-col gap-5 py-5 px-[10px] bg-white rounded-[10px]">
            <div className="flex items-center gap-2.5">
              <img
                className="h-6 w-6 bg-[#fecd5135]"
                src="/utility.png"
                alt=""
              />
              <div className="">
                <span className="font-bold">Utilities</span>
                {post.postDetail.utilities === "owner" ? (
                  <p className="text-sm">Owner is responsible</p>
                ) : (
                  <p className="text-sm">Tenant is responsible</p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <img className="h-6 w-6 bg-[#fecd5135]" src="/pet.png" alt="" />
              <div className="">
                <span className="font-bold">Pet Policy</span>
                {post.postDetail.pet === "yes" ? (
                  <p className="text-sm">Pets Allowed</p>
                ) : (
                  <p className="text-sm">Pets not Allowed</p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <img className="h-6 w-6 bg-[#fecd5135]" src="/fee.png" alt="" />
              <div className="">
                <span className="font-bold">Income Policy</span>
                <p>{post.postDetail.income}</p>
              </div>
            </div>
          </div>
          <p className="font-bold text-lg mb-2.5">Sizes</p>
          <div className="lg:text-[12px] flex flex-col lg:flex-row justify-between">
            <div className="flex items-center gap-2.5 bg-white p-2.5 rounded-[5px]">
              <img className="h-6 w-6 bg-[#fecd5135]" src="/size.png" alt="" />
              <span>{post.postDetail.size} sqft</span>
            </div>
            <div className="flex items-center gap-2.5 bg-white p-2.5 rounded-[5px]">
              <img className="h-6 w-6 bg-[#fecd5135]" src="/bed.png" alt="" />
              <span>{post.bedroom} beds</span>
            </div>
            <div className="flex items-center gap-2.5 bg-white p-2.5 rounded-[5px]">
              <img className="h-6 w-6 bg-[#fecd5135]" src="/bath.png" alt="" />
              <span>{post.bathroom} bathroom</span>
            </div>
          </div>
          <p className="font-bold text-lg mb-2.5">Nearby Places</p>
          <div className="flex justify-between px-[10px] py-5 bg-white rounded-[10px] flex-col lg:flex-row gap-1">
            <div className="flex items-center gap-[10px]">
              <img
                className="h-6 w-6 bg-[#fecd5135]"
                src="/school.png"
                alt=""
              />
              <div className="">
                <span className="font-bold">School</span>
                <p className="text-sm">
                  {post.postDetail.school > 999
                    ? post.postDetail.school / 1000 + "km"
                    : post.postDetail.school + "m"}{" "}
                  away
                </p>
              </div>
            </div>
            <div className="flex items-center gap-[10px]">
              <img className="h-6 w-6 bg-[#fecd5135]" src="/pet.png" alt="" />
              <div className="">
                <span className="font-bold">Bus Stop</span>
                <p className="text-sm">{post.postDetail.bus}m away</p>
              </div>
            </div>
            <div className="flex items-center gap-[10px]">
              <img className="h-6 w-6 bg-[#fecd5135]" src="/fee.png" alt="" />
              <div className="">
                <span className="font-bold">Restaurant</span>
                <p className="text-sm">{post.postDetail.restaurant}m away</p>
              </div>
            </div>
          </div>
          <p className="font-bold text-lg mb-2.5">Location</p>
          <div className="w-full h-[200px]">
            <Map items={[post]} />
          </div>
          <div className="flex justify-between gap-1">
            <button className="p-5 flex items-center gap-2.5 bg-white border-[1px] border-[#fece51] rounded-[5px] cursor-pointer">
              <img className="h-4 w-4" src="/chat.png" alt="" />
              Send a Message
            </button>
            <button
              onClick={handleSave}
              className={`${
                saved ? "bg-[#fece51]" : "bg-white"
              } p-5 flex items-center gap-2.5 border-[1px] border-[#fece51] rounded-[5px] cursor-pointer`}
            >
              <img className="h-4 w-4" src="/save.png" alt="" />
              {saved ? "Place Saved" : "Save the Place"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SinglePage;
