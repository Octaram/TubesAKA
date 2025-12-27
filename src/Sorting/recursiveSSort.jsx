export const recursiveSSort = (arr, startIndex = 0) => {
    if (startIndex >= arr.length - 1) {
        return arr;
    }

    let minIndex = startIndex;
    
    for (let j = startIndex + 1; j < arr.length; j++) {
        if (arr[j].price < arr[minIndex].price) { 
            minIndex = j;
        }
    }

    if (minIndex !== startIndex) {
        let temp = arr[startIndex];
        arr[startIndex] = arr[minIndex];
        arr[minIndex] = temp;
    }

    return recursiveSSort(arr, startIndex + 1);
};
