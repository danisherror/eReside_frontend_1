import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/WardenLayout';
import React, { useEffect, useState } from 'react'
import { useID } from '../../Auth/Auth';
import ReactApexChart from 'react-apexcharts';
const TableOne = () => {
    const storeIdInLs = useID();
    const [roomissues, setRoomIssues] = useState([]);
    const [uniqueDate, setuniqueDate] = useState([]);
    const state = {
        series: [
            {
                name: 'Count',
                data: uniqueDate.map(item => item.count),
            }
        ]
    };
    const options = {
        colors: ['#3C50E0'],
        chart: {
            fontFamily: 'Satoshi, sans-serif',
            type: 'line',
            height: 335,
            toolbar: {
                show: false,
            },
            zoom: {
                enabled: false,
            },
        },
        dataLabels: {
            enabled: false,
        },
        xaxis: {
            categories: uniqueDate.map(item => item.date),
        },
        markers: {
            size: 6,
            strokeWidth: 0,
            hover: {
                size: 8
            }
        },
        legend: {
            show: false
        },
        tooltip: {
            theme: 'dark'
        }
    };

    const getToken = () => {
        return localStorage.getItem('token');
    }
    const token = getToken();

    const getdata = async () => {

        const res = await fetch(`https://ereside-backend-1.onrender.com/api/v1/wgetallqrtokens`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        const data = await res.json();
        if (res.status === 404) {
            console.error("404 Error: Resource not found");
            // Handle the error appropriately, e.g., display an error message to the user
        }

        if (res.status === 422 || !data) {
            console.log("error ");

        } else {
            setRoomIssues(data.result)
            const dateCounts = {};
            data.result.forEach(entry => {
                const date = entry.date;
                if (dateCounts[date]) {
                    dateCounts[date]++;
                } else {
                    dateCounts[date] = 1;
                }
            });
            const uniqueDatesArray = Object.keys(dateCounts).map(date => ({ date, count: dateCounts[date] }));

            setuniqueDate(uniqueDatesArray);
        }
    }

    useEffect(() => {
        getdata();
    }, [])

    return (
        <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-12">
            <div className="flex justify-end gap-4.5 mb-7.5">
                <h4 className="absolute left-25 mb-2 text-xl font-semibold text-black dark:text-white">
                    No of Qrcode Scanned per day
                </h4>
            </div>
            <ReactApexChart
                options={options}
                series={state.series}
                type="line"
                height={350}
            />

        </div>
    );
};

export default TableOne;

