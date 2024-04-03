"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import TableContract from "@/components/Tables/TableContract";
import TableUsers from "@/components/Tables/TableUsers";
import Link from "next/link";

const Users = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Data User" />

      <div className="flex flex-col gap-5">
        <div className="flex justify-end">
            <Link
              href="/users/add-users"
              className="inline-flex items-center justify-center rounded-md bg-primary px-10 py-3 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
            >
              Add Member
            </Link>        
          </div>
        <TableUsers />
        <TableContract />
      </div>
    </DefaultLayout>
  );
};

export default Users;
