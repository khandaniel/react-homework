import React from 'react';
import './car-list-item.css';

const CarsListItem = (props) => {
    const { model, color } = props;

    return (
        <li>
            { model }
            <span className="car-item-color" style={{ backgroundColor: color }}></span>
        </li>
    );
}

export default CarsListItem;