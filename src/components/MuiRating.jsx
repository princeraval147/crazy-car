import Rating from '@mui/material/Rating';
import { useState } from "react"

function MuiRating() {

    const [value, setValue] = useState(null)
    const handlerChange = (e, newValue) => {
        e.target.value
        setValue(newValue)
    }
    console.log(value)

    return (
        <>
            <Rating
                value={value}
                onChange={handlerChange}
                precision={0.5}
                size='large'
            />
        </>
    )
}

export default MuiRating