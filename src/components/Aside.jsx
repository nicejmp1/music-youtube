import React, { useState, useContext, useRef, useEffect } from 'react';
import { MdLibraryMusic } from 'react-icons/md';
import { RiPlayListFill } from "react-icons/ri";
import { FaShuffle, FaCirclePlay } from "react-icons/fa6";
import { IoPlaySkipBackSharp, IoPlaySkipForward, IoRepeat } from "react-icons/io5";
import { CgPlayPauseO } from "react-icons/cg";
import { MusicPlayerContext } from '../context/MusicPlayerProvider';
import ReactPlayer from 'react-player';

const Aside = () => {
    const { musicData } = useContext(MusicPlayerContext); // 음악 데이터를 가져오는 컨텍스트
    const [isPlaying, setIsPlaying] = useState(false); // 재생 상태
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0); // 현재 트랙 인덱스
    const [progress, setProgress] = useState(0); // 진행 상황
    const [volume, setVolume] = useState(30); // 볼륨
    const [duration, setDuration] = useState(0); // 트랙 길이
    const [isShuffle, setIsShuffle] = useState(false); // 셔플 상태
    const [isRepeat, setIsRepeat] = useState(false); // 반복 재생 상태
    const playerRef = useRef(null); // ReactPlayer 참조
    const currentTrackRef = useRef(null); // 현재 트랙 참조

    // 현재 재생 중인 트랙
    const nowPlaying = musicData.length > 0 ? musicData[currentTrackIndex] : null;

    // 트랙 인덱스 변경 시 실행
    useEffect(() => {
        setProgress(0); // 진행 상황 초기화
        setIsPlaying(false); // 재생 상태 초기화

        // 현재 트랙을 중앙으로 스크롤
        if (currentTrackRef.current) {
            currentTrackRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, [currentTrackIndex]);

    // 플레이어 준비 완료 시 실행
    const handleReady = () => {
        playerRef.current.seekTo(0); // 트랙을 처음으로 이동
        setIsPlaying(true); // 재생 시작
    };

    // 재생/일시정지 토글
    const handlePlayPause = () => setIsPlaying(!isPlaying);

    // 이전 트랙으로 이동
    const handlePrev = () => {
        const newIndex = isShuffle
            ? Math.floor(Math.random() * musicData.length)
            : (currentTrackIndex > 0 ? currentTrackIndex - 1 : musicData.length - 1);
        setCurrentTrackIndex(newIndex);
    };

    // 다음 트랙으로 이동
    const handleNext = () => {
        const newIndex = isShuffle
            ? Math.floor(Math.random() * musicData.length)
            : (currentTrackIndex < musicData.length - 1 ? currentTrackIndex + 1 : 0);
        setCurrentTrackIndex(newIndex);
    };

    // 셔플 상태 토글
    const handleShuffle = () => setIsShuffle(!isShuffle);

    // 반복 재생 상태 토글
    const handleRepeat = () => setIsRepeat(!isRepeat);

    // 트랙 진행 상황 업데이트
    const handleProgress = (state) => setProgress(state.played * 100);

    // 볼륨 변경
    const handleVolumeChange = (event) => setVolume(parseFloat(event.target.value));

    // 트랙 클릭 시 실행
    const handleTrackClick = (index) => {
        setCurrentTrackIndex(index); // 트랙 인덱스 업데이트
        playerRef.current.seekTo(0); // 트랙을 처음으로 이동
        setIsPlaying(false); // 재생 중지
        setTimeout(() => setIsPlaying(true), 100); // 100ms 후 재생 시작
    };

    // 트랙 탐색 위치 변경
    const handleSeekChange = (event) => {
        const newProgress = parseFloat(event.target.value);
        setProgress(newProgress);
        playerRef.current.seekTo(newProgress / 100);
    };

    // 트랙 길이 설정
    const handleDuration = (duration) => setDuration(duration);

    // 트랙 종료 시 실행
    const handleEnd = () => {
        if (isRepeat) {
            playerRef.current.seekTo(0);
            setIsPlaying(true);
        } else {
            handleNext();
        }
    };

    // 시간을 형식화하는 함수
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <aside id='aside'>
            <div className='play_now'>
                <h2><MdLibraryMusic />Now Playing</h2>
                {nowPlaying ? (
                    <div className='thumb'>
                        <div className='img' style={{ pointerEvents: 'none' }}>
                            <ReactPlayer
                                ref={playerRef}
                                key={`${nowPlaying.videoID}-${currentTrackIndex}`}
                                url={`https://www.youtube.com/watch?v=${nowPlaying.videoID}&start=0`}
                                playing={isPlaying}
                                controls={false}
                                width="100%"
                                height="100%"
                                onProgress={handleProgress}
                                onDuration={handleDuration}
                                onEnded={handleEnd}
                                onReady={handleReady}
                                volume={volume / 100}
                            />
                        </div>
                        <span className='title'>{nowPlaying.title}</span>
                        <span className='artist'>{nowPlaying.artist}</span>
                    </div>
                ) : (
                    <div>No music is currently playing</div>
                )}
                <div className='progress'>
                    <div className='progress_bar'>
                        <input
                            type='range'
                            min='0'
                            max='100'
                            step='0.01'
                            value={progress}
                            onChange={handleSeekChange}
                        />
                    </div>
                    <div className='time'>
                        <span className='current'>{formatTime(progress / 100 * duration)}</span>
                        <span className='total'>{formatTime(duration)}</span>
                    </div>
                </div>
                <div className='controls'>
                    <span className={`shuffle ${isShuffle ? 'active' : ''}`} onClick={handleShuffle}><FaShuffle /></span>
                    <span className='prev' onClick={handlePrev}><IoPlaySkipBackSharp /></span>
                    <span className='play' onClick={handlePlayPause}>
                        {isPlaying ? <CgPlayPauseO /> : <FaCirclePlay />}
                    </span>
                    <span className='next' onClick={handleNext}><IoPlaySkipForward /></span>
                    <span className={`repeat ${isRepeat ? 'active' : ''}`} onClick={handleRepeat}><IoRepeat /></span>
                </div>
                <div className='volume'>
                    <input
                        type='range'
                        min='0'
                        max='100'
                        step='1'
                        value={volume}
                        onChange={handleVolumeChange}
                    />
                    <span className='volume-value'>{volume}</span>
                </div>
            </div>
            <div className='play_list'>
                <h3><RiPlayListFill />Play List</h3>
                <ul>
                    {musicData.map((track, index) => (
                        <li
                            key={index}
                            className={index === currentTrackIndex ? 'current' : ''}
                            ref={index === currentTrackIndex ? currentTrackRef : null}
                            onClick={() => handleTrackClick(index)}
                        >
                            <span className='img' style={{ backgroundImage: `url(${track.imageURL})` }}></span>
                            <span className='title'>{track.title}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    );
}

export default Aside;
