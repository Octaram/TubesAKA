export const recursiveSSort = (arr, startIndex = 0) => {
    // 1. Base Case: Jika startIndex sudah mencapai elemen terakhir, stop.
    // Artinya seluruh array sudah diproses.
    if (startIndex >= arr.length - 1) {
        return arr;
    }

    // 2. Logic Selection Sort: Cari nilai terkecil mulai dari startIndex ke belakang
    let minIndex = startIndex;
    
    for (let j = startIndex + 1; j < arr.length; j++) {
        // Sesuaikan .price atau .harga dengan data Anda
        if (arr[j].price < arr[minIndex].price) { 
            minIndex = j;
        }
    }

    // 3. Swap (Tukar) jika ditemukan harga yang lebih murah
    if (minIndex !== startIndex) {
        let temp = arr[startIndex];
        arr[startIndex] = arr[minIndex];
        arr[minIndex] = temp;
    }

    // 4. RECURSIVE CALL: Panggil diri sendiri untuk index berikutnya (startIndex + 1)
    // Ini menggantikan loop "for (let i = 0...)" pada versi iteratif
    return recursiveSSort(arr, startIndex + 1);
};
