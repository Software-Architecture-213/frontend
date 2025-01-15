import { useEffect, useRef, useState, useCallback } from "react";
import { gameApi } from "../../../api/gameClient/gameApi";
import { PaymentRow } from "../../../types/brand";
import AdminPaymentsRow from "./AdminPaymentsRow";
import { brandApi } from "../../../api/brandClient/brandApi";

const TableHeaders = [
  // "ID",
  "ID",
  "Brand Name",
  "Amount",
  "Created At",
];

const AdminPaymentsTab = () => {
  const [payments, setPayments] = useState<PaymentRow[]>([]);
  const [PaymentsRequest, setPaymentsRequest] = useState<any>({
    pageSize: 8,
    page: null,
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
        const response = await brandApi.getAllPayments();
        const data = await response.data;
        const newPayments = data;
        console.log(newPayments)
        if (newPayments) {
          setPayments((prevPayments) => [...prevPayments, ...newPayments]);
        }
        setHasMoreData(!!data.nextPageToken); // Update hasMoreData based on nextPageToken
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        isPagination ? setIsFetchingMore(false) : setIsLoading(false);
      }
    },
    [isLoading, isFetchingMore, hasMoreData, PaymentsRequest]
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
          setPaymentsRequest((prevState: any) => ({
            ...prevState,
            page: prevState.page! + 1,
          }));
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

  const filteredPayments = payments.filter(payment =>
    (payment.brandName?.toLowerCase().includes(searchQuery.toLowerCase()) || false))

  return (
    <>
      <div className="w-full flex items-center justify-between mb-3 mt-1 pl-3">
        <div className="text-left">
          <div className="flex">
            <h3 className="text-lg font-bold text-slate-800 mr-2">Payments</h3>
            {/* <div onClick={() => setIsCreateDialogOpen(true)}>
              <PlusIcon className="w-8 h-8 p-1 rounded-full main-bg hover:bg-slate-400 text-white cursor-pointer shadow-md" />
            </div> */}
          </div>
          {/* <CreateUserDialog open={isCreateDialogOpen} setOpen={setIsCreateDialogOpen} /> */}
          <p className="text-slate-500">Overview of Payments.</p>
        </div>
        {/* Search Bar */}
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search by Brand Name,..."
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
            {isLoading && !payments.length ? (
              <tr>
                <td colSpan={TableHeaders.length} className="h-full">
                  <div className="flex justify-center items-center h-full">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 mt-3 border-gray-500 border-solid"></div>
                  </div>
                </td>
              </tr>
            ) : (
              filteredPayments.map((payment) => <AdminPaymentsRow key={payment.orderId} payment={payment} />)
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

export default AdminPaymentsTab;