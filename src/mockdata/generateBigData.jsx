export const generateBigData = (jumlahData) => {
    const products = [];
    const names = ["Laptop", "HP", "Mouse", "Keyboard", "Monitor", "Headset"];
    const brands = ["Asus", "Samsung", "Logitech", "Dell", "Apple", "Xiaomi"];

    for (let i = 0; i < jumlahData; i++) {
        // Membuat nama acak: "Asus Laptop 492"
        const randomName = `${brands[i % brands.length]} ${names[i % names.length]} ${i}`;
        
        products.push({
            id: i,
            nama: randomName,
            // Harga acak antara 10.000 sampai 10.000.000
            harga: Math.floor(Math.random() * 10000000) + 10000 
        });
    }
    return products;
};