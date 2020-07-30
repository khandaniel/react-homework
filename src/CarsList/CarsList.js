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

    carNameInput = null;
    colorInput = null

    setCarNameRef = el => {
        this.carNameInput = el;
    }

    setColorRef = el => {
        this.colorInput = el;
    }

    onAddButtonClick = () => {
        const { state: {newCarName, newCarColor, items}, carNameInput } = this;

        const newCarItems = [...items];
        newCarItems.push(addNewCar(newCarName, newCarColor));
        const newColors = getUniqueCarColors(newCarItems);

        this.setState({
            newCarName: '',
            items: newCarItems,
            colors: newColors
        });
        carNameInput.focus();
    }

    onCarNameKeyUpOrChange = ({ keyCode, target: { value } }) => {
        if (keyCode === 13) {
            this.colorInput.focus();
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
        const { items } = this.state;

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
        const { filterColor } = this.state;
        this.setState({
            applyColorFilter: filterColor
        });
    }

    render() {
        const {
            state: { newCarName, newCarColor, items, colors, filterColor, applyColorFilter },
            onCarNameKeyUpOrChange,
            onColorKeyUpOrChange,
            onAddButtonClick,
            onFilterChange,
            onFilterButtonClick,
            onRemoveButtonClick,
            setCarNameRef,
            setColorRef
        } = this;

        const listItems = items.map(({id, model, color}) => {
            if (!applyColorFilter || (applyColorFilter && applyColorFilter === color)) {
                return <CarsListItem key={ id } model={ model } color={ color } />;
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
                    { listItems }
                </ul>
                <div className="car-list-controls">
                    <div className="car-list-controls__add">
                        <input type="text"
                               placeholder="Enter new Car Name"
                               ref={ setCarNameRef }
                               value={ newCarName }
                               onChange={ onCarNameKeyUpOrChange }
                               onKeyUp={ onCarNameKeyUpOrChange }
                        />
                        <input type="text"
                               placeholder="Enter new Car Color"
                               ref={ setColorRef }
                               value={ newCarColor }
                               onKeyUp={ onColorKeyUpOrChange }
                               onChange={ onColorKeyUpOrChange }
                        />
                        <button onClick={ onAddButtonClick }>Add</button>
                    </div>
                    <div className="car-list-controls__filter">
                        <select defaultValue={ filterColor }
                                onChange={ onFilterChange }>
                            <option value="none">Filter by Color:</option>
                            { colorOptions }
                        </select>
                        <button onClick={ onFilterButtonClick }>Filter</button>
                    </div>
                    <button onClick={ onRemoveButtonClick }>Remove</button>
                </div>
            </div>
        );
    }
}

export default CarsList;