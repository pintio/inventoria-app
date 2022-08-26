import React, { useEffect, useState } from "react";
import axios from "axios";

import Layout from "../components/Layout";

import ItemTable from "../components/ItemTable";

import Form from "../components/Form";

import PopUp from "../components/PopUp";

// interfaces
import ColumnNames from "../interfaces/column-names-state.interface";
import InputValue from "../interfaces/input-value-object.interface";
import WarehouseTable from "../interfaces/warehouse-table.interface";
import { TableData } from "@backend/types/table";

const WarehousesPage = function (): JSX.Element {
  const [formVisibility, setFormVisibility] = useState<boolean>(false);
  const [formInput, setFormInput] = useState<InputValue>({});
  const [columnNames, setColumnNames] = useState<TableData>();
  const [tableData, setTableData] = useState<WarehouseTable[]>([]);

  useEffect(() => {
    axios.get("/api/warehousedata").then((res) => {
      setColumnNames(res.data);
      console.log(res.data);
    });

    axios.get("/api/allwarehouses").then((res) => {
      setTableData(res.data);
    });
  }, []);

  return (
    <Layout>
      <div className="my-6 flex justify-between bg-slate-50">
        <h1 className="text-3xl text-themeBlack font-medium">
          Inventory
          <span className="text-5xl text-themeBlackLight font-light">
            Item List
          </span>
        </h1>
        <button
          onClick={() => {
            setFormVisibility(true);
          }}
          className="border rounded bg-primary hover:bg-primaryDark px-4 text-themeWhite"
        >
          Add Warehouse
        </button>
      </div>

      <PopUp visibility={formVisibility}>
        <Form
          setVisibility={setFormVisibility}
          setFormInputValues={setFormInput}
          formInput={formInput}
          columnArr={columnNames as TableData}
          action={`/api/add/warehouse/${formInput.warehouse_name}`}
          method="post"
        />
      </PopUp>

      {/* <ItemTable
        columnArr={columnNames}
        tableArr={tableData}
        deleteLink={"/api/delete/warehouse/"}
      /> */}
    </Layout>
  );
};

export default WarehousesPage;
