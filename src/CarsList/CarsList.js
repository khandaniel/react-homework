import React, { Component } from 'react'
import CarsListItem from "../CarsListItem";
import { initialCarsList, addNewCar, getUniqueCarColors } from "../Utils";
import './car-list.css';

class CarsList extends Component {
    state = {
        newCarName: '',
        newCarColor: 'blue',
        items: initialCarsList,
        colors: [ 'red', 'blue' ],
        filterColor: 'blue',
        applyColorFilter: null
    }

    onAddButtonClick = () => {
        const {newCarName, newCarColor, items} = this.state;
        const newCarItems = addNewCar(newCarName, newCarColor, [...items]);
        const newColors = getUniqueCarColors(newCarItems);

        this.setState({
            newCarName: '',
            items: newCarItems,
            colors: newColors
        });
    }

    onCarNameKeyUpOrChange = ({ keyCode, target: { value } }) => {
        if (keyCode === 13) {
            this.onAddButtonClick();
            return;
        }
        this.setState({
            newCarName: value
        });
    }

    onColorKeyUpOrChange = ({ keyCode, target: { value } }) => {
        if (keyCode === 13) {
            this.onAddButtonClick();
            return;
        }
        this.setState({
            newCarColor: value
        });
    }

    onRemoveButtonClick = () => {
        const {items} = this.state;

        const newItems = [...items];
        newItems.shift();

        this.setState({
            items: newItems
        });
    }

    onFilterChange = ({ target: { value } }) => {
        this.setState({
            filterColor: value !== 'none' ? value : null
        })
    }

    onFilterButtonClick = () => {
        const {filterColor} = this.state;
        this.setState({
            applyColorFilter: filterColor
        });
    }

    render() {
        const { newCarName, newCarColor, items, colors, filterColor, applyColorFilter } = this.state;

        const listItems = items.map(({id, model, color}) => {
            if (!applyColorFilter || (applyColorFilter && applyColorFilter === color)) {
                return <CarsListItem key={ id } model={model} color={color} />;
            }

            return null;
        });

        const colorOptions = colors.map((item, id) => {
            return <option key={ "color-option-" + id } value={ item }>{ item }</option>
        });

        return (
            <div className="car-list-container">
                <h1>Cars</h1>
                <ul>
                    {listItems}
                </ul>
                <div className="car-list-controls">
                    <div>
                        <input type="text"
                               value={ newCarName }
                               onChange={ this.onCarNameKeyUpOrChange }
                               onKeyUp={ this.onCarNameKeyUpOrChange }
                        />
                        <input type="text"
                               value={ newCarColor }
                               onKeyUp={ this.onColorKeyUpOrChange }
                               onChange={ this.onColorKeyUpOrChange }
                        />
                        <button onClick={ this.onAddButtonClick }>Add</button>
                    </div>
                    <div>
                        <select defaultValue={ filterColor }
                                onChange={ this.onFilterChange }>
                            <option value="none">None</option>
                            { colorOptions }
                        </select>
                        <button onClick={ this.onFilterButtonClick }>Filter</button>
                    </div>
                    <button onClick={ this.onRemoveButtonClick }>Remove</button>
                </div>
            </div>
        );
    }
}

export default CarsList;