import { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Spinner, Title } from '../../../../components';
import { getRandomColorArray } from '../../../../utils';
import { brandApi } from '../../../../api/brandClient/brandApi';
import { IChartData } from '../../../../types/brand';

ChartJS.register(ArcElement, Tooltip, Legend);

export function GameStatisticChart() {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<IChartData | null>(null);

    const fetchData = async () => {
        try {
            const response = await brandApi.getGameStatisticAdmin();
            const fetchedData = response.data.data;
            let gameLabels: string[] = [];
            let gameDataset: number[] = [];
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
                        backgroundColor: getRandomColorArray(fetchedData.length),
                        borderWidth: 1,
                    },
                ],
            })
        } catch (error) {
            console.error('--> Failed to fetch game statistic: ', error);
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
        return content;
    }

    return (
        <div className='space-y-4'>
            <Title text='Game statistic' />
            {loading ? <Spinner /> : renderChart()}
        </div>

    );
}
