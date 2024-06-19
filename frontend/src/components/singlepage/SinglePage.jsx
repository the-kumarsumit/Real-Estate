import Map from "../../components/map/Map";
import Slider from "../slider/Slider"
import { singlePostData, userData } from "../../lib/dummydata";

function SinglePage() {
  return (
    <div className="flex h-full flex-col md:flex-row overflow-scroll md:overflow-hidden gap-2">
      <div className="flex-none h-max mb[50px] md:flex-[3] md:h-full ">
        <div className="pe-[50px] md:pe-5 lg:pe-0">
          <Slider images={singlePostData.images} />
          <div className="mt-[50px]">
            <div className="flex-col gap-5 flex sm:flex-row justify-between sm:gap-0">
              <div className="flex flex-col gap-5">
                <h1 className="font-normal">{singlePostData.title}</h1>
                <div className="flex gap-2.5 items-center text-[#888] text-sm">
                  <img className="w-4 h-4" src="/pin.png" alt="" />
                  <span>{singlePostData.address}</span>
                </div>
                <div className="p-[5px] bg-[#fecd5170] rounded-[5px] w-max text-xl font-light">$ {singlePostData.price}</div>
              </div>
              <div className="flex flex-col items-center justify-center gap-5 py-5 sm:py-0 px-[50px] rounded-[10px] bg-[#fecd5135] font-semibold">
                <img className="w-[50px] h-[50px] rounded-[50%] object-cover" src={userData.img} alt="" />
                <span>{userData.name}</span>
              </div>
            </div>
            <div className="mt-[50px] text-[#555] leading-5">{singlePostData.description}</div>
          </div>
        </div>
      </div>
      <div className="flex-non h-max mb-[50px] md:flex-2 md:h-full overflow-y-scroll">
        <div className="p-5 md:px-5 py-0 flex flex-col gap-5">
          <p className="font-bold text-lg mb-2.5">General</p>
          <div className="flex flex-col gap-5 py-5 px-[10px] bg-white rounded-[10px">
            <div className="flex items-center gap-2.5">
              <img className="h-6 w-6 bg-[#fecd5135]" src="/utility.png" alt="" />
              <div className="">
                <span className="font-bold">Utilities</span>
                <p className="text-sm">Renter is responsible</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <img className="h-6 w-6 bg-[#fecd5135]" src="/pet.png" alt="" />
              <div className="">
                <span className="font-bold">Pet Policy</span>
                <p className="text-sm">Pets Allowed</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <img  className="h-6 w-6 bg-[#fecd5135]"src="/fee.png" alt="" />
              <div className="">
                <span className="font-bold">Property Fees</span>
                <p className="text-sm">Must have 3x the rent in total household income</p>
              </div>
            </div>
          </div>
          <p className="font-bold text-lg mb-2.5">Sizes</p>
          <div className="lg:text-[12px] flex justify-between">
            <div className="flex items-center gap-2.5 bg-white p-2.5 rounded-[5px]">
              <img className="h-6 w-6 bg-[#fecd5135]" src="/size.png" alt="" />
              <span>80 sqft</span>
            </div>
            <div className="flex items-center gap-2.5 bg-white p-2.5 rounded-[5px]">
              <img className="h-6 w-6 bg-[#fecd5135]" src="/bed.png" alt="" />
              <span>2 beds</span>
            </div>
            <div className="flex items-center gap-2.5 bg-white p-2.5 rounded-[5px]">
              <img className="h-6 w-6 bg-[#fecd5135]" src="/bath.png" alt="" />
              <span>1 bathroom</span>
            </div>
          </div>
          <p className="font-bold text-lg mb-2.5">Nearby Places</p>
          <div className="flex justify-between px-[10px] py-5 bg-white rounded-[10px]">
            <div className="flex items-center gap-[10px]">
              <img className="h-6 w-6 bg-[#fecd5135]" src="/school.png" alt="" />
              <div className="">
                <span className="font-bold">School</span>
                <p className="text-sm">250m away</p>
              </div>
            </div>
            <div className="flex items-center gap-[10px]">
              <img className="h-6 w-6 bg-[#fecd5135]" src="/pet.png" alt="" />
              <div className="">
                <span className="font-bold">Bus Stop</span>
                <p className="text-sm">100m away</p>
              </div>
            </div>
            <div className="flex items-center gap-[10px]">
              <img className="h-6 w-6 bg-[#fecd5135]" src="/fee.png" alt="" />
              <div className="">
                <span className="font-bold">Restaurant</span>
                <p className="text-sm">200m away</p>
              </div>
            </div>
          </div>
          <p className="font-bold text-lg mb-2.5">Location</p>
          <div className="w-full h-[200px]">
            <Map items={[singlePostData]} />
          </div>
          <div className="flex justify-between">
            <button className="p-5 flex items-center gap-2.5 bg-white border-[1px] border-[#fece51] rounded-[5px] cursor-pointer">
              <img className="h-4 w-4" src="/chat.png" alt="" />
              Send a Message
            </button>
            <button className="p-5 flex items-center gap-2.5 bg-white border-[1px] border-[#fece51] rounded-[5px] cursor-pointer">
              <img className="h-4 w-4" src="/save.png" alt="" />
              Save the Place
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SinglePage;
