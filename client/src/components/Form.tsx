import React, { useEffect, useState } from "react";
import axios from "axios";

// interfaces
// import ColumnNames from "../interfaces/column-names-state.interface";
import InputValue from "../interfaces/input-value-object.interface";
import { TableData, ColumnName, ForeignKey } from "@backend/types/table";
import { AllTablesType } from "@backend/dbschema";
import { QueryResult } from "@backend/types/table";

const formInputClass: string =
  " bg-secondary-400 rounded py-1 px-2 my-2 text-secondary-900 disabled:bg-secondary-800";

// setVisibility - visibilty state of the form, passed down from the parent
// formInput & setFormInputValues - getter and setter for form input values
// columnArr - arr of column labels alongwith their type to setup form column headings
// action - form action, i.e. the url that the form will call when submited
// method - form submission method i.e. post, get, put etc.

function Form({
  setVisibility,
  setFormInputValues,
  formInput,
  columnArr,
  action = "",
  method = "",
  onSubmitHandler,
  buttonText = "Submit",
}: {
  setVisibility?: (value: React.SetStateAction<boolean>) => void;
  setFormInputValues: (value: React.SetStateAction<InputValue>) => void;
  formInput: InputValue;
  // columnArr: ColumnNames[];
  columnArr: TableData;
  action?: string;
  method?: string;
  onSubmitHandler?: () => void;
  buttonText?: string;
}): JSX.Element {
  // state to store form inputs, stores inputs from only one field
  const [formIn, setFormIn] = useState<{ label: string; value: string }>({
    label: "",
    value: "",
  });

  // handles input values from the form then sets them to the formIn state, later in useEffect its values are used to change the state of the formInput state passed down fromm the parent conmnponent
  function inputHandler(
    event:
      | React.FormEvent<HTMLInputElement>
      | React.FormEvent<HTMLSelectElement>
  ): void {
    event.preventDefault();
    setFormIn({
      label: event.currentTarget.name,
      value: event.currentTarget.value,
    });
  }

  // using useeffect to re-render the form everytime input changes, using only useState to rerender will cause the stored state to be one step behind than the actual value.
  useEffect(() => {
    // since making changes to the original object (formInput state) do not re-render the component (react uses object.is() to compare objects) making a copy of the fromInput input and then making changes to the copied object.
    const newFormInput = { ...formInput };
    newFormInput[formIn.label] = formIn.value;
    setFormInputValues(newFormInput);
    console.log(formInput, "ff");
    console.log(columnArr, "lololol");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formIn]);

  if (!columnArr) return <h1>loading</h1>;

  return (
    <div className="bg-slate-800 rounded-md border-[0.3px]  w-min text-themeWhite">
      {setVisibility ? (
        <button
          //   onClick function to hide the parent component
          onClick={() => {
            setVisibility(false);
          }}
          className=" float-right text-2xl font-bold mr-4 mt-1 text-slate-200 hover:text-themeWhite"
        >
          X
        </button>
      ) : (
        <></>
      )}

      <form
        className="px-16 py-8"
        action={action}
        method={method}
        encType="application/x-www-form-urlencoded"
        onSubmit={
          onSubmitHandler
            ? (e) => {
                e.preventDefault();
                onSubmitHandler();
              }
            : () => {}
        }
      >
        {columnArr.columns.map((val, index) => {
          // checking if the column is foriegn key or not by checking whether the column name exists in the foreign key object consisting of all the foreign keys in the table.
          // if it is a foreign key,
          if (columnArr.foreign_keys[val.column_name]) {
            return (
              <SelectElement
                columnData={val}
                foreignKeys={columnArr.foreign_keys}
                inputHandler={inputHandler}
              />
            );
          } else {
            return (
              <InputElement columnData={val} inputHandler={inputHandler} />
            );
          }
          // return (
          //   <InputElement columnData={val} inputHandler={inputHandler} />
          // <label
          //   key={val.column_name}
          //   className={`${
          //     val.column_name === "serial_number"
          //       ? " hidden"
          //       : val.column_name === "joining_date"
          //       ? " hidden"
          //       : ""
          //   }`}
          // >
          //   {val.column_name.replace("_", " ")}
          //   <input
          //     className={formInputClass}
          //     type={val.data_type}
          //     name={val.column_name}
          //     onChange={inputHandler}
          //   />
          // </label>
          // );
        })}

        <button>
          <input
            className={formInputClass}
            type="submit"
            name="item-name"
            value={buttonText}
          />
        </button>
      </form>
    </div>
  );
}

function InputElement({
  columnData,
  inputHandler,
}: {
  columnData: ColumnName;
  inputHandler: React.ChangeEventHandler<HTMLInputElement>;
}): JSX.Element {
  const colName: string = columnData.column_name;

  let labelClass: string = "";

  if (
    colName === "id" ||
    colName === "last_update" ||
    colName === "unique_id" ||
    colName === "joining_date"
  ) {
    labelClass = "hidden";
  }

  return (
    <label key={columnData.column_name} className={labelClass}>
      {columnData.column_name.replace("_", " ")}
      <input
        className={formInputClass}
        type={
          columnData.column_name === "password"
            ? "password"
            : columnData.data_type
        }
        name={columnData.column_name}
        onChange={inputHandler}
      />
    </label>
  );
}

function SelectElement({
  columnData,
  foreignKeys,
  inputHandler,
}: {
  columnData: ColumnName;
  foreignKeys: ForeignKey;
  inputHandler: React.ChangeEventHandler<HTMLSelectElement>;
}): JSX.Element {
  const tableName: string = foreignKeys[columnData.column_name].table;

  const [foreignTableData, setForeignTableData] = useState<QueryResult>();

  useEffect(() => {
    axios.get(`/api/all${tableName}`).then((res) => {
      setForeignTableData(res.data);
      console.log("noice11", tableName, res.data);
    });
  }, [tableName]);

  if (foreignTableData && foreignTableData.rowCount > 0) {
    console.log("herrerererererere", foreignTableData, tableName);
    return (
      <label className=" w-full  text-white">
        {columnData.column_name}
        <select
          onChange={inputHandler}
          name={tableName}
          className="w-full bg-slate-700 py-1 px-4 rounded-lg mt-1 mb-4 text-base text-slate-300 font-normal"
        >
          <option disabled selected hidden>
            select an option
          </option>
          {foreignTableData.rows.map((val, index) => {
            return (
              <option
                className=" bg-slate-700 hover:bg-slate-800 focus:bg-slate-800 checked:bg-slate-800"
                value={val.id}
              >
                {Object.values(val)[1]}
              </option>
            );
          })}
        </select>
      </label>
    );
  }

  return <></>;
}

export default Form;
