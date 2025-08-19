import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import { useLocation } from 'react-router-dom';

const SearchBar = () => {
    const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
    const location = useLocation();
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        if (location.pathname.includes('collection')) {
            setVisible(true);
        } else {
            setVisible(false);
        }
        // console.log(location.pathname);
        // console.log(pathname);
    }, [location]);
    return showSearch && visible ? (
        <div className='py-4 text-center border-t border-b bg-gray-50'>
            <div className='inline-flex items-center justify-center w-3/4 px-5 py-2 mx-3 border border-gray-400 rounded-full sm:w-1/2'>
                <input className='flex-1 text-sm outline-none bg-inherit' type='text' placeholder='Search' value={search} onChange={(e) => setSearch(e.target.value)} />
                <img className='w-4' src={assets.search_icon} alt='' />
            </div>
            <img onClick={() => setShowSearch(false)} className='inline w-3 cursor-pointer' src={assets.cross_icon} alt='' />
        </div>
    ) : null;
};

export default SearchBar;
