export function PageButtons({ numOfPages, changePage }) {
    const pages = Array.from(Array(numOfPages() + 1).keys())
    pages.shift();

    return pages.length > 1 ? (
        <>
            {pages.map(page => {
                return (
                    <button onClick={changePage} value={page} key={page} >{page}</button>
                )
            })}
        </>
    ) : false
}