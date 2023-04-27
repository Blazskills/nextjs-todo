import React from "react";

export default function ListInput({
  listInput,
  handleInputChange,
  handleAddItem,
 
}) {

  return (
    <div
      className={`flex custom640:flex-col items-center w-[500px] custom640:w-[100%] custom640:gap-3 h-[80px] justify-between m-auto px-[15px]`}
    >
      <input
        value={listInput}
        autoComplete="false"
        required
        placeholder="Enter Item"
        type="text"
        id="large-input"
        className="block focus:border-[#00bb00] border-[1.5px] w-[350px] custom340:w-[98%] custom340:text-[20px] text-[25px] p-4 py-[10px] text-gray-900 border-gray-300 rounded-md bg-gray-50 sm:text-md focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onChange={handleInputChange}
      />
      <button
        onClick={(ev) => {
          handleAddItem(ev, listInput);
        }}
        className={`text-[50px] cursor-pointer custom340:text-[30px] text-[#fff] py-[3px] custom340:py-[1px] custom340:px-[14px] px-[26px] text-center rounded-full bg-[#00bb00] hover:opacity-[0.8]`}
      >
        +
      </button>
    </div>
  );
}
