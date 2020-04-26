import React, { useState, useEffect } from 'react';

const Checkbox = ({ categories, handleFilters }) => {
    const [checked, setChecked] = useState([])

    const handleToggle = cat => () => {
        const currentCategoryId = checked.indexOf(cat) // return the first index of -1
        const newChecedCategoryId = [...checked]
        //push into array if checked was not already checked
        //else pull out of array
        if (currentCategoryId === -1) {
            newChecedCategoryId.push(cat)
        } else {
            newChecedCategoryId.splice(currentCategoryId, 1)
        }
        console.log(newChecedCategoryId)
        setChecked(newChecedCategoryId)
        handleFilters(newChecedCategoryId)
    }

    return categories.map((cat, i) => (
        <div >
            <label>
                <input onChange={handleToggle(cat._id)} value={checked.indexOf(cat._id === -1)} type="checkbox" className="form-check-input" />
                <span className="form-check-label">{cat.name}</span>
            </label>
        </div>
    ))
}

export default Checkbox;