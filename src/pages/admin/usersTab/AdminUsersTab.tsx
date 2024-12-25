import { useEffect, useRef, useState } from "react";
import { UserRow, UsersRequest } from "../../../types/user";
import { identityUserApi } from "../../../api/identityClient/identityUserApi";
import AdminUserRow from "./AdminUserRow";

const TableHeaders = [
  "Avatar",
  "Display Name",
  "Email",
  "Date of Birth",
  "Gender",
  "Phone",
  "Enable",
  "Actions",
];

const AdminUsersTab = () => {
  const [users, setUsers] = useState<UserRow[]>([]);
  const [usersRequest, setUsersRequest] = useState<UsersRequest>({ maxResults: 8, pageToken: null });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFetchingMore, setIsFetchingMore] = useState<boolean>(false); // New state for pagination loading
  const tableRef = useRef<HTMLDivElement | null>(null);

  const fetchData = async (isPagination = false) => {
    if (usersRequest.pageToken === "" || (isPagination && isFetchingMore)) {
      return; // Prevent fetching if there's no token or fetch is in progress
    }

    isPagination ? setIsFetchingMore(true) : setIsLoading(true);

    try {
      const response = await identityUserApi.getMany(usersRequest);
      const data = await response.data;
      const newUsers = data.data;

      setUsers((prevUsers) => [...prevUsers, ...newUsers]); // Append new users
      setUsersRequest((prevState) => ({
        ...prevState,
        pageToken: data.nextPageToken || "", // Update or clear token
      }));
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      isPagination ? setIsFetchingMore(false) : setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!tableRef.current) return;
      const tableElement = tableRef.current;
      const isAtBottom =
        tableElement.scrollHeight <= tableElement.clientHeight + tableElement.scrollTop + 1;

      if (isAtBottom && usersRequest.pageToken) {
        fetchData(true); // Trigger fetch for next page
      }
    };

    const tableElement = tableRef.current;
    if (tableElement) {
      tableElement.addEventListener("scroll", handleScroll);
      return () => {
        tableElement.removeEventListener("scroll", handleScroll);
      };
    }
  }, [usersRequest.pageToken]);

  return (
    <>
      <div className="w-full flex justify-between items-center mb-3 mt-1 pl-3">
        <div>
          <h3 className="text-lg font-bold text-slate-800">Users</h3>
          <p className="text-slate-500">Overview of users.</p>
        </div>
      </div>
      <div
        ref={tableRef}
        className="relative flex flex-col w-full h-full overflow-y-auto text-gray-700 bg-white shadow-md rounded-lg bg-clip-border"
      >
        <table className="w-full text-left table-auto min-w-max">
          <thead>
            <tr>
              {TableHeaders.map((header, index) => (
                <th key={index} className="p-4 border-b border-slate-300 bg-slate-50 sticky top-0 z-10">
                  <p className="block text-sm font-normal leading-none text-slate-500">{header}</p>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading && !users.length ? (
              <tr>
                <td colSpan={TableHeaders.length} className="h-full">
                  <div className="flex justify-center items-center h-full">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 mt-3 border-gray-500 border-solid"></div>
                  </div>
                </td>
              </tr>
            ) : (
              users.map((user) => <AdminUserRow key={user.userId} user={user} />)
            )}
            {isFetchingMore && (
              <tr>
                <td colSpan={TableHeaders.length} className="h-full">
                  <div className="flex justify-center items-center h-full">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-4 mt-3 border-gray-500 border-solid"></div>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AdminUsersTab;
