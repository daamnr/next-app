import { useState, useEffect } from "react";
import Link from "next/link";
import { Contract, Kontrak } from "@/types/contract";
import { User } from "@/types/user";
import { findUserById } from "@/types/utils";

const TableContract = () => {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  const getContracts = async () => {
    try {
      const contractData = await fetch('http://localhost:3001/contract');
      const userData = await fetch('http://localhost:3001/users');

      const contractResponse = await contractData.json();
      const userResponse = await userData.json();

      setContracts(contractResponse);   
      setUsers(userResponse);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getContracts();
  }, []);

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                Pegawai
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                Tanggal Kontrak
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                Sisa Kontrak
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                Posisi
              </th>
               <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                Total Benefit
              </th>
            </tr>
          </thead>
          <tbody>
            {contracts.map((contract, key) => {
              const user = findUserById(users, contract.user_id);
              const start = new Date(contract.kontraks[0].masa_berlaku_start);
              const end = new Date(contract.kontraks[0].masa_berlaku_end);
              const diffTime = Math.abs(end.getTime() - start.getTime());
              const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
              const bulan = Math.floor(diffDays / 30);
              const hari = diffDays % 30;
              const duration = `${bulan} bulan ${hari} hari`;

              return (
                <tr key={key}>
                  <td className="border-b border-[#eee] py-5 pl-9 dark:border-strokedark">
                    <h5 className="font-medium text-black dark:text-white">
                      {user ? user.name : 'Unknown'}
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <h5 className="font-medium text-black dark:text-white">
                      {contract.kontraks[0].masa_berlaku_start}
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <h5 className="font-medium text-black dark:text-white">
                      {duration}
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <h5 className="font-medium text-black dark:text-white">
                      {contract.kontraks[0].posisi}
                    </h5>
                  </td>
                   <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <h5 className="font-medium text-black dark:text-white">
                       Rp.{contract.kontraks[0].pendapatans[0].nominal.toLocaleString()}
                    </h5>
                  </td>     
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableContract;
