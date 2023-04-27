"use client";

import React, { useState, useEffect } from "react";
import styles from "./listing.module.css";
import {
  ImCheckboxUnchecked,
  ImCheckboxChecked,
  ImPencil,
} from "react-icons/im";
import { BsTrash3 } from "react-icons/bs";
import ListItem from "../../components/ListItem";
import ListInput from "../../components/ListInput";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Page() {
  const router = useRouter();
  const [listInput, setListInput] = useState("");
  const [listItems, setListItems] = useState([]);
  const [checked, setChecked] = useState(false);
  const [email, setEmail] = useState("");
  const [newItemAdded, setnewItemAdded] = useState(false);
  const [newItemChecked, setnewItemChecked] = useState(false);

  useEffect(() => {
    setEmail(sessionStorage?.getItem("email"));
  }, [email]);
  // console.log("myEmail:", email);

  useEffect(() => {
    setTimeout(() => {
      if (email) {
        axios
        .post("/api/finditem", {
          email
        })
        .then((res) => {
          console.log(res)
          if (res.data?.listData?.length > 0) setListItems(res.data.listData);
        })
        .catch((err) => console.log(err))
        console.log('timeout email',email);
      }
    }, 10);
    clearTimeout()
  }, [email, newItemAdded, newItemChecked]);

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("email");
    if (!storedEmail || storedEmail.length === 0) router.push("/signin");

    return () => {};
  }, [router]);

  const handleDelete = (ev, id) => {
    const tempListItem = listItems;
    const deleteItemList = tempListItem.filter((val) => val.id !== id);
    setListItems(deleteItemList);
  };
  const handleEdit = (ev, id) => {
    console.log(id);
  };
  const handleCheck =async (ev, id) => {
    try{
      const res = await axios.post("/api/checked", {
        email,
        id: id,
        checked: true
      });
      if(res.data.statusCode === 200){
        console.log(res)
        setnewItemChecked(true)
      }
      
    }catch(err){
      console.log(err)
    }
    setnewItemChecked(false)
  };

  const handleInputChange = (ev) => {
    setListInput(ev.target.value);
  };

  const handleAddItem = async (ev, listItemName) => {
    if (!listItemName == "") {
      try{
        const res = await axios.post("/api/additem", {
          email,
          id: Math.floor(Math.random() * 1000),
          listItem: listItemName,
        });
        if(res.data.statusCode === 200){
          console.log(res)
          
          setListInput("");
          setnewItemAdded(true)
          
         
          
        }
        
      }catch(err){
        console.log(err)
      }
      // setListItems([
      //   ...listItems,
      //   {
      //     id: listItems.length + 1,
      //     listItemName,
      //   },
      // ]);
    } else {
      alert("Empty todo list is not allowed.");
    }
  };

  return (
    <div className="h-full m-0">
      <div
        className={` w-full ${styles.containermain} pt-[50px] custom640:px-[10px] custom640:pt-[85px] pb-[80px] custom640:overflow-hidden`}
      >
        {listItems.map((val) => (
          <div key={val.id}>
            {" "}
            <ListItem
              id={val.id}
              itemName={val.itemName}
              checked={val.checked}
              handleCheck={handleCheck}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />{" "}
          </div>
        ))}

        <ListInput
          listInput={listInput}
          handleInputChange={handleInputChange}
          handleAddItem={handleAddItem}
        />
      </div>
    </div>
  );
}
