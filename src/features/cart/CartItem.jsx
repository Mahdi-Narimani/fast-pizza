import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utils/helpers";
import { deleteItem } from "./cartSlice";
import DeleteItem from "./DeleteItem";
import UpdateItemQuantity from "./UpdateItemQuantity";

function CartItem({ item })
{
  const { pizzaId, name, quantity, totalPrice } = item;

  return (
    <li className="py-3 flex justify-between items-center font-semibold">
      <p>
        {quantity}&times; {name}
      </p>
      <div className="flex justify-between items-center">
        <p className="me-10">{formatCurrency(totalPrice)}</p>
        <UpdateItemQuantity pizzaId={pizzaId}/>
        <DeleteItem pizzaId={pizzaId} />
      </div>
    </li>
  );
}

export default CartItem;
