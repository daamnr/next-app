"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Bank from "@/components/SelectGroup/Bank";
import Pajak from "@/components/SelectGroup/Pajak";
import Gender from "@/components/SelectGroup/Gender";
import Status from "@/components/SelectGroup/Status";
import { useEffect, useState } from "react";
import Posisi from "@/components/SelectGroup/Posisi";
import Kontrak from "@/components/SelectGroup/Kontrak";
import EditableTable from "@/components/Tables/EditableTable";



const User = ({params}: any) => {
const [userData, setUserData] = useState<any>({})
const [userContract, setUserContract] = useState<any>({})
const [newContractData, setNewContractData] = useState<any>({});

const getUserById = async () => {
    try {
      const response = await fetch(`http://localhost:3001/users/${params.id}`);
      const data = await response.json();
       setUserData(data);
    } catch (error) {
      console.error("Error fetching user by ID:", error);
    }
  };

const handleNewContractSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Send POST request to create a new contract
      const response = await fetch("http://localhost:3001/contract", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user_id: params.id,
          kontraks: [newContractData]
        })
      });
      const data = await response.json();
      console.log("Contract added:", data);
      setUserContract([...userContract, data]);
      setNewContractData({});
    } catch (error) {
      console.error("Error adding contract:", error);
    }
  };

  const handleInputChange = (fieldName: string) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target;
    setUserData({ ...userData, [fieldName]: value });
  };

  useEffect(() => {
    getUserById()
  },[])

  const handleUserDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleNewContractChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setNewContractData({ ...newContractData, [name]: value });
  };

  const handleBPJSChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setNewContractData({ ...newContractData, [name]: checked });
  };


  return (
    <DefaultLayout>
      <Breadcrumb pageName={`Data User ${userData.name}`} />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Profile
              </h3>
            </div>
            <form>
              <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Nama <span className="text-meta-1">*</span>
                    </label>
                    <input
                      value={userData.name}
                      type="text"
                      placeholder="Enter your name"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                       onChange={handleInputChange("name")}
                    />
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Email <span className="text-meta-1">*</span>
                    </label>
                    <input
                      type="text"
                      value={userData.email}
                      placeholder="Enter your email address"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      onChange={handleUserDataChange}
                    />
                  </div>
                </div>
                
                 <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Username <span className="text-meta-1">*</span>
                    </label>
                    <input
                      value={userData.username}
                      type="text"
                      placeholder="Enter your username"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      onChange={handleUserDataChange}
                    />
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Phone <span className="text-meta-1">*</span>
                    </label>
                    <input
                      value={userData.phone}
                      type="text"
                      placeholder="Enter your phone"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      onChange={handleUserDataChange}
                    />
                  </div>
                </div>
                

                 <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    {/* Gender */}
                   <Gender setGender={setUserData} gender={userData}/>
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Tempat Lahir
                    </label>
                    <input
                    value={userData.tempat_lahir}
                      type="text"
                      placeholder="New York"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>

                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Tanggal Lahir
                    </label>
                    <input
                      value={userData.tanggal_lahir}
                      type="date"
                      placeholder="New York"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                   
                  </div>

                  <div className="w-full xl:w-1/2">
                    {/* Bank */}
                    <Bank setBank={setUserData} bank={userData}/> 
                  </div>
                </div>

                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      No Rekening
                    </label>
                    <input
                    value={userData.no_rekening}
                      type="text"
                      placeholder="12234567"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                       onChange={handleUserDataChange}             
                    />
                   
                  </div>

                  <div className="w-full xl:w-1/2">
                    {/* Status */}
                    <Status setStatus={setUserData} status={userData}/>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Alamat
                  </label>
                  <textarea
                    value={userData.alamat}
                    rows={6}
                    placeholder="New York Street 2"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  ></textarea>
                </div>
              
                <div className="flex justify-end gap-4.5">
                    <button
                      className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
                      type="submit"
                    >
                      Save
                    </button>
                </div>
              </div>
            </form>
          </div>      
        </div>  
        <div className="flex flex-col gap-9">
          {/* <!-- Contract Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark flex justify-between items-center">
              <h3 className="font-medium text-black dark:text-white">
                Kontrak
              </h3>
            </div>
            <form onSubmit={handleNewContractSubmit}>
              <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Masa Berlaku
                    </label>
                    <input
                      type="date"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      onChange={handleNewContractChange}
                    />
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                     Sampai Dengan
                    </label>
                    <input
                      type="date"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      onChange={handleNewContractChange}
                    />
                  </div>
                </div>
                 <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-full">
                   <Pajak setPajak={setUserContract} pajak={userContract}/>
                  </div>
                </div>

               <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-full">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Golongan BPJS
                  </label>
                  <div className="flex gap-5 mb-5">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        placeholder="New York"
                        className="rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        onChange={handleBPJSChange}
                      />
                      <span>Ketenagakerjaan</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        placeholder="New York"
                        className="rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        onChange={handleBPJSChange}
                      />
                      <span>Kesehatan</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        placeholder="New York"
                        className="rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        onChange={handleBPJSChange}
                      />
                      <span>Askes</span>
                    </label>
                  </div>
                </div>
              </div>

                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-full">
                    <Posisi setPosisi={setUserContract} posisi={userContract}/>
                  </div>
                </div>

                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Cuti Pertahun
                    </label>
                    <input
                      type="number"
                      placeholder="5"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                       onChange={handleNewContractChange}
                    />
                  </div>

                  <div className="w-full xl:w-1/2">
                    <Kontrak setKontrak={setUserContract} kontrak={userContract}/>
                  </div>
                </div>

                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-full">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Minim jam perbulan
                    </label>
                    <input
                      type="number"
                      placeholder="10"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      onChange={handleNewContractChange}
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Catatan
                  </label>
                  <textarea
                    rows={6}
                    placeholder="Tulis catatan disini"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  ></textarea>
                </div>
                <div className="flex justify-end gap-4.5 mt-4">
                    <button
                      className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
                      type="submit"
                    >
                      Save
                    </button>
                </div>
              </div>
            </form>
          </div>      
        </div>  
      </div>
    </DefaultLayout>
  );
};

export default User;
