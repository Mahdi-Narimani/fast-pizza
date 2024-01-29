import { useDispatch, useSelector } from "react-redux"
import Button from "../../ui/Button"
import { getTotalCartQuantityById, increaseItemQuantity, decreaseItemQuantity } from "./cartSlice";
import { MdDelete } from "react-icons/md";


const UpdateItemQuantity = ({ pizzaId }) =>
{
    const quantity = useSelector(getTotalCartQuantityById(pizzaId));

    const dispatch = useDispatch();

    return (
        <div className="flex items-center">
            <Button
                type='round'
                onClick={() => dispatch(decreaseItemQuantity(pizzaId))}>

                {quantity === 1 ? <MdDelete /> : '-'}
            </Button>

            {quantity}

            <Button
                type='round'
                onClick={() => dispatch(increaseItemQuantity(pizzaId))}>+
            </Button>
        </div>
    )
}

export default UpdateItemQuantity