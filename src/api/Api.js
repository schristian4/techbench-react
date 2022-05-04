import { data } from "../data/cityData3";
// Returns a promise value that contains data object
export const fetchData = () => {
    return Promise.resolve(data);
};