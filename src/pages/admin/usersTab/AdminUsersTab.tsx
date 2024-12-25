import { useEffect, useRef, useState } from "react";
import { UserRow, UsersRequest } from "../../../types/user";
import { identityUserApi } from "../../../api/identityClient/identityUserApi";
import AdminUserRow from "./AdminUserRow";

const TableHeaders = [,
  "Display Name",
  "Email",
  "Date of Birth",
  "Gender",
  "Phone",
  "Enable",
  "Actions",
]



// pages/admin/AccountsTab.tsx
const AdminUsersTab = () => {

  const [users, setUsers] = useState<UserRow[]>([])
  const [usersRequest, setUsersRequest] = useState<UsersRequest>({ maxResults: 8, pageToken: null })
  const [isLoading, setIsLoading] = useState<boolean>(false); // Add Isloading state
  const tableRef = useRef<HTMLTableSectionElement | null>(null)
  const fetchData = async () => {
    setIsLoading(true); // Set Isloading to true when starting the request
    try {
      const response = await identityUserApi.getMany(usersRequest);
      const data = await response.data;
      const users = data.data;
      console.log(data)
      setUsers((prevUsers) => [...prevUsers, ...users]); 
      setUsersRequest((prevState) => ({
        ...prevState,
        pageToken: data.nextPageToken, // Update pageToken for pagination
      }));
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false); // Set Isloading to false when the request is complete
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // Detect scroll and fetch data when reaching the bottom
    const handleScroll = () => {
      if (!tableRef.current) return;
      const tableElement = tableRef.current;
      const isAtBottom =
        tableElement.scrollHeight  ==
        tableElement.clientHeight + tableElement.scrollTop + 1;
      console.log(tableElement.scrollHeight);
      console.log(tableElement.scrollTop +  tableElement.clientHeight);
      if (isAtBottom) {
        fetchData();
      }
    };
    const tbodyElement = tableRef.current;
    if (tbodyElement) {
      tbodyElement.addEventListener("scroll", handleScroll);
      return () => {
        tbodyElement.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  

  return (
    <>
      <div className="w-full flex justify-between items-center mb-3 mt-1 pl-3">
        <div>
          <h3 className="text-lg font-bold text-slate-800">Users</h3>
          <p className="text-slate-500">Overview of users.</p>
        </div>
        <div className="ml-3">
          <div className="w-full max-w-sm min-w-[200px] relative">
            <div className="relative">
              <input
                className="bg-white w-full pr-11 h-10 pl-3 py-2 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
                placeholder="Search for invoice..."
              />
              <button
                className="absolute h-8 w-8 right-1 top-1 my-auto px-2 flex items-center bg-white rounded "
                type="button"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" className="w-8 h-8 text-slate-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div ref={tableRef} className="relative flex flex-col w-full h-full overflow-y-auto text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
        <table className="w-full text-left table-auto min-w-max">
          <thead>
            <tr>
              {TableHeaders.map((header, index) =>
                <th key={index} className="p-4 border-b border-slate-300 bg-slate-50 sticky top-0 z-10">
                  <p className="block text-sm font-normal leading-none text-slate-500">
                    {header}
                  </p>
                </th>
              )}
            </tr>
          </thead>
          <tbody  className="">
            {isLoading ? (
              <tr>
                <td colSpan={TableHeaders.length} className="h-full">
                  <div className="flex justify-center items-center h-full">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 mt-3 border-gray-500 border-solid"></div>
                  </div>
                </td>
              </tr>
            ) : users.map(user => <AdminUserRow key={user.userId} user={user} />)}
          </tbody>
        </table>
      </div>


    </>
  )
};

export default AdminUsersTab;
