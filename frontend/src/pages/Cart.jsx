import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';

const Cart = () => {
    const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);
    const [cartData, setCartData] = useState([]);
    useEffect(() => {
        const tempData = [];
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                if (cartItems[items][item] > 0) {
                    tempData.push({
                        _id: items,
                        size: item,
                        qunatity: cartItems[items][item],
                    });
                }
            }
        }
        setCartData(tempData);
    }, [cartItems]);
    return (
        <div className='pt-14 border-t'>
            <div className='mb-3 text-2xl'>
                <Title text1={'YOUR'} text2={'CART'} />
            </div>
            <div>
                {cartData.map((item, index) => {
                    const productData = products.find((product) => product._id === item._id);
                    return (
                        <div className='py-4 text-gray-700 border-t border-b grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4' key={index}>
                            <div className='flex gap-6 items-start'>
                                <img className='w-16 sm:w-20' src={productData.image[0]} alt='' />
                                <div className=''>
                                    <p className='text-xs font-medium sm:text-lg'>{productData.name}</p>
                                    <div className='flex gap-4 items-center mt-2'>
                                        <p>
                                            {currency}
                                            {productData.price}
                                        </p>
                                        <p className='px-2 border sm:px-3 sm:py-1 bg-slate-50'>{item.size}</p>
                                    </div>
                                </div>
                            </div>
                            <input
                                className='px-1 py-1 border max-w-10 sm:max-w-20 sm:py-2'
                                type='number'
                                min={1}
                                defaultValue={item.qunatity}
                                onChange={(e) => (e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id, item.size, Number(e.target.value)))}
                            />
                            <img onClick={() => updateQuantity(item._id, item.size, 0)} className='mr-4 w-4 cursor-pointer sm:w-5' src={assets.bin_icon} alt='' />
                        </div>
                    );
                })}
            </div>
            <div className='flex justify-end my-20'>
                <div className='w-full sm:w-[450px]'>
                    <CartTotal />
                    <div className='w-full text-end'>
                        <button onClick={() => navigate('/place-order')} className='px-8 py-3 my-8 text-sm text-white bg-black'>
                            PROCEED TO CHECKOUT
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
