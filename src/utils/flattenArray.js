// ----------------------------------------------------------------------

export default function flattenArray(list, key = "children") {
  let children = [];

  const flatten = list?.map((item) => {
    if (item[key] && item[key].length) {
      children = [...children, ...item[key]];
    }
    return item;
  });

  return flatten?.concat(
    children.length ? flattenArray(children, key) : children
  );
}

export const flattenThreeDimensionalArray = (
  list = [],
  firstKey = "items",
  secondKey = "children"
) => {
  let newArray = [];
  list &&
    list.forEach((subElement) => {
      newArray.push(subElement);
      if (subElement && subElement[firstKey]?.length > 0)
        subElement[firstKey] &&
          subElement[firstKey].forEach((itemElement) => {
            newArray.push(itemElement);
            if (itemElement && itemElement[secondKey]?.length > 0) {
              itemElement[secondKey] &&
                itemElement[secondKey].forEach((childElement) => {
                  newArray.push(childElement);
                });
            }
          });
    });
  return newArray;
};
