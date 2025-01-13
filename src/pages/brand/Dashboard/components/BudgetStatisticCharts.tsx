import { useState, useEffect, useMemo } from 'react';
import { Chart as ChartJS, ArcElement, BarElement, Tooltip, Legend, Colors } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import { Spinner, Title, Empty } from '../../../../components';
import { gameApi } from '../../../../api/gameClient/gameApi';
import { IChartData } from '../../../../types/brand';
import { useAuth } from '../../../../hooks/AuthContext';
import { toast, ToastContainer } from "react-toastify";

ChartJS.register(ArcElement, BarElement, Tooltip, Legend, Colors);

export function BudgetStatisticCharts() {
    const [loading, setLoading] = useState(false);
    const [summaryData, setSummaryData] = useState<IChartData | null>(null);
    const [detailData, setDetailData] = useState<IChartData | null>(null);
    const { profile } = useAuth();
    const brandId = useMemo(() => profile?.id, [profile]);

    const fetchData = async () => {
        try {
            const response = await gameApi.getBudgetStatisticBrand(brandId);
            let fetchedData = response.data.data;
            // ===== for testing ====
            // if (!fetchedData) {
            //     fetchedData = {
            //         "totalBudget": 20000,
            //         "remainingBudget": 10000,
            //         "promotions": [
            //             {
            //                 "id": "1b741951-98dc-453c-b867-82398b407909",
            //                 "name": "Quốc test",
            //                 "budget": 10000,
            //                 "remainingBudget": 8000,
            //                 "spentBudget": 2000,
            //             },
            //             {
            //                 "id": "b7fcfd97-3f78-466d-9758-4a76818ad7f0",
            //                 "name": "Quốc test chiến dịch 2",
            //                 "budget": 10000,
            //                 "remainingBudget": 5000,
            //                 "spentBudget": 5000,
            //             }
            //         ]
            //     }
            // }
            if (fetchedData) {
                setSummaryData({
                    labels: ['Remaining budget', 'Spent budget'],
                    datasets: [
                        {
                            label: 'Total budget',
                            data: [fetchedData.remainingBudget, fetchedData.totalBudget - fetchedData.remainingBudget],
                            //backgroundColor: getColorArray(2),
                            borderWidth: 1,
                        },
                    ],
                })

                const labels: string[] = [];
                const spentBudget: number[] = [];
                const remainingBudget: number[] = [];
                for (let i = 0; i < fetchedData.promotions.length; i++) {
                    labels.push(fetchedData.promotions[i].name);
                    spentBudget.push(fetchedData.promotions[i].spentBudget);
                    remainingBudget.push(fetchedData.promotions[i].remainingBudget);
                }

                setDetailData({
                    labels: labels,
                    datasets: [
                        {
                            label: 'Remaining budget',
                            data: remainingBudget,
                            borderWidth: 1,
                        },
                        {
                            label: 'Spent budget',
                            data: spentBudget,
                            borderWidth: 1,
                        }
                    ],
                })
            }
        } catch (error) {
            console.error('--> Failed to fetch budget statistic: ', error);
            toast.error(`Failed to fetch budget statistic: ${error}`);
        }
    }

    useEffect(() => {
        setLoading(true);
        fetchData();
        setLoading(false);
    }, []);

    const renderSummaryChart = () => {
        let content = null;
        if (summaryData) {
            content = <Pie
                className='mt-10'
                data={summaryData}
                height={500}
                width={500}
            />
        }
        else {
            content = <Empty />
        }
        return content;
    }

    const renderDetailChart = () => {
        let content = null;
        if (detailData) {
            content = <Bar
                className=''
                height={600}
                width={800}
                data={{
                    labels: detailData.labels,
                    datasets: detailData.datasets,
                }}
                options={{
                    scales: {
                        x: { stacked: true },
                        y: { stacked: true },
                    },
                }}
            />
        }
        else {
            content = <Empty />
        }

        return content;
    }

    const renderCharts = () => {
        return (
            <div className="flex justify-between gap-12">
                <div className="">
                    <h2 className="text-4xl font-bold text-black">Summary</h2>
                    {renderSummaryChart()}
                </div>
                <div className="">
                    <h2 className="text-4xl font-bold text-black">Detail</h2>
                    {renderDetailChart()}
                </div>
            </div>
        )
    }

    let content
    if (loading) {
        content = <Spinner />
    } else {
        content = renderCharts()
    }

    return (
        <div className='space-y-4'>
            <Title text='Budget statistic' />
            {content}
            <ToastContainer />
        </div>
    );
}
