import { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Colors } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Spinner, Title, Empty } from '../../../../components';
import { brandApi } from '../../../../api/brandClient/brandApi';
import { IChartData } from '../../../../types/brand';
import { toast, ToastContainer } from "react-toastify";

ChartJS.register(ArcElement, Tooltip, Legend, Colors);

export function GameStatisticChart() {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<IChartData | null>(null);

    const fetchData = async () => {
        try {
            const response = await brandApi.getGameStatisticAdmin();
            const fetchedData = response.data.data;
            const gameLabels: string[] = [];
            const gameDataset: number[] = [];
            for (let i = 0; i < fetchedData.length; i++) {
                gameLabels.push(fetchedData[i].name);
                gameDataset.push(fetchedData[i].playCount);
            }
            setData({
                labels: gameLabels,
                datasets: [
                    {
                        label: 'Total turns',
                        data: gameDataset,
                        borderWidth: 1,
                    },
                ],
            })
        } catch (error) {
            console.error('--> Failed to fetch game statistic: ', error);
            toast.error(`Failed to fetch game statistic: ${error}`);
        }
    }

    useEffect(() => {
        setLoading(true);
        fetchData();
        setLoading(false);
    }, []);

    const renderChart = () => {
        let content = null;
        if (data) {
            content = <Pie
                data={data}
                className='w-full h-96'
            />
        }
        else {
            content = <Empty />
        }
        return content;
    }

    return (
        <>
        <div className='space-y-4'>
            <Title text='Game statistic' />
            {loading ? <Spinner /> : renderChart()}
        </div>
            <ToastContainer />
        </>

    );
}
