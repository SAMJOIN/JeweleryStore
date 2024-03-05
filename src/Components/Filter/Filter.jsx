import { useEffect, useState } from 'react';
import Search from '../Search';
import style from './Filter.module.css'
import { itemAPI } from '../../API/api';

const Filter = (props) => {

    const [price, setPrice] = useState(0);
    const [brand, setBrand] = useState('');
    const [product, setProduct] = useState('');

    return (
        <div className={style.inputContainer}>
            <h1>Filters</h1>
            <div>
                <p>Цена</p>
                <div className={style.inputBar}>
                    <input
                        value={price}
                        type='number'
                        onChange={(event) => { setPrice(event.target.value) }}
                        className={style.input} />
                    <Search />
                </div>
            </div>
            <div>
                <p>Название</p>
                <div className={style.inputBar}>
                    <input
                        value={product}
                        type='text'
                        onChange={(event) => { setProduct(event.target.value) }}
                        className={style.input} />
                    <Search />
                </div>
            </div>
            <div>
                <p>Бренд</p>
                <div className={style.inputBar}>
                    <input
                        value={brand}
                        type='text'
                        onChange={(event) => { setBrand(event.target.value) }}
                        className={style.input} />
                    <Search />
                </div>
            </div>

        </div>
    );
}

export default Filter;