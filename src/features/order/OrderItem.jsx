import { formatCurrency } from "../../utils/helpers";

function OrderItem({ item, isLoadingIngredients, ingredients })
{
  const { quantity, name, totalPrice } = item;

  return (
    <li className="p-4 space-y-2">
      <div className="flex justify-between items-center gap-4 text-sm">
        <p>
          <span className="font-bold">{quantity}&times;</span> {name}
        </p>
        <p className="font-bold">{formatCurrency(totalPrice)}</p>
      </div>
      <div>
        <p className="text-sm italic text-stone-500">{isLoadingIngredients ? 'Loading...' : ingredients?.join(', ')}
        </p>
      </div>
    </li>
  );
}

export default OrderItem;
