import style from './Loader.module.css'

const Loader = () => {
    return (
        <section className={style.dotsContainer}>
            <div className={style.dot}></div>
            <div className={style.dot}></div>
            <div className={style.dot}></div>
            <div className={style.dot}></div>
            <div className={style.dot}></div>
        </section>
    );
}

export default Loader;