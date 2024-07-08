import { useSearchParams } from "react-router-dom";
import search from "/search.png";
import { useState } from "react";
function Filter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState({
    type: searchParams.get("type") || "",
    city: searchParams.get("city") || "",
    property: searchParams.get("property") || "",
    minPrice: searchParams.get("minPrice") || 0,
    maxPrice: searchParams.get("maxPrice") || 1000000,
    bedroom: searchParams.get("bedroom") || 1,
  });

  const handleChange = (e) => {
    setQuery({
      ...query,
      [e.target.name]: e.target.value,
    });
  };

  const handleFilter = () => {
    setSearchParams(query);
  };
  return (
    <div className="flex flex-col gap-[10px]">
      <h1 className="font-light text-2xl">
        Search results for <b>{searchParams.get("city")}</b>
      </h1>
      <div className="">
        <div className="flex flex-col gap-0.5">
          <label htmlFor="city">Location</label>
          <input
            className="w-[90%] border-[1px] p-2 rounded border-[#e0e0e0]"
            type="text"
            id="city"
            name="city"
            placeholder="City Location"
            onChange={handleChange}
            defaultValue={query.city}
          />
        </div>
      </div>
      <div className="flex flex-wrap justify-evenly gap-2">
        <div className="flex flex-col gap-0.5">
          <label htmlFor="type">Type</label>
          <select
            className="w-[100px] p-2.5 border-[1px] border-[#e0e0e0] rounded-[5px] text-sm"
            name="type"
            id="type"
            onChange={handleChange}
            defaultValue={query.type}
          >
            <option value="">any</option>
            <option value="buy">Buy</option>
            <option value="rent">Rent</option>
          </select>
        </div>
        <div className="flex flex-col gap-0.5">
          <label htmlFor="property">Property</label>
          <select
            className="w-[100px] p-2.5 border-[1px] border-[#e0e0e0] rounded-[5px] text-sm"
            name="property"
            id="property"
            onChange={handleChange}
            defaultValue={query.property}
          >
            <option value="">any</option>
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
            <option value="condo">Condo</option>
            <option value="land">Land</option>
          </select>
        </div>
        <div className="flex flex-col gap-0.5">
          <label htmlFor="minPrice">Min Price</label>
          <input
            className="w-[100px] p-2.5 border-[1px] border-[#e0e0e0] rounded-[5px] text-sm"
            type="number"
            id="minPrice"
            name="minPrice"
            placeholder="any"
            onChange={handleChange}
            defaultValue={query.minPrice}
          />
        </div>
        <div className="flex flex-col gap-0.5">
          <label htmlFor="maxPrice">Max Price</label>
          <input
            className="w-[100px] p-2.5 border-[1px] border-[#e0e0e0] rounded-[5px] text-sm"
            type="text"
            id="maxPrice"
            name="maxPrice"
            placeholder="any"
            onChange={handleChange}
            defaultValue={query.maxPrice}
          />
        </div>
        <div className="flex flex-col gap-0.5">
          <label htmlFor="bedroom">Bedroom</label>
          <input
            className="w-[100px]  lg:w-[100px] p-2.5 border-[1px] border-[#e0e0e0] rounded-[5px] text-sm"
            type="text"
            id="bedroom"
            name="bedroom"
            placeholder="any"
            onChange={handleChange}
            defaultValue={query.bedroom}
          />
        </div>
        <div className="flex items-end">
          <button onClick={handleFilter} className="w-[100px] lg:w-full h-12 rounded p-2.5 border-none cursor-pointer bg-[#fece51]">
            <img className="w-6 h-6" src={search} alt="" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Filter;
