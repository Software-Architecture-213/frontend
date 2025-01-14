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
    Colors
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Spinner, CustomDatePicker, Title as CustomTitle, CustomSelect, ISelectItem, Empty } from '../../../../components';
import { brandApi } from '../../../../api/brandClient/brandApi';
import { gameApi } from '../../../../api/gameClient/gameApi';
import { IChartData } from '../../../../types/brand';
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
    Colors
);

const currentDate = new Date();
const initialStartDate = new Date();
initialStartDate.setDate(currentDate.getDate() - 7);

export function UserStatisticChart() {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<IChartData | null>(
        {
            labels: [],
            datasets: [
                {
                    label: 'Number of user joined',
                    data: [],
                    borderWidth: 1,
                },
            ],

        }
    );
    const [startDate, setStartDate] = useState<Date | null>(initialStartDate);
    const [endDate, setEndDate] = useState<Date | null>(currentDate);
    const [campaignPromotions, setCampaignPromotions] = useState<ISelectItem[]>([]);
    const [selectedCampaignPromotion, setSelectedCampaignPromotion] = useState<ISelectItem | null>(null);

    const fetchCampaignPromotions = async () => {
        try {
            const response = await brandApi.getAllCampaignPromotions();
            const fetchedData = response.data;
            const campaignPromotions: ISelectItem[] = [];
            for (let i = 0; i < fetchedData.length; i++) {
                campaignPromotions.push({
                    value: fetchedData[i].id,
                    label: fetchedData[i].name,
                });
            }
            setCampaignPromotions(campaignPromotions);
        }
        catch (error) {
            console.error('--> Failed to fetch brands: ', error);
            toast.error(`Failed to fetch brands, error: ${error}`);
        }
    }

    const fetchChartData = async () => {
        if (selectedCampaignPromotion) {
            try {
                const response = await gameApi.getUserStatisticAdmin(selectedCampaignPromotion?.value, dateToYYYYMMdd(startDate!), dateToYYYYMMdd(endDate!));
                const fetchedData = response.data.data;
                const brandLabels: string[] = [];
                const brandDataset: number[] = [];
                for (let i = 0; i < fetchedData.length; i++) {
                    brandLabels.push(fetchedData[i].id);
                    brandDataset.push(fetchedData[i].userCount);
                }
                setData({
                    labels: brandLabels,
                    datasets: [
                        {
                            label: 'Number of user joined',
                            data: brandDataset,
                            borderWidth: 1,
                        },
                    ],
                });
            }
            catch (error) {
                console.error('--> Failed to fetch user statistic: ', error);
                toast.error(`Failed to fetch user statistic, error: ${error}`);
            }
        }
    }

    useEffect(() => {
        setLoading(true);
        fetchCampaignPromotions();
        setLoading(false);
    }, [])

    useEffect(() => {
        if (startDate && endDate) {
            setLoading(true);
            fetchChartData();
            setLoading(false);
        }
    }, [startDate, endDate, selectedCampaignPromotion]);

    const renderSelector = () => {
        return (
            <div className='flex justify-center space-x-10'>
                <CustomSelect
                    value={null}
                    title='Campaign promotion'
                    options={campaignPromotions}
                    onChange={(selectedOption) => setSelectedCampaignPromotion(selectedOption)}
                    placeholder='Select a promotion'
                />
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
        else {
            content = <Empty />
        }
        return content
    }

    return (
        <div className='w-full space-y-4 justify-items-center'>
            <CustomTitle text='User statistic' />
            {renderSelector()}
            {loading ? <Spinner /> : renderChart()}
            <ToastContainer />
        </div>
    );
}
