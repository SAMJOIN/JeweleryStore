import { useState } from 'react';
import Search from '../Search';
import style from './Filter.module.css'
import { itemAPI } from '../../API/api';

const Filter = (props) => {

    const [price, setPrice] = useState(0);
    const [brand, setBrand] = useState('');
    const [product, setProduct] = useState('');

    window.price = price;

    const filterByPrice = () => {
        if (price) {
            itemAPI.filterItemsByPrice(Number(price)).then(response => {
                props.setFiltredIds(response);
            }
            )
        }
    }
    const filterByProduct = () => {
        if (product) {
            itemAPI.filterItemsByProduct(product).then(response => {
                props.setFiltredIds(response);
            }
            )
        }
    }
    const filterByBrand = () => {
        if (brand) {
            itemAPI.filterItemsByBrand(brand).then(response => {
                props.setFiltredIds(response);
            }
            )
        }
    }

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
                    <Search onClick={filterByPrice}/>
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
                    <Search onClick={filterByProduct}/>
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
                    <Search onClick={filterByBrand}/>
                </div>
            </div>
            <button>Сброс</button>
        </div>
    );
}

export default Filter;