import SearchBar from "../../components/searchBar/SearchBar";
import bg from "/bg.png";

function HomePage() {
  return (
    <div className="flex h-full">
      <div className="flex-[3]">
        <div className="px-2 flex flex-col justify-center gap-[50px] h-full">
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">Find Real Estate & Get Your Dream Place</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos
            explicabo suscipit cum eius, iure est nulla animi consequatur
            facilis id pariatur fugit quos laudantium temporibus dolor ea
            repellat provident impedit!
          </p>
          <SearchBar />
          <div className=" sm:flex mt-24 sm:mt-0 justify-between">
            <div className="my-1">
              <h1 className="text-2xl sm:text-4xl">16+</h1>
              <h2 className="text-lg font-light">Years of Experience</h2>
            </div>
            <div className="my-1">
              <h1 className="text-2xl sm:text-4xl">200</h1>
              <h2 className="text-lg font-light">Award Gained</h2>
            </div>
            <div className="my-1">
              <h1 className="text-2xl sm:text-4xl">2000+</h1>
              <h2 className="text-lg font-light">Property Ready</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden lg:flex flex-[2] items-center relative">
        <img className="absolute w-[115%] right-0" src={bg} alt="" />
      </div>
    </div>
  );
}

export default HomePage;
