import style from './Item.module.css'

const Item = (props) => {
    return (
        <div className={style.itemContainer}>
            <p><span>Brand: </span>{props.brand}</p>
            <p><span>Id: </span>{props.id}</p>
            <p><span>Price: </span>{props.price}</p>
            <p><span>Product: </span>{props.product}</p>
        </div>
    );
}

export default Item;