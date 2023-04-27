import React from "react";
import {
  ImCheckboxUnchecked,
  ImCheckboxChecked,
  ImPencil,
} from "react-icons/im";
import { BsTrash3 } from "react-icons/bs";

export default function ListItem({ id, itemName, checked, handleCheck, handleEdit , handleDelete }) {
  return (
    <div
      className={`flex justify-between items-center w-[500px] custom640:min-w-full custom640:w-[90%] h-[100px]  bg-[#fff] custom640:px-[10px] px-[20px] rounded-2xl m-auto drop-shadow-2xl mb-[50px]`}
    >
      <div className={`flex items-center gap-2 flex-1`}>
        <div>
          {/* <ImCheckboxUnchecked size="20px" className="cursor-pointer" /> */}
          <input type="checkbox" onChange={(ev)=>{handleCheck(ev, id)}} checked={checked} />
        </div>
        <div
          className={`text-[#000000]  text-[20px] px-[5px] overflow-auto custom280:w-[150px] custom640:max-w-[260px] custom280:max-w-[auto]`}
        >
          <p className={`h-[90px] w-[300px] min-w-[350px] py-[8%] ${checked ? "line-through" : 'none'}`}>
            {itemName}
          </p>
        </div>
      </div>

      <div className={`flex items-center gap-2 `}>
        <ImPencil onClick={(ev) =>{
          handleEdit(ev, id)
        }} size="20px" className="cursor-pointer hover:text-[#00bb00]"/>
          <BsTrash3 onClick={(ev) =>{
          handleDelete(ev, id)
        }} size="20px" className="cursor-pointer hover:text-[#00bb00]"/>
      </div>
    </div>
  );
}
