import React, { forwardRef, useState, useContext } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FcCalendar } from 'react-icons/fc';
import { IoIosPlayCircle } from "react-icons/io";
import { MdPlaylistAdd } from "react-icons/md";
import { IoMdCloseCircle } from "react-icons/io";
import { fetchVideoID } from '../utils/fetchVideoID';
import { MusicPlayerContext } from '../context/MusicPlayerProvider';

const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <button onClick={onClick} ref={ref}>
        <FcCalendar size={24} />
        <span>{value}</span>
    </button>
));

const Chart = ({ title, musicList, selectedDate, onDateChange, minDate, maxDate }) => {
    const [searchResults, setSearchResults] = useState([]);
    const { addTrack, setCurrentTrackIndex, setIsPlaying, musicData, setMusicData } = useContext(MusicPlayerContext);

    const handlerItemClick = async (query) => {
        const results = await fetchVideoID(query);
        setSearchResults(results);
    };

    const handleAddToPlaylist = (result) => {
        addTrack(result);
    };

    const handlePlayNow = (result) => {
        const newMusicData = [...musicData];
        const existingIndex = newMusicData.findIndex(track => track.id === result.id);

        if (existingIndex !== -1) {
            // 트랙이 이미 목록에 있는 경우 해당 인덱스를 재생
            setCurrentTrackIndex(existingIndex);
        } else {
            // 트랙이 목록에 없는 경우 목록에 추가하고 재생
            newMusicData.push(result);
            setMusicData(newMusicData);
            setCurrentTrackIndex(newMusicData.length - 1);
        }

        setIsPlaying(false); // 현재 재생을 멈춤
        setTimeout(() => {
            setIsPlaying(true); // 새로운 트랙 재생
        }, 0);
    };

    return (
        <>
            <section className='music_chart'>
                <div className="title">
                    <h2>{title}</h2>
                    <div className='date'>
                        <DatePicker
                            selected={selectedDate}
                            onChange={onDateChange}
                            dateFormat="yyyy-MM-dd"
                            minDate={minDate}
                            maxDate={maxDate}
                            customInput={<CustomInput />}
                        />
                    </div>
                </div>
                <div className="list">
                    <ul>
                        {musicList.map((item, index) => (
                            <li key={index} onClick={() => handlerItemClick(item.title)}>
                                <span className='rank'>#{item.rank}</span>
                                <span className='img' style={{ backgroundImage: `url(${item.imageURL})` }}></span>
                                <span className='title'>{item.title}</span>
                                <span className='album'>{item.album}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            <section className='youtube-result'>
                <div className="title">
                    <h3>유튜브 검색 결과입니다. 음악을 듣거나 리스트에 추가할 수 있습니다.</h3>
                    <span><IoMdCloseCircle /></span>
                </div>

                <ul>
                    {searchResults.map((result, index) => (
                        <li key={index}>
                            <span className='img' style={{ backgroundImage: `url(${result.imageURL})` }}></span>
                            <span className='title'>{result.title}</span>
                            <span className='playNow' onClick={() => handlePlayNow(result)}><IoIosPlayCircle /></span>
                            <span className='playList' onClick={() => handleAddToPlaylist(result)}><MdPlaylistAdd /></span>
                        </li>
                    ))}
                </ul>
            </section>
        </>
    );
};

export default Chart;
