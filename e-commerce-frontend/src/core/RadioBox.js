import React, { useState, useEffect } from "react";

const RadioBox = ({ prices, handleFilters }) => {
    const [value, setValue] = useState(0)

    const handleChange = (event) => {
        handleFilters(event.target.value)
        setValue(event.target.value)
    }

    return prices.map((p, i) => (
        <div key={i} className="radio-box">
            <label><input
                onChange={handleChange}
                value={`${p._id}`}
                name={p}
                type="radio"
                className="mr-2 ml-4" />
                <span className="form-check-label">{p.name}</span>
            </label>
        </div>
    ))
}

export default RadioBox;