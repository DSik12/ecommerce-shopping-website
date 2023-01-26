import React from 'react';

const Filter = (props) => {
    return (
        <span className="inFilter">
            <input type="checkbox" name="check" className='disable' id={props.id} />
            <label htmlFor={props.id}>{props.discountLabel}</label>
        </span>
    )
}

export default Filter;