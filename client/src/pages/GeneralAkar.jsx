import React, { useState, useEffect } from 'react';
import AzkarCard from '../components/AzkarCard';

function GeneralAzkar() {
  const [azkars, setAzkars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3000/azkars?category=general')
      .then(res => res.json())
      .then(data => {
        setAzkars(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Ошибка загрузки:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">🔹 Общие азкары</h2>
      {loading ? (
        <p>Загрузка...</p>
      ) : azkars.length === 0 ? (
        <p>Нет общих азкаров.</p>
      ) : (
        azkars.map(azkar => <AzkarCard key={azkar.id} azkar={azkar} />)
      )}
    </div>
  );
}

export default GeneralAzkar;