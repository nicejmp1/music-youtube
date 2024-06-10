import React, { useState } from 'react';

import Chart from "../components/Chart";
import useFetchData from '../hook/useFetchData';
import { ClipLoader } from 'react-spinners';

const BillPage = () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1); // 어제 날짜

    const [selectedDate, setSelectedDate] = useState(yesterday);

    const formattedDate = selectedDate.toISOString().split('T')[0]; //날짜 포맷 형식 맞추기 
    const { data, loading } = useFetchData(`https://raw.githubusercontent.com/nicejmp1/music-best/main/billboard/billboard100_${formattedDate}.json`)
    return (
        <>
            {loading ? (
                <div className='loading'>
                    <ClipLoader size={50} color={'#f88741'} loading={loading} />
                </div>
            ) : (
                <Chart title="빌보드 차트 Top100"
                    musicList={data}
                    selectedDate={selectedDate}
                    onDateChange={setSelectedDate}
                    minDate={new Date('2024-05-01')}
                    maxData={yesterday}
                />
            )}

        </>

    );
};

export default BillPage
