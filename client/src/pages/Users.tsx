import React, { useEffect, useState } from "react";
import axios from "axios";

import Layout from "../components/Layout";

import ItemTable from "../components/ItemTable";

import Form from "../components/Form";

import PopUp from "../components/PopUp";

// interfaces
import ColumnNames from "../interfaces/column-names-state.interface";
import InputValue from "../interfaces/input-value-object.interface";
import UsersTable from "../interfaces/user-table.interface";

const UsersPage = function (): JSX.Element {
  const [formVisibility, setFormVisibility] = useState<boolean>(false);
  const [formInput, setFormInput] = useState<InputValue>({});
  const [columnNames, setColumnNames] = useState<ColumnNames[]>([]);
  const [tableData, setTableData] = useState<UsersTable[]>([]);

  useEffect(() => {
    axios.get("/api/get/userColumnNames").then((res) => {
      setColumnNames(res.data);
    });

    axios.get("api/get/allUsers").then((res) => {
      setTableData(res.data);
    });
  });

  useEffect(() => {
    console.log(formInput);
  }, [formInput, formVisibility]);

  return (
    <Layout>
      <div className="my-6 flex justify-between bg-slate-50">
        <h1 className="text-3xl text-themeBlack font-medium">
          Inventory
          <span className="text-5xl text-themeBlackLight font-light">
            Users List
          </span>
        </h1>
        <button
          onClick={() => {
            setFormVisibility(true);
          }}
          className="border rounded bg-primary hover:bg-primaryDark px-4 text-themeWhite"
        >
          Add User
        </button>
      </div>

      {/* <PopUp visibility={formVisibility}>
        <Form
          setVisibility={setFormVisibility}
          setFormInputValues={setFormInput}
          formInput={formInput}
          columnArr={columnNames}
          action={`/api/add/user/${formInput.user_name}&${formInput.full_name}&${formInput.position}`}
          method="post"
        />
      </PopUp> */}

      {/* <ItemTable
        columnArr={columnNames}
        tableArr={tableData}
        deleteLink={"/api/delete/user/"}
      /> */}
    </Layout>
  );
};

export default UsersPage;
