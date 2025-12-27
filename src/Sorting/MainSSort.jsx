import React, { useState, useEffect } from 'react';
import { recursiveSSort } from './recursiveSSort';
import { iterativeSSort } from './iterativeSSort';
import { generateBigData } from '../mockdata/generateBigData';
const MainSSort = () => {
    const [products, setProducts] = useState([]);
    const [logs, setLogs] = useState([]);
    const [lastRun, setLastRun] = useState(null);

    const [selectedSize, setSelectedSize] = useState(100);

    const sizes = [50, 100, 250, 500, 1000, 5000];

    useEffect(() => {
        handleGenerateData(100);
    }, []);

    const handleGenerateData = (size) => {
        setSelectedSize(size);
        const data = generateBigData(size);
        setProducts(data);
        setLastRun(null);
    };


    const runSort = (type) => {
        const dataCopy = [...products];
        const start = performance.now();
        let sortedData = [];

        if (type === 'iterative') {
            console.time("iterativeSSort");
            sortedData = iterativeSSort(dataCopy);
            console.timeEnd("iterativeSSort");
        } else {
            
            console.time("recursiveSSort");
            sortedData = recursiveSSort(dataCopy);
            console.timeEnd("recursiveSSort");
        }

        const end = performance.now();
        const duration = (end - start).toFixed(2);

        setProducts(sortedData);

        const newLog = {
            id: Date.now(),
            type: type === 'iterative' ? 'Iterative Selection' : 'Recursive Selection',
            count: products.length,
            time: duration,
        };

        setLogs([newLog, ...logs]);
        setLastRun({ type, time: duration });
    };

    const formatRupiah = (number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(number);
    };

    return (
        <div className="min-h-screen bg-slate-50 p-6 font-sans text-slate-800">
            <div className="max-w-7xl mx-auto space-y-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900">AlgoBenchmark E-Commerce</h1>
                            <p className="text-slate-500 text-sm">Analisis Kompleksitas: Selection Sort ($O(n^2)$)</p>
                        </div>
                        <div className="flex gap-3 mt-4 md:mt-0">
                            <button
                                onClick={() => runSort('iterative')}
                                className="px-4 py-2 bg-rose-100 hover:bg-rose-200 text-rose-700 rounded-lg font-medium transition active:scale-95 border border-rose-200 flex items-center gap-2"
                            >
                                🐢 Iterative
                            </button>
                            <button
                                onClick={() => runSort('recursive')}
                                className="px-4 py-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-700 rounded-lg font-medium transition active:scale-95 border border-emerald-200 flex items-center gap-2"
                            >
                                🚀 Recursive
                            </button>
                        </div>
                    </div>

                    <div className="border-t border-slate-100 pt-4">
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                            Pilih Jumlah Data (N):
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {sizes.map((size) => (
                                <button
                                    key={size}
                                    onClick={() => handleGenerateData(size)}
                                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 border
                                        ${selectedSize === size
                                            ? 'bg-blue-600 text-white border-blue-600 shadow-md transform scale-105'
                                            : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                                        }
                                    `}
                                >
                                    {size} Data
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Waktu Eksekusi</h3>
                            {lastRun ? (
                                <div className="text-center py-4">
                                    <span className={`text-4xl font-bold ${lastRun.type.includes('iterative') ? 'text-rose-500' : 'text-emerald-500'}`}>
                                        {lastRun.time} ms
                                    </span>
                                    <p className="text-slate-500 mt-2 text-sm">
                                        Data: <b>{products.length}</b> items
                                    </p>
                                </div>
                            ) : (
                                <div className="text-center py-8 text-slate-400 text-sm">
                                    Klik tombol Run di atas
                                </div>
                            )}
                        </div>

                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                            <div className="p-4 bg-slate-50 border-b border-slate-200">
                                <h3 className="font-semibold text-slate-700 text-sm">Riwayat Benchmark</h3>
                            </div>
                            <div className="max-h-64 overflow-y-auto">
                                <table className="w-full text-sm text-left">
                                    <thead className="text-xs text-slate-500 uppercase bg-slate-50 sticky top-0">
                                        <tr>
                                            <th className="px-4 py-3">Algo</th>
                                            <th className="px-4 py-3">N</th>
                                            <th className="px-4 py-3 text-right">Time</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {logs.map((log) => (
                                            <tr key={log.id} className="hover:bg-slate-50">
                                                <td className="px-4 py-3 font-medium text-slate-700">
                                                    {log.type.split(' ')[0]} {/* Ambil kata depannya saja biar pendek */}
                                                </td>
                                                <td className="px-4 py-3 text-slate-500">
                                                    {log.count}
                                                </td>
                                                <td className={`px-4 py-3 text-right font-bold ${log.type.includes('Iterative') ? 'text-rose-600' : 'text-emerald-600'}`}>
                                                    {log.time}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="font-bold text-lg text-slate-800">Preview Data</h2>
                            <span className="text-xs bg-slate-100 text-slate-600 px-3 py-1 rounded-full font-medium border border-slate-200">
                                Menampilkan max 100 dari {products.length}
                            </span>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                            {products.length > 0 ? products.slice(0, 10000).map((product) => (
                                <div key={product.id} className="group border border-slate-100 rounded-xl p-3 hover:shadow-md transition bg-white flex flex-col">
                                    <div className="aspect-square bg-slate-100 rounded-lg mb-3 relative overflow-hidden">
                                        <img
                                            src={product.image || `https://placehold.co/200?text=${product.nama.substring(0, 3)}`}
                                            alt={product.nama}
                                            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                                            loading="lazy"
                                        />
                                    </div>
                                    <h3 className="text-xs font-bold text-slate-700 line-clamp-2 mb-1 group-hover:text-blue-600">
                                        {product.nama}
                                    </h3>
                                    <div className="mt-auto">
                                        <p className="text-rose-600 font-bold text-sm">
                                            {formatRupiah(product.harga || product.price)}
                                        </p>
                                    </div>
                                </div>
                            )) : (
                                <p className="col-span-full text-center text-slate-400 py-10">Memuat data...</p>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default MainSSort;
