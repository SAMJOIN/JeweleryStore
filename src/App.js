import { useEffect, useReducer, useState } from 'react';
import style from './App.module.css';
import reducer from './reducer';
import { itemAPI } from './API/api';
import Item from './Components/Item/Item';
import Paginator from './Components/Paginator/Paginator';
import Loader from './Components/Loader/Loader';
import Filter from './Components/Filter/Filter';

function App() {

  const [products, setProducts] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [isFetching, setFetching] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const getItems = (offset, limit) => {
    setFetching(true);
    itemAPI.getIds(offset, limit)
      .then(response => itemAPI.getItems(response)
        .then(response => {
          let unique = [];
          const uniqueItems = response.filter(item => {
            if (!unique.includes(item.id)) {
              unique.push(item.id)
              return item
            }
          })
          setProducts(uniqueItems);
          setFetching(false);
        }
        )
      )
      .catch(error => console.log('Error: ', error.message))
  }

  const onPageChange = (page) => {
    setCurrentPage(page);
  }

  useEffect(() => {
    itemAPI.getPageCount().then(response => setPageCount(Math.ceil(response.length / 50)));
    console.log('Pages')
  }, [])

  useEffect(() => {
    if (currentPage === 1) { // Какой то баг на сервере, при запросе с {'offset':0, 'limit':50} выдаёт только 49 элементов, поэтому установил для первой страницы лимит 51
      getItems(0, 51);
    } else {
      getItems(50 * (currentPage - 1), 50);
    }
  }, [currentPage])

  window.products = products
  window.pageCount = pageCount

  return (
    <div className={style.app}>
      <div className={style.filterBlock}>
        <Filter />
      </div>
      <div className={style.mainBlock}>
        <Paginator pageCount={pageCount} onPageChange={onPageChange} currentPage={currentPage} />
        {isFetching
          ? <Loader />
          : <div className={style.itemsContainer}>
            {products.map(item => <Item
              key={item.id}
              id={item.id}
              product={item.product}
              price={item.price}
              brand={item.brand} />)}
          </div>
        }
      </div>
    </div>
  );
}

export default App;
