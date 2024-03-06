import { useEffect, useState } from 'react';
import style from './App.module.css';
import { itemAPI } from './API/api';
import Item from './Components/Item/Item';
import Paginator from './Components/Paginator/Paginator';
import Loader from './Components/Loader/Loader';
import Filter from './Components/Filter/Filter';

function App() {

  const [filtredIds, setFiltredIds] = useState([]);
  const [ids, setIds] = useState([]);
  const [products, setProducts] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [isFetching, setFetching] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  window.ids = ids;
  window.products = products;


  const getItems = (ids, start, end) => { // ids - массив, откуда будут бараться id, start-отступ от начала всего списка end-конец отступа
    setFetching(true);
    itemAPI.getItems(ids.slice(start, end)).then(response => {
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
    ).catch(error => console.log('Error: ', error.message))
  }

  useEffect(() => {
    if (ids.length === 0) {
      itemAPI.getIds().then(response => {
        setIds(response);
        setPageCount(Math.ceil(response.length / 50));
        getItems(response, 0, 51); // Берём slice от response, потому что setIds ещё не успело отработать
      }).catch(console.log('error'))
    }
  }, [ids])

  useEffect(() => {
    if (currentPage === 1) { // Какой то баг на сервере, при запросе с {'offset':0, 'limit':50} выдаёт только 49 элементов, поэтому установил для первой страницы лимит 51
      getItems(ids, 0, 51);
    } else {
      getItems(ids, 50 * (currentPage - 1), 50 * (currentPage - 1) + 50);
    }
  }, [currentPage])

  useEffect(() => {
    setFetching(true);
    setIds(filtredIds);
    setPageCount(Math.ceil(filtredIds.length / 50));
    setCurrentPage(1);
    getItems(filtredIds, 0, 50)
  }, [filtredIds])

  const onPageChange = (page) => {
    setCurrentPage(page);
  }

  return (
    <div className={style.app}>
      <div className={style.filterBlock}>
        <Filter setIds={setIds} setFiltredIds={setFiltredIds} />
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
