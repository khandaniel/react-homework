import {v4 as uuidv4} from "uuid";

export const initialCarsList = [
    {
        id: 0,
        model: 'Mazda',
        color: 'red',
    },
    {
        id: 1,
        model: 'Toyota',
        color: 'red',
    },
    {
        id: 2,
        model: 'VW',
        color: 'blue',
    },
    {
        id: 3,
        model: 'Mercedes',
        color: 'red',
    },
];

export const addNewCar = (name, color, list = []) => {
    list.push({
        id: uuidv4(),
        model: name ? name : 'New Car',
        color: color
    });

    return list;
}

export const getUniqueCarColors = carsList => {
    return carsList
        .map(item => item.color)
        .filter((color, index, allColors) => {
            return allColors.indexOf(color) === index;
        });
}