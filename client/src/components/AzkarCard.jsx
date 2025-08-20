import { Link } from "react-router-dom";

function AzkarCard({ azkar }) {
  return (
    <Link 
      to={`/azkar/${azkar.id}`} 
      className="block bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition hover:scale-105 border border-green-50"
    >
      <p className="font-arabic mb-3 text-2xl">﴿ {azkar.arabic} ﴾</p>
      
      <div className="space-y-2 text-gray-700">
        <p>
          <strong>Транслитерация:</strong> 
          <span className="text-green-dark"> {azkar.transliteration}</span>
        </p>
        <p>
          <strong>Перевод:</strong> {azkar.translation}
        </p>
        <p className="text-sm text-green-600">
          <em>Повторить: {azkar.count} раз</em>
        </p>
      </div>
    </Link>
  );
}

export default AzkarCard;