import axios from "axios";
import React, { useState, useEffect } from "react";

// components
import Form from "../components/Form";

// interfaces
import InputValue from "../interfaces/input-value-object.interface";

// svg
import WelcomeSvg from "../components/svg/Welcome";
import { TableData } from "@backend/types/table";

// TODO implement signup stages. emaild + password are submitted to the auth.users tables in supabase, supabase returns an uuid in response,
// in the next step user details, see user table or user router for example. the uuid is also submitted in this form alongwith other information.

// TODO make the signup button (if successfull) redirect to the company setup page.

function RegisterPage(): JSX.Element {
  // input values, o/p frm the Form component
  const [formInputValues, setFormInputValues] = useState<InputValue>({});

  // columnArr, fetched from the server
  const [columnArr, setColumnArr] = useState<TableData>();

  // form submission status code.
  const [statusCode, setStatusCode] = useState<number>(NaN);

  useEffect(() => {
    axios.get("/auth/authdata").then((res) => setColumnArr(res.data));
  }, []);

  return (
    <main className="w-screen h-screen grid grid-cols-2 items-center justify-items-center">
      <div className=" ">
        <WelcomeSvg />
      </div>
      <div>
        <div>
          <Form
            setFormInputValues={setFormInputValues}
            formInput={formInputValues}
            columnArr={columnArr as TableData}
            method=""
            action=""
            buttonText="Register"
            onSubmitHandler={() => {
              axios({
                method: "post",
                url: "/auth/signup",
                data: formInputValues,
              }).then((res) => {
                setStatusCode(res.status);
                if (res.status === 200) {
                  window.location =
                    `/profile-setup/${res.data.email}/${res.data.uuid}` as string &
                      Location;
                }
              });
            }}
          />
        </div>
        <div>
          {isNaN(statusCode) ? (
            <></>
          ) : statusCode === 200 ? (
            <h2 className=" text-md font-semibold text-green-600">
              Signedup : successful
            </h2>
          ) : (
            <h2 className=" text-md font-semibold text-red-600">
              Signedup : failed
            </h2>
          )}
        </div>
      </div>
    </main>
  );
}

export default RegisterPage;
