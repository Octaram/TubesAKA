export const iterativeSSort = (arr) => {
    let n = arr.length;

    for (let i = 0; i < n - 1; i++) {
        // 1. Anggap elemen saat ini (i) adalah yang paling murah/kecil
        let minIndex = i;

        // 2. Cari barang yang LEBIH MURAH di sisa array (j)
        for (let j = i + 1; j < n; j++) {
            // Perhatikan: Kita membandingkan .harga (karena object)
            // Ubah .harga menjadi .price jika data Anda menggunakan bahasa Inggris
            if (arr[j].harga < arr[minIndex].harga) {
                minIndex = j; // Simpan indeksnya saja, JANGAN swap dulu
            }
        }

        // 3. Jika ditemukan barang yang lebih murah dari posisi i, baru SWAP
        if (minIndex !== i) {
            let temp = arr[i];
            arr[i] = arr[minIndex];
            arr[minIndex] = temp;
        }
    }
    return arr;
};
