import { useState, useEffect } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Spinner, CustomDatePicker, Title as CustomTitle } from '../../../../components';
import { getRandomColorArray } from '../../../../utils';
import { brandApi } from '../../../../api/brandClient/brandApi';
import { IChartData } from '../../../../types/brand';
import { dateToYYYYMMdd } from '../../../../utils';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const currentDate = new Date();
const initialStartDate = new Date();
initialStartDate.setDate(currentDate.getDate() - 7);

export function BrandStatisticChart() {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<IChartData | null>(null);
    const [startDate, setStartDate] = useState<Date | null>(initialStartDate);
    const [endDate, setEndDate] = useState<Date | null>(currentDate);

    const fetchData = async () => {
        try {
            const response = await brandApi.getBrandStatisticAdmin(dateToYYYYMMdd(startDate!), dateToYYYYMMdd(endDate!));
            const fetchedData = response.data.data;
            let brandLabels: string[] = [];
            let brandDataset: number[] = [];
            for (let i = 0; i < fetchedData.length; i++) {
                brandLabels.push(fetchedData[i].id);
                brandDataset.push(fetchedData[i].brandCount);
            }
            setData({
                labels: brandLabels,
                datasets: [
                    {
                        label: 'Number of brands created',
                        data: brandDataset,
                        backgroundColor: getRandomColorArray(1),
                        borderWidth: 1,
                    },
                ],
            });
        }
        catch (error) {
            console.error('--> Failed to fetch brand statistic: ', error);
        }
    }

    useEffect(() => {
        if (startDate && endDate) {
            setLoading(true);
            fetchData();
            setLoading(false);
        }
    }, [startDate, endDate]);

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
        return content
    }

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

    return (
        <div className='w-full space-y-4'>
            <CustomTitle text='Brand statistic' />
            {renderDatePicker()}
            {loading ? <Spinner /> : renderChart()}
        </div>
    );
}
