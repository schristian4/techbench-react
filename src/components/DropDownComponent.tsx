import {  cityDataType } from "../cityDataTypes";


export const DropDownList = (props: cityDataType[]) => {
  console.log(props[0])
    return (
      <select
        id="cityDropDown"
        className="form-select dropdown-toggle"
        aria-label="Default select example"
      ></select>
    );
  };