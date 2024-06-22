import React from "react";
import { Link } from "react-router-dom";
import chat from "/chat.png";
import bed from "/bed.png";
import bath from "/bath.png";
import pin from "/pin.png";
import save from "/save.png";

function Card({ item }) {
  return (
    <div className="flex gap-5 pe-2 flex-col md:flex-row">
      <Link to={`/${item.id}`} className="flex-[2] h-[200px]">
        <img
          className="w-full h-full object-cover rounded-[10px]"
          src={item.img}
          alt=""
        />
      </Link>
      <div className="flex-[3] flex flex-col justify-between gap-2.5">
        <h2 className="text-xl font-semibold text-[#444] hover:text-black hover:scale-[1.01]">
          <Link to={`/${item.id}`}>{item.title}</Link>
        </h2>
        <p className="text-[14px] flex items-center gap-[5px] text-[#888]">
          <img className="h-4 w-4" src={pin} alt="" />
          <span>{item.address}</span>
        </p>
        <p className="text-xl font-light p-[5px] rounded-[5px] bg-[rgba(254,205,81,0.438)] w-max">
          ${item.price}
        </p>
        <div className="flex gap-2.5 justify-between flex-col md:flex-row">
          <div className="flex gap-5 text-[14px]">
            <div className="flex items-center gap-[5px] bg-slate-200 p-[5px] rounded-[5px]">
              <img className="h-4 w-4" src={bed} alt="" />
              <span>{item.bedroom} bedroom</span>
            </div>
            <div className="flex items-center gap-[5px] bg-slate-200 p-[5px] rounded-[5px]">
              <img className="h-4 w-4" src={bath} alt="" />
              <span>{item.bathroom} bathroom</span>
            </div>
          </div>
          <div className="flex gap-5">
            <div className="border-[1px] border-[#999] rounde-[5px] cursor-pointer flex items-center justify-center hover:bg-gray-300 px-[5px] py-[2px] rounded">
              <img className="h-4 w-4" src={save} alt="" />
            </div>
            <div className="border-[1px] border-[#999] rounde-[5px] cursor-pointer flex items-center justify-center hover:bg-gray-300 px-[5px] py-[2px] rounded">
              <img className="h-4 w-4" src={chat} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
