import { useState, useEffect, useMemo } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Colors
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Spinner, CustomDatePicker, Title as CustomTitle, Empty } from '../../../../components';
import { brandApi } from '../../../../api/brandClient/brandApi';
import { IChartData } from '../../../../types/brand';
import { useAuth } from '../../../../hooks/AuthContext';
import { dateToYYYYMMdd } from '../../../../utils';
import { toast, ToastContainer } from "react-toastify";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Colors,
);

const currentDate = new Date();
const initialStartDate = new Date();
initialStartDate.setDate(currentDate.getDate() - 7);

export function VoucherStatisticChart() {
    const { profile } = useAuth();
    const brandId = useMemo(() => profile?.id, [profile]);

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<IChartData | null>(null);
    const [startDate, setStartDate] = useState<Date | null>(initialStartDate);
    const [endDate, setEndDate] = useState<Date | null>(currentDate);

    const fetchData = async () => {
        try {
            const response = await brandApi.getVoucherStatisticBrand(brandId, dateToYYYYMMdd(startDate!), dateToYYYYMMdd(endDate!));
            const fetchedData = response.data.data;
            const voucherLabels: string[] = [];
            const voucherDataset: number[] = [];
            for (let i = 0; i < fetchedData.length; i++) {
                voucherLabels.push(fetchedData[i].id);
                voucherDataset.push(fetchedData[i].voucherCount);
            }
            setData({
                labels: voucherLabels,
                datasets: [
                    {
                        label: 'Number of voucher created',
                        data: voucherDataset,
                        borderWidth: 1,
                    },
                ],
            });
        }
        catch (error) {
            console.error('--> Failed to fetch brand statistic: ', error);
            toast.error(`Failed to fetch brand statistic: ${error}`);
        }
    }

    useEffect(() => {
        if (startDate && endDate) {
            setLoading(true);
            fetchData();
            setLoading(false);
        }
    }, [startDate, endDate]);

    const renderDatePicker = () => {
        return (
            <div className='flex justify-center space-x-10'>
                <CustomDatePicker
                    value={startDate}
                    title='Start date'
                    placeholder='Choose start date'
                    onChange={(date) => setStartDate(date)}
                    minDate={null}
                    maxDate={endDate}
                />
                <CustomDatePicker
                    value={endDate}
                    title='End date'
                    placeholder='Choose end date'
                    onChange={(date) => setEndDate(date)}
                    minDate={startDate}
                    maxDate={null}
                />
            </div>
        );
    }

    const renderChart = () => {
        let content = null;
        if (data) {
            content = <Line
                data={data}
                className='w-full h-96'
                options={{
                    scales: {
                        y: {
                            beginAtZero: true,
                        },
                    },
                }}
            />
        }
        else{
            content = <Empty />
        }
        return content
    }

    return (
        <div className='w-full space-y-4'>
            <CustomTitle text='Voucher statistic' />
            {renderDatePicker()}
            {loading ? <Spinner /> : renderChart()}
            <ToastContainer />
        </div>
    );
}
