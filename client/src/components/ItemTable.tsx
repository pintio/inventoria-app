import React, { useEffect, useState } from "react";
import axios from "axios";

// custom table styles
import "../style/table.css";

// interfaces

import Table from "../interfaces/table.interface";
import WarehouseTable from "../interfaces/warehouse-table.interface";
import SuppliersTable from "../interfaces/supplier-table.interface";
import UsersTable from "../interfaces/user-table.interface";
import MaterialTable from "../interfaces/material-table.interface";
import { TableData } from "@backend/types/table";

function ItemTable({
  columnArr,
  tableArr,
  deleteLink,
}: {
  columnArr: TableData;
  tableArr:
    | Table[]
    | WarehouseTable[]
    | SuppliersTable[]
    | UsersTable[]
    | MaterialTable[];
  deleteLink: string;
}) {
  const [deleteId, setDeleteId] = useState<number>(NaN);

  // handler function, cahnges deleteId state, which then triggers the excecution of the useEffect function and component to rerender.
  const handleDelete = function (e: React.MouseEvent<HTMLButtonElement>): void {
    e.preventDefault();
    const id: string = e.currentTarget.getAttribute("data-id") as string;
    setDeleteId(parseInt(id));
  };

  // deleteId and deleteLink are passed as second argument, whenever changes occur to any of them, callback function to useEffect is triggered
  useEffect(() => {
    if (deleteId) {
      axios.delete(`${deleteLink}${deleteId}`);
    }
  }, [deleteId, deleteLink]);

  if (!columnArr) return <h1>Loading</h1>;

  return (
    <table className="table-auto w-full text-center">
      <thead>
        <tr>
          {columnArr.columns.map((val) => {
            if (val.column_name === "workspace_id") return <></>;
            else return <th>{val.column_name.replace("_", " ")}</th>;
          })}
          {/* an empty th column for the cross (delete button) at the end of the row */}
          {/* need an edit functionality as well, TODO */}
          <th></th>
        </tr>
      </thead>
      <tbody>
        {tableArr.map((value, index) => {
          // getting an array of values from the value object.
          // so we can use the individual items from the value objects without knowing the specific keys and put them to the table
          // TODO - implement a better method.

          // @ts-ignore
          if (value.workspace_id) {
            // @ts-ignore
            delete value["workspace_id"];
            console.log(value);
          }
          const val: string[] = Object.values(value);
          return (
            <tr className=" bg-slate-100 hover:bg-slate-200 transition-colors duration-300 ease-in-out">
              {/* maping over the array of values of the value object */}
              {/* TODO - improve naming  */}
              {/* i===0, first element of the array (first column of a row), if true, display the serial number (not the actual one from the database, but only the index to imrove readability and not confusing the users)*/}
              {/* every other column displays its original value, i.e. v */}
              {val.map((v, i) => {
                return <td>{i === 0 ? index + 1 : v}</td>;
              })}
              {/* delete button, at the end of each row. handles the delete functionality, the api/link to delete the row, i.e. the data differs for each table, is passed from the parent component */}
              {/* data-id holds the unique id from the database, used in the handleDelete function */}
              <td className="bold text-slate-800 text-xl hover:cursor-pointer hover:bg-red-600 hover:text-slate-100 transition-colors duration-300 ease-in-out">
                <button data-id={val[0].toString()} onClick={handleDelete}>
                  X
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default ItemTable;
