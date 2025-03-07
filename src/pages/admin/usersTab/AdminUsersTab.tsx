import { useEffect, useRef, useState, useCallback } from "react";
import { UserRow, UsersRequest } from "../../../types/user";
import { identityUserApi } from "../../../api/identityClient/identityUserApi";
import AdminUserRow from "./AdminUserRow";
import { PlusIcon } from "@heroicons/react/20/solid";
import CreateUserDialog from "./CreateUserDialog";

const TableHeaders = [
  // "ID",
  "Avatar",
  "Display Name",
  "Email",
  "Date of Birth",
  "Gender",
  "Phone",
  "Last Sign In",
  "Disabled",
  "Action",
];

const AdminUsersTab = () => {
  const [users, setUsers] = useState<UserRow[]>([]);
  const [usersRequest, setUsersRequest] = useState<UsersRequest>({
    maxResults: 8,
    pageToken: null,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFetchingMore, setIsFetchingMore] = useState<boolean>(false);
  const [hasMoreData, setHasMoreData] = useState<boolean>(true);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false); // Mod
  const [searchQuery, setSearchQuery] = useState<string>('');
  const tableRef = useRef<HTMLDivElement | null>(null);


  const fetchData = useCallback(
    async (isPagination = false) => {
      if (isLoading || isFetchingMore || !hasMoreData) return;

      isPagination ? setIsFetchingMore(true) : setIsLoading(true);
      try {
        const response = await identityUserApi.getMany(usersRequest);
        const data = await response.data;
        const newUsers = data.data;

        setUsers((prevUsers) => [...prevUsers, ...newUsers]);
        setUsersRequest((prevState) => ({
          ...prevState,
          pageToken: data.nextPageToken || "",
        }));
        setHasMoreData(!!data.nextPageToken); // Update hasMoreData based on nextPageToken
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        isPagination ? setIsFetchingMore(false) : setIsLoading(false);
      }
    },
    [isLoading, isFetchingMore, hasMoreData, usersRequest]
  );

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!tableRef.current || isLoading || isFetchingMore || !hasMoreData) return;
      const tableElement = tableRef.current;
      const isAtBottom =
        tableElement.scrollHeight <= tableElement.clientHeight + tableElement.scrollTop + 1;

      if (isAtBottom) {
        fetchData(true); // Trigger pagination fetch
      }
    };

    const tableElement = tableRef.current;
    if (tableElement) {
      tableElement.addEventListener("scroll", handleScroll);
      return () => {
        tableElement.removeEventListener("scroll", handleScroll);
      };
    }
  }, [fetchData, isLoading, isFetchingMore, hasMoreData]);

  const filteredUsers = users.filter(user =>
    (user.displayName?.toLowerCase().includes(searchQuery.toLowerCase()) || false) ||
    (user.email?.toLowerCase().includes(searchQuery.toLowerCase()) || false) ||
    (user.phoneNumber?.toLowerCase().includes(searchQuery.toLowerCase()) || false)
  );

  return (
    <>
      <div className="w-full flex items-center justify-between mb-3 mt-1 pl-3">
        <div className="text-left">
          <div className="flex">
            <h3 className="text-lg font-bold text-slate-800 mr-2">Users</h3>
            <div onClick={() => setIsCreateDialogOpen(true)}>
              <PlusIcon className="w-8 h-8 p-1 rounded-full main-bg hover:bg-slate-400 text-white cursor-pointer shadow-md" />
            </div>
          </div>
          <CreateUserDialog open={isCreateDialogOpen} setOpen={setIsCreateDialogOpen} />
          <p className="text-slate-500">Overview of users.</p>
        </div>
        {/* Search Bar */}
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search by Display Name, Email, Phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-64 p-2 bg-white border border-slate-300 rounded-md text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-200"
          />
        </div>
      </div>
      <div
        ref={tableRef}
        className="relative flex flex-col h-full w-full overflow-y-auto custom-scrollbar text-gray-700 bg-white shadow-md rounded-lg bg-clip-border"
      >
        <table style={{ zIndex: 0 }} className="w-full text-left table-auto min-w-max">
          <thead className="">
            <tr>
              {TableHeaders.map((header, index) => (
                <th
                  key={index}
                  className="p-4 border-b border-slate-300 bg-slate-50 sticky top-0 z-10"
                >
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
              filteredUsers.map((user) => <AdminUserRow key={user.userId} user={user} />)
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
