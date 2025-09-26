import { useState } from "react";
import search from "/search.png";
import { Link } from "react-router-dom";

const types = ["buy", "rent"];

function SearchBar() {
  const [query, setQuery] = useState({
    type: "buy",
    location: "",
    minPrice: 0,
    maxPrice: 99999,
  });

  const switchType = (val) => {
    setQuery((prev) => ({ ...prev, type: val }));
  };
  const handleChange = (e) => {
    setQuery((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div>
      <div className="flex">
        {types.map((type) => (
          <button
            key={type}
            onClick={() => switchType(type)}
            className={`px-9 py-4 border border-black border-b-0 uppercase first:rounded-tl-[5px] first:border-r-0 last:rounded-tr-[5px]  ${
              query.type === type ? "bg-black text-white" : "bg-white"
            }`}
          >
            {type}
          </button>
        ))}
      </div>
      <form className="border-0 sm:border-[1px] sm:border-gray-500 flex justify-between h-16 gap-[5px] flex-col sm:flex-row lg:p-[0px 5px]">
        <input
          className="flex-[1] p-3 sm:p-1 border-[1px] border-gray-500 sm:border-none "
          type="text"
          name="city"
          placeholder="City"
          onChange={handleChange}
        />
        <input
          className="flex-[1] p-3 sm:p-1 border-[1px] border-gray-500 sm:border-none"
          type="number"
          name="minPrice"
          min={0}
          max={10000000}
          placeholder="Min Price"
          onChange={handleChange}
        />
        <input
          className="flex-[1] p-3 sm:p-1 border-[1px] border-gray-500 sm:border-none"
          type="number"
          name="maxPrice"
          min={0}
          max={10000000}
          placeholder="Max Price"
          onChange={handleChange}
        />
        <Link to={`/list?type=${query.type}&city=${query.city}&minPrice=${query.minPrice}&maxPrice=${query.maxPrice}`} className="flex flex-1 bg-[#fece51] items-center justify-center">
          <button className="bg-[#fece51] p-x-9 py-4 cursor-pointer border-none">
            <img className="w-6 h-6 m-auto" src={search} alt="Search" />
          </button>
        </Link>
      </form>
    </div>
  );
}

export default SearchBar;
