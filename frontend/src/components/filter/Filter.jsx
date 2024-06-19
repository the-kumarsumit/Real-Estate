import search from "/search.png";
function Filter() {
  return (
    <div className="flex flex-col gap-[10px]">
      <h1 className="font-light text-2xl">
        Search results for <b>London</b>
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
          />
        </div>
        <div className="flex items-end">
          <button className="w-[100px] lg:w-full h-12 rounded p-2.5 border-none cursor-pointer bg-[#fece51]">
            <img className="w-6 h-6" src={search} alt="" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Filter;
