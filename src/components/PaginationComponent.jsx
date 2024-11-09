import { useState } from 'react';
import Pagination from '@mui/material/Pagination';


const PaginationComponent = () => {

    const [page, setPage] = useState(1);
    const handlePage = (e, p) => {
        console.log(e, p)
        setPage(p)
    }

    return (
        <>
            <div className="pagination">
                <Pagination count={10} onChange={handlePage} size='large' />
            </div>
        </>
    )
}

export default PaginationComponent
