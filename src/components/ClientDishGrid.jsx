const ClientDishGrid = ({ dishes }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {dishes.map(dish => (
        <div key={dish.id} className="bg-white shadow-md rounded-lg overflow-hidden">
          {dish.image && (
            <img
              src={dish.image}
              alt={dish.name}
              className="w-full h-40 object-cover"
            />
          )}
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">{dish.name}</h3>
            <p className="text-sm text-gray-600">{dish.description}</p>
            <p className="text-right text-green-700 font-bold mt-2">{dish.price} €</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ClientDishGrid;
