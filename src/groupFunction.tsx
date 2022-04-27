
export function groupBy(conversions: any, property: any) {
    let returnObj = conversions.reduce((acc: any, obj: any) => {
      let key: any = obj[property];
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(obj);
      return acc;
    }, {});
    return returnObj;
  }
  
export function nestGroupsBy(arr: {}, properties: any) {
    properties = Array.from(properties);
    if (properties.length === 1) {
      return groupBy(arr, properties[0]);
    }
    const property = properties.shift();
    let grouped: any = groupBy(arr, property);
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
  