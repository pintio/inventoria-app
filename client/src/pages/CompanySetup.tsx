import React, { FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/navigation/Header";

// SVG
import UploadSvg from "../components/svg/Upload";

function CompanySetup() {
  return (
    <main className="w-screen h-full my-8">
      <Header />
      <div className="mx-auto w-full max-w-lg text-center">
        <h1 className="text-4xl font-light  text-secondary-600 mb-12">
          Profile Details
        </h1>
        <Form />
      </div>
    </main>
  );
}

function Form() {
  const inputClass =
    "appearance-none block w-full bg-slate-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:text-secondary-700 focus:border-gray-500";

  const { email } = useParams();
  const { uuid } = useParams();
  // console.log(email, uuid, "params");

  const [logoImage, setLogoImage] = useState<string>("");

  const imageChangeHandler = function (event: FormEvent<HTMLInputElement>) {
    if (event.currentTarget.files && event.currentTarget.files[0]) {
      console.log(event.currentTarget.files[0], "image here");
      const imageUrl = URL.createObjectURL(event.currentTarget.files[0]);
      console.log(imageUrl, "url here");
      setLogoImage(imageUrl);
    }
  };

  return (
    <form
      className=""
      method="post"
      action={`/api/add/user/${email}&${uuid}`}
      encType="multipart/form-data"
      id="profile-form"
      // onSubmit={formSubmissionHandler}
    >
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="full-name"
          >
            Full Name
          </label>
          <input
            className={inputClass}
            name="fullname"
            id="full-name"
            type="text"
            placeholder="Rohit  Sharma"
          />
          {/* <p className="text-red-500 text-xs italic">
            Please fill out this field.
          </p> */}
        </div>
        <div className="w-full md:w-1/2 px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="last-name"
          >
            Position
          </label>
          <input
            className="appearance-none block w-full bg-slate-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:text-secondary-700 focus:border-gray-500"
            id="position"
            type="text"
            placeholder="Manager"
            name="position"
          />
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="company-name"
          >
            Company Name
          </label>
          <input
            className={inputClass}
            id="company-name"
            type="text"
            placeholder="ABC Pvt Ltd"
            name="companyname"
          />
        </div>
      </div>

      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="company-address"
          >
            Company Address
          </label>
          <input
            className={inputClass}
            id="company-address"
            type="text"
            placeholder="building, landmark, street, city"
            name="address"
          />
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <p className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Logo
          </p>
          <label
            htmlFor="logo-input"
            className="flex gap-4 items-center justify-center w-full py-3 rounded bg-slate-200 text-secondary-700 font-semibold hover:cursor-pointer hover:bg-slate-50 hover:border hover:text-secondary-800 transform hover:-translate-y-1 transition-all duration-300 hover:shadow-lg hover:border-gray-500"
          >
            <UploadSvg />
            Click here to upload
          </label>
          <input
            // className="block w-full py-2 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 "
            className="hidden"
            id="logo-input"
            type="file"
            placeholder=""
            onChange={imageChangeHandler}
            name="logo"
          />
          <input
            name="logo-image"
            value={logoImage}
            type="text"
            className="hidden"
          />
        </div>
      </div>
      <button>
        <input
          className="mt-8 px-6 py-3 hover:cursor-pointer rounded-md text-slate-100 text-xl bg-zinc-700 hover:bg-secondary-700 transform hover:-translate-y-2 transition-all duration-300"
          type="submit"
          name="item-name"
          value="submit"
          // onSubmit={submiHandler}
        />
      </button>
    </form>
  );
}

export default CompanySetup;
