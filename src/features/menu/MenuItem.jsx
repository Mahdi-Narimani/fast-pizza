import { formatCurrency } from "../../utils/helpers";
import Button from '../../ui/Button'
import { useDispatch, useSelector } from "react-redux";
import { addItem, getTotalCartQuantityById } from '../cart/cartSlice';
import DeleteItem from "../cart/DeleteItem";
import UpdateItemQuantity from "../cart/UpdateItemQuantity";

function MenuItem({ pizza })
{
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  const isInCart = useSelector(getTotalCartQuantityById(id))

  const dispatch = useDispatch();

  const handlerAddToCart = () =>
  {

    const newItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice
    }

    dispatch(addItem(newItem))
  }

  return (
    <li className="flex gap-4 py-3">
      <img className={`h-24 rounded-sm ${soldOut ? 'opacity-70 grayscale' : ''}`} src={imageUrl} alt={name} />
      <div className="flex flex-col grow">
        <p className="font-medium">{name}</p>
        <p className="text-sm italic text-stone-500 capitalize">{ingredients.join(', ')}</p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ?
            <p
              className="text-sm">
              {formatCurrency(unitPrice)}
            </p> :
            <p className="text-sm text-stone-500 font-medium uppercase">Sold out</p>}

          {isInCart > 0 && <div className="flex">
            <UpdateItemQuantity pizzaId={id}/>
            <DeleteItem pizzaId={id} />
          </div>}
          {!soldOut && !isInCart && <Button type='small' onClick={handlerAddToCart}>Add to cart</Button>}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
