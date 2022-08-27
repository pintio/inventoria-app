import React, { useEffect, useState } from "react";
import axios from "axios";

import Layout from "../components/Layout";

import ItemTable from "../components/ItemTable";

import Form from "../components/Form";

import PopUp from "../components/PopUp";

// interfaces
import InputValue from "../interfaces/input-value-object.interface";
import MaterialTable from "../interfaces/material-table.interface";
import { TableData } from "@backend/types/table";

const StockPage = function (): JSX.Element {
  const [formVisibility, setFormVisibility] = useState<boolean>(false);
  const [formInput, setFormInput] = useState<InputValue>({});
  const [columnNames, setColumnNames] = useState<TableData>();
  const [tableData, setTableData] = useState<MaterialTable[]>([]);

  useEffect(() => {
    axios.get("/api/materialdata").then((res) => {
      setColumnNames(res.data);
      console.log(res.data, "success");
    });

    // axios.get("api/get/allMaterials").then(async (res) => {
    //   const materialArr = res.data;

    // await materialArr.forEach(async (material: MaterialTable) => {
    //   let mat = { ...material };
    //   console.log(material, "lolmat");
    //   const category = axios
    //     .get(`api/get/category/${material.category_id}`)
    //     .then((res) => {
    //       // mat.category_id = res.data[0].category_name;
    //       return res.data[0].category_name;
    //     });

    //   const warehouse = axios
    //     .get(`api/get/warehouse/${material.warehouse_id}`)
    //     .then((res) => {
    //       return res.data[0].warehouse_name;
    //     });

    //   const supplier = axios
    //     .get(`api/get/supplier/${material.supplier_id}`)
    //     .then((res) => {
    //       console.log(res.data, "data");
    //       return res.data[0].supplier_name;
    //     });

    //   const reciever = axios
    //     .get(`api/get/user/${material.received_by}`)
    //     .then((res) => {
    //       return res.data[0].user_name;
    //     });

    //   return Promise.all([category, warehouse, supplier, reciever])
    //     .then((values) => {
    //       [
    //         mat.category_id,
    //         mat.warehouse_id,
    //         mat.supplier_id,
    //         mat.received_by,
    //       ] = values;
    //       console.log(values, "values");
    //     })
    //     .then(() => {
    //       const newMaterial = [...tableData];

    //       if (newMaterial.indexOf(mat) === -1) {
    //         newMaterial.push(mat);
    //       }
    //       setTableData(newMaterial);
    //       console.log(mat, "loop material");
    //     });
    // });
    // });

    // const categoryData = axios.get("api/get/allCategories").then((res) => {
    //   return res.data;
    // });

    // const suppliersData = axios.get("api/get/allSuppliers").then((res) => {
    //   return res.data;
    // });

    // const warehouseData = axios.get("api/get/allWarehouses").then((res) => {
    //   return res.data;
    // });

    // const userData = axios.get("api/get/allUsers").then((res) => {
    //   return res.data;
    // });

    // Promise.all([categoryData, suppliersData, warehouseData, userData])
    //   .then((values) => {
    //     setFormData({
    //       category: values[0],
    //       supplier: values[1],
    //       warehouse: values[2],
    //       user: values[3],
    //     });
    //   })
    //   .then(() => console.log(formData, "form data"));

    // console.log(formInput, "input from form fields");
  }, []);

  if (!columnNames) return <h1>lolololol</h1>;

  return (
    <Layout>
      <div className="my-6 flex justify-between bg-slate-50">
        <h1 className="text-3xl text-themeBlack font-medium">
          Inventory
          <span className="text-5xl text-themeBlackLight font-light">
            Stock
          </span>
        </h1>
        <button
          onClick={() => {
            setFormVisibility(true);
          }}
          className="border rounded bg-primary hover:bg-primaryDark px-4 text-themeWhite"
        >
          Add Material
        </button>
      </div>

      <PopUp visibility={formVisibility}>
        {/* TODO impl. onsubmit function */}
        <Form
          setVisibility={setFormVisibility}
          setFormInputValues={setFormInput}
          formInput={formInput}
          columnArr={columnNames as unknown as TableData}
        />
      </PopUp>

      <ItemTable
        columnArr={columnNames}
        tableArr={tableData}
        deleteLink={"/api/delete/material/"}
      />
    </Layout>
  );
};

export default StockPage;
