
import { cityDataType } from '../components/cityDataTypes'

export function groupBy(conversions: any, property: any) {
  return conversions.reduce((acc: any, obj: any) => {
    let key = obj[property];
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(obj);
      return acc;
    }, {});
  }
  
export function nestGroupsBy(arr: {}, properties: any) {
    property = Array.from(properties);
    if (properties.length === 1) {
      return groupBy(arr, properties[0]);
    }
    var property = properties.shift();
    var grouped = groupBy(arr, property);
    for (let key in grouped) {
      grouped[key] = nestGroupsBy(grouped[key], Array.from(properties));
    }
    
    return grouped;
  }
  /**
   * Group objects by property.
   * `nestGroupsBy` helper method.
   * @param {String} property
   * @param {Object[]} conversions
   * @returns {Object}
   */