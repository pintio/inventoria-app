import React, { useEffect, useState } from "react";
import axios from "axios";

import Layout from "../components/Layout";

import ItemTable from "../components/ItemTable";

import Form from "../components/Form";

import PopUp from "../components/PopUp";

// interfaces

import { TableData } from "@backend/types/table";
import InputValue from "../interfaces/input-value-object.interface";
import Table from "../interfaces/table.interface";

const CategoryPage = function (): JSX.Element {
  const [formVisibility, setFormVisibility] = useState<boolean>(false);
  const [formInput, setFormInput] = useState<InputValue>({});
  const [columnNames, setColumnNames] = useState<TableData>();
  const [tableData, setTableData] = useState<Table[]>([]);

  useEffect(() => {
    axios
      .get("/api/categoriesdata")
      .then((res) => {
        setColumnNames(res.data);
        console.log(res.data, "category columns");
      })
      .catch(() => (window.location = "/" as string & Location));

    axios
      .get("/api/allcategories")
      .then((res) => {
        setTableData(res.data);
        console.log(res.data, "alll table");
      })
      .catch(() => (window.location = "/" as string & Location));
  }, []);

  return (
    <Layout>
      <div className="my-6 flex justify-between bg-slate-50">
        <h1 className="text-3xl text-themeBlack font-medium">
          Inventory
          <span className="text-5xl text-themeBlackLight font-light">
            Category List
          </span>
        </h1>
        <button
          onClick={() => {
            setFormVisibility(true);
          }}
          className="border rounded bg-primary hover:bg-primaryDark px-4 text-themeWhite"
        >
          Add Category
        </button>
      </div>

      <PopUp visibility={formVisibility}>
        <Form
          setVisibility={setFormVisibility}
          setFormInputValues={setFormInput}
          formInput={formInput}
          columnArr={columnNames as TableData}
          action={`/api/category/${formInput.category_name}`}
          method="post"
        />
      </PopUp>

      <ItemTable
        columnArr={columnNames as TableData}
        tableArr={tableData}
        deleteLink={"/api/category/"}
      />
    </Layout>
  );
};

export default CategoryPage;
