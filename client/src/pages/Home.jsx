import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="max-w-4xl mx-auto text-center py-8 px-4">
      <h2 className="text-4xl font-bold mb-6 text-gray-800 leading-tight">
        Добро пожаловать в мир <span className="text-green-prayer">азкаров</span>
      </h2>
      <p className="mb-10 text-lg text-gray-600 max-w-2xl mx-auto">
          Поминание Аллаха — лучшее, что может делать раб. 
          Выбирай время и читай с искренностью.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { to: "/morning", title: "🌅 Утро", desc: "Азкары утра", bg: "bg-blue-500" },
          { to: "/evening", title: "🌇 Вечер", desc: "Азкары вечера", bg: "bg-purple-500" },
          { to: "/general", title: "🔹 Общие", desc: "После молитвы, сна", bg: "bg-green-prayer" },
        ].map((card, i) => (
          <Link
            key={i}
            to={card.to}
            className={`${card.bg} text-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition hover:scale-105 text-center`}
          >
            <h3 className="text-2xl font-bold mb-2">{card.title}</h3>
            <p>{card.desc}</p>
          </Link>
        ))}
      </div>

      <div className="mt-12 bg-beige p-6 rounded-xl border border-green-200">
        <p className="text-gray-700 italic">
          «Поистине, поминание Аллаха — величайшее» (Сура 29, аят 45)
        </p>
      </div>
    </div>
  );
}

export default Home;