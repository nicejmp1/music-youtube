import React from 'react'
import { Link } from 'react-router-dom'

import { MdFavorite } from "react-icons/md";
import { FaCircleCheck } from "react-icons/fa6";
import { MdBookmarkAdded } from "react-icons/md";
import { SiMusicbrainz } from "react-icons/si";

const Header = () => {
    return (
        <header id='header' role='banner'>
            <h1 className='logo'>
                <Link to='/'><SiMusicbrainz />오디오 캔버스</Link>
            </h1>
            <h2>chart</h2>
            <ul>
                <li><Link to='/melon'><div className="icon"></div>멜론 차트</Link></li>
                <li><Link to='/bugs'><div className="icon"></div>벅스 차트</Link></li>
                <li><Link to='/apple'><div className="icon"></div>애플 차트</Link></li>
                <li><Link to='/genie'><div className="icon"></div>지니 차트</Link></li>
                <li><Link to='/bill'><div className="icon"></div>빌보드 차트</Link></li>
            </ul>
            <h2>playlist</h2>
            <ul>
                <li><Link to='/recent'><div className="icon2"><FaCircleCheck /></div>recent</Link></li>
                <li><Link to='/favorites'><div className="icon2"><MdFavorite /></div>favorites</Link></li>
                <li><Link to='/mymusic'><div className="icon2"><MdBookmarkAdded /></div>나의뮤직</Link></li>
            </ul>
        </header>
    )
}

export default Header
