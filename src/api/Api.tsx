import { data } from "../data/cityData";
import { dataSmall } from "../data/cityData3"; 
import { cityDataType } from "../data/cityDataTypes";
// Returns a promise value that contains data object
const dataArray: cityDataType[][] = [data, dataSmall]
const randomSelection = (arrayOfDataObjects: cityDataType[][])=> {
    const randomNumber:number = Math.floor(Math.random()*2)
    return arrayOfDataObjects[randomNumber]
}
const finalDataChoice = randomSelection(dataArray)

export const fetchData = () => {
    return Promise.resolve(finalDataChoice);
};
