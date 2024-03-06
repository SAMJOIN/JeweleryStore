import style from './Paginator.module.css'

const Paginator = (props) => {

    let pages = [];
    let visiblePages = [];
    const pageCount = props.pageCount;
    const currentPage = props.currentPage;

    if (pageCount > 5) {
        if (currentPage - 4 < 3) {

            for (let i = 2; i < currentPage + 5; i++) {
                visiblePages.push(i);
            }
            visiblePages.push('...');
        }
        else if (currentPage + 4 > pageCount) {
            visiblePages.push('...');
            for (let i = currentPage - 4; i < pageCount; i++) {
                visiblePages.push(i);
            }
        }
        else if (currentPage - 4 > 2 || currentPage + 4 < pageCount) {
            visiblePages.push('...');
            for (let i = currentPage - 4; i < currentPage + 5; i++)
                visiblePages.push(i);
            visiblePages.push('...');
        }
        pages = [1, ...visiblePages, pageCount];
    } else {
        for(let i = 1; i <= pageCount; i++) {
            pages.push(i);
        }
    }


    

    return (
        <div className={style.paginatorContainer}>
            {pages.map(page => {
                if (page === currentPage) {
                    return <span key={page} className={currentPage === page ? style.selectedPage : style.pageNumber} >{'   ' + page + '   '}</span>
                }
                else if (page === '...') {
                    return <span key={page}>{'   ' + page + '   '}</span>
                } else {
                    return <span key={page} className={currentPage === page ? style.selectedPage : style.pageNumber} onClick={() => { props.onPageChange(page) }}>{'   ' + page + '   '}</span>
                }
            })}
        </div>
    );
}

export default Paginator;