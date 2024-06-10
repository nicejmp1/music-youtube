import React, { createContext, useEffect, useState } from 'react';

export const MusicPlayerContext = createContext();

const MusicPlayerProvider = ({ children }) => {
    const [musicData, setMusicData] = useState([]);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`${process.env.PUBLIC_URL}/music-data/music_list.json`);
            const data = await response.json();
            setMusicData(data);
        };
        fetchData();
    }, []);

    const addTrack = (track) => {
        setMusicData((prevMusicData) => [...prevMusicData, track]);
    };

    return (
        <MusicPlayerContext.Provider value={{
            musicData,
            setMusicData, // setMusicData 제공
            currentTrackIndex,
            setCurrentTrackIndex, // setCurrentTrackIndex 제공
            isPlaying,
            setIsPlaying, // setIsPlaying 제공
            addTrack
        }}>
            {children}
        </MusicPlayerContext.Provider>
    );
};

export default MusicPlayerProvider;
