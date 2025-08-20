import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function AzkarDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [azkar, setAzkar] = useState(null);
  const [count, setCount] = useState(0);
  const [allInCategory, setAllInCategory] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAzkar = async () => {
      try {
        const res = await fetch(`http://localhost:3000/azkars/${id}`);
        const data = await res.json();
        if (!data) return navigate('/', { replace: true });

        setAzkar(data);
        setCount(data.count);

        const catRes = await fetch(
          `http://localhost:3000/azkars?category=${data.category}`
        );
        const list = await catRes.json();

        const sorted = list.sort((a, b) => a.id - b.id);
        setAllInCategory(sorted);

        const index = sorted.findIndex((a) => a.id === Number(id));
        setCurrentIndex(index >= 0 ? index : 0);
      } catch (err) {
        console.error(err);
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    loadAzkar();
  }, [id, navigate]);

  const goToNext = () => {
    if (currentIndex + 1 < allInCategory.length) {
      const next = allInCategory[currentIndex + 1];
      navigate(`/azkar/${next.id}`);
    } else {
      const first = allInCategory[0];
      navigate(`/azkar/${first.id}`);
    }
  };

  const goToPrev = () => {
    if (currentIndex > 0) {
      const prev = allInCategory[currentIndex - 1];
      navigate(`/azkar/${prev.id}`);
    } else {
      const last = allInCategory[allInCategory.length - 1];
      navigate(`/azkar/${last.id}`);
    }
  };

  const decrement = () => {
    setCount((prev) => {
      if (prev <= 1) {
        setTimeout(goToNext, 500);
        return 0;
      }
      return prev - 1;
    });
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-b from-beige to-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-prayer"></div>
      </div>
    );

  if (!azkar)
    return (
      <div className="text-center py-10 text-red-500 font-semibold">
        Азкар не найден
      </div>
    );

  return (
    <div className="max-w-md mx-auto px-4 py-6 bg-gradient-to-b from-beige to-white min-h-screen flex flex-col">
      {/* Заголовок */}
      <div className="flex justify-center items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-800">
          {azkar.category === 'morning'
            ? '🌅 Утро'
            : azkar.category === 'evening'
            ? '🌇 Вечер'
            : '🔹 Общие'}
        </h2>
      </div>

      {/* Основной блок */}
      <div className="flex flex-col items-center justify-center flex-1">
        <div className="relative flex items-center justify-center">
          {/* Кнопка влево */}
          <button
            onClick={goToPrev}
            className="absolute -left-14 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 shadow transition"
          >
            ◀️
          </button>

          {/* Круг с арабским текстом */}
          <div
            onClick={decrement}
            className="w-80 h-80 rounded-full bg-white shadow-2xl flex items-center justify-center p-6 cursor-pointer"
          >
            <div className="w-full h-full overflow-y-auto text-center">
              <p className="font-arabic text-2xl leading-relaxed text-gray-800">
                {azkar.arabic}
              </p>
            </div>
          </div>

          {/* Кнопка вправо */}
          <button
            onClick={goToNext}
            className="absolute -right-14 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-green-prayer hover:bg-green-dark text-white shadow transition"
          >
            ▶️
          </button>
        </div>

        {/* --- Транскрипция --- */}
        <div className="mt-6 text-center">
          <p className="text-gray-700 text-lg leading-relaxed">
            {azkar.transliteration}
          </p>
        </div>

        {/* --- Перевод --- */}
        <div className="mt-4 text-center">
          <p className="text-gray-600 text-base leading-relaxed">
            {azkar.translation}
          </p>
        </div>

        {/* Счётчик */}
        <div className="text-center mt-6">
          <div className="text-5xl font-bold text-green-prayer">{count}</div>
          <div className="text-gray-500 text-sm mt-1">Осталось прочитать</div>
        </div>

        {/* Подсказка */}
        <div className="text-center mt-3 text-xs text-gray-400 italic">
          Нажимай на круг или используй стрелки
        </div>
      </div>

      {/* Пагинация снизу */}
      <div className="flex justify-center items-center mt-8">
        <span className="text-sm text-gray-500">
          {currentIndex + 1} / {allInCategory.length}
        </span>
      </div>
    </div>
  );
}

export default AzkarDetail;
