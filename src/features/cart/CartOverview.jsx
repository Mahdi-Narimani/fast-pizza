import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTotalCartPice, getTotalCartQuantity } from "./cartSlice";

function CartOverview()
{

  const totalCartQuantity = useSelector(getTotalCartQuantity)
  const totalCartPrice = useSelector(getTotalCartPice)

  if(!totalCartQuantity) return null;


  return (
    <div className="flex justify-between items-center bg-stone-800 text-stone-200 uppercase p-4 sm:px-6 md:text-base">
      <p className="space-x-4 font-semibold text-stone-200">
        <span>{totalCartQuantity} pizzas</span>
        <span>${totalCartPrice}</span>
      </p>
      <Link to='/cart'>Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
