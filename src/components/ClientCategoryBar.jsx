const ClientCategoryBar = ({ categories, selectedId, onSelect }) => {
  return (
    <div className="flex flex-wrap gap-2 justify-center p-4">
      <button
        onClick={() => onSelect(null)}
        className={`px-4 py-2 rounded-full border ${selectedId === null ? 'bg-green-700 text-white' : 'bg-white'
          }`}
      >
        Todos
      </button>
      {categories.map(cat => (
        <button
          key={cat.id}
          onClick={() => onSelect(cat.id)}
          className={`px-4 py-2 rounded-full border ${selectedId === cat.id ? 'bg-green-700 text-white' : 'bg-white'
            }`}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
};

export default ClientCategoryBar;
