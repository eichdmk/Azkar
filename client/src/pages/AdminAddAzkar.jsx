import { useState, useEffect } from "react";

function AdminAddAzkar() {
  // Форма добавления
  const [arabic, setArabic] = useState('');
  const [transliteration, setTransliteration] = useState('');
  const [translation, setTranslation] = useState('');
  const [category, setCategory] = useState('general');
  const [count, setCount] = useState(1);

  // Редактирование
  const [editId, setEditId] = useState(null);
  const [editArabic, setEditArabic] = useState('');
  const [editTransliteration, setEditTransliteration] = useState('');
  const [editTranslation, setEditTranslation] = useState('');
  const [editCategory, setEditCategory] = useState('general');
  const [editCount, setEditCount] = useState(1);

  // Список азкаров
  const [azkars, setAzkars] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  

  const ADMIN_KEY = 'secret12345'; 

  // Загрузка азкаров при открытии
  useEffect(() => {
    fetchAzkars();
  }, []);

  const fetchAzkars = () => {
    setLoading(true);
    fetch('http://localhost:3000/azkars')
      .then(res => res.json())
      .then(data => {
        setAzkars(data);
        setLoading(false);
      })
      .catch(err => {
        setMessage('❌ Ошибка загрузки азкаров');
        setLoading(false);
      });
  };

  // === Добавление нового азкара ===
  const handleAddSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await fetch('http://localhost:3000/azkars', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': ADMIN_KEY
        },
        body: JSON.stringify({
          arabic,
          transliteration,
          translation,
          category,
          count: Number(count)
        })
      });

      if (response.ok) {
        const newAzkar = await response.json();
        setMessage(`✅ Азкар добавлен: ID ${newAzkar.id}`);
        setArabic('');
        setTransliteration('');
        setTranslation('');
        setCount(1);
        fetchAzkars(); // Обновить список
      } else {
        const err = await response.json();
        setMessage(`❌ Ошибка: ${err.error}`);
      }
    } catch (err) {
      setMessage('❌ Ошибка сети. Убедись, что сервер запущен.');
    }
  };

  // === Удаление азкара ===
  const handleDelete = async (id) => {
    if (!window.confirm('Вы уверены, что хотите удалить этот азкар?')) return;

    try {
      const response = await fetch(`http://localhost:3000/azkars/${id}`, {
        method: 'DELETE',
        headers: {
          'x-admin-key': ADMIN_KEY
        }
      });

      if (response.ok) {
        setMessage('✅ Азкар удалён');
        fetchAzkars(); // Обновить список
      } else {
        const err = await response.json();
        setMessage(`❌ Ошибка: ${err.error}`);
      }
    } catch (err) {
      setMessage('❌ Ошибка сети');
    }
  };

  // === Редактирование: начать редактирование ===
  const startEdit = (azkar) => {
    setEditId(azkar.id);
    setEditArabic(azkar.arabic);
    setEditTransliteration(azkar.transliteration);
    setEditTranslation(azkar.translation);
    setEditCategory(azkar.category);
    setEditCount(azkar.count);
  };

  // === Редактирование: сохранить ===
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await fetch(`http://localhost:3000/azkars/${editId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': ADMIN_KEY
        },
        body: JSON.stringify({
          arabic: editArabic,
          transliteration: editTransliteration,
          translation: editTranslation,
          category: editCategory,
          count: Number(editCount)
        })
      });

      if (response.ok) {
        const updated = await response.json();
        setMessage(`✅ Азкар обновлён: ID ${updated.id}`);
        setEditId(null); 
        fetchAzkars(); 
      } else {
        const err = await response.json();
        setMessage(`❌ Ошибка: ${err.error}`);
      }
    } catch (err) {
      setMessage('❌ Ошибка сети');
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow-xl border border-green-100">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">🔐 Админ-панель</h2>

      {/* Форма добавления */}
      <div className="mb-10 p-6 bg-green-50 rounded-xl border border-green-200">
        <h3 className="text-xl font-bold mb-4">➕ Добавить новый азкар</h3>
        <form onSubmit={handleAddSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Арабский текст"
            value={arabic}
            onChange={(e) => setArabic(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-prayer focus:outline-none text-right font-arabic text-lg"
            required
          />
          <input
            type="text"
            placeholder="Транслитерация"
            value={transliteration}
            onChange={(e) => setTransliteration(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-prayer focus:outline-none"
          />
          <input
            type="text"
            placeholder="Перевод"
            value={translation}
            onChange={(e) => setTranslation(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-prayer focus:outline-none"
            required
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg bg-white"
          >
            <option value="morning">🌅 Утро</option>
            <option value="evening">🌇 Вечер</option>
            <option value="general">🔹 Общий</option>
          </select>
          <input
            type="number"
            placeholder="Количество"
            value={count}
            onChange={(e) => setCount(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
            min="1"
          />
          <button
            type="submit"
            className="w-full bg-green-prayer hover:bg-green-dark text-white py-3 rounded-lg text-lg font-semibold transition"
          >
            Добавить азкар
          </button>
        </form>
      </div>

      {/* Сообщение */}
      {message && (
        <div className={`mb-6 p-4 rounded-lg text-center ${
          message.includes('✅') 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {message}
        </div>
      )}

      {/* Список азкаров */}
      <div>
        <h3 className="text-2xl font-bold mb-4">📋 Все азкары</h3>
        {loading ? (
          <p className="text-center">Загрузка...</p>
        ) : azkars.length === 0 ? (
          <p className="text-center text-gray-500">Нет азкаров</p>
        ) : (
          <div className="space-y-4">
            {azkars.map(azkar => (
              <div key={azkar.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition">
                {editId === azkar.id ? (
                  // Режим редактирования
                  <form onSubmit={handleEditSubmit} className="space-y-3">
                    <input
                      type="text"
                      value={editArabic}
                      onChange={(e) => setEditArabic(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded text-right font-arabic text-lg"
                      required
                    />
                    <input
                      type="text"
                      value={editTransliteration}
                      onChange={(e) => setEditTransliteration(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                    <input
                      type="text"
                      value={editTranslation}
                      onChange={(e) => setEditTranslation(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded"
                      required
                    />
                    <select
                      value={editCategory}
                      onChange={(e) => setEditCategory(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded"
                    >
                      <option value="morning">Утро</option>
                      <option value="evening">Вечер</option>
                      <option value="general">Общий</option>
                    </select>
                    <input
                      type="number"
                      value={editCount}
                      onChange={(e) => setEditCount(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded"
                      min="1"
                    />
                    <div className="flex gap-2">
                      <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
                      >
                        Сохранить
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditId(null)}
                        className="bg-gray-500 text-white px-4 py-1 rounded hover:bg-gray-600"
                      >
                        Отмена
                      </button>
                    </div>
                  </form>
                ) : (
                  // Просмотр
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-3">
                    <div className="flex-1">
                      <p className="font-arabic text-2xl">{azkar.arabic}</p>
                      <p><strong>Перевод:</strong> {azkar.translation}</p>
                      <p className="text-sm text-gray-600">
                        {azkar.transliteration} | {azkar.category} | {azkar.count} раз
                      </p>
                    </div>
                    <div className="flex gap-2 mt-2 md:mt-0">
                      <button
                        onClick={() => startEdit(azkar)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm"
                      >
                        ✏️ Редактировать
                      </button>
                      <button
                        onClick={() => handleDelete(azkar.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                      >
                        🗑️ Удалить
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminAddAzkar;