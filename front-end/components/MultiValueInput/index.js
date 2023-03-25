import {
    Chip,
      FormControl,
      Input,
  } from "@mui/material";
  import React, { useEffect, useState } from "react";

  
  
  export default function App({inputValue, onInputChange ,items, onAdd, onDelete}) {
      const handleKeyUp = (e) => {
          if (e.keyCode == 32) {
              //onAdd((oldState) => oldState);
              console.log(items)
              onAdd((oldState) => [...oldState, e.target.value]);
              onInputChange("");
          }
      };
  
      useEffect(() => {
      }, [items]);
  
      const handleChange = (e) => {
          onInputChange(e.target.value);
    };
    
    const handleDelete = ( item, index) =>{
      let arr = [...items]
      arr.splice(index,1)
      onDelete(arr)
    }
  
      return (
        <FormControl>
				<div >
					{items.lenght !== 0 && items.map((item,index) => (
						<Chip key={item} size="small" onDelete={()=>handleDelete(item,index)} label={item}/>
					))}
				</div>
				<Input  
                    placeholder='Variações'
					value={inputValue}
					onChange={handleChange}
					onKeyDown={handleKeyUp}
				/>
			</FormControl>

      );
  }
