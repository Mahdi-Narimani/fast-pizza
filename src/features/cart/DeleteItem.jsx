import Button from '../../ui/Button'
import { useDispatch } from 'react-redux'
import { deleteItem } from './cartSlice';

const DeleteItem = ({pizzaId}) =>
{
    const dispatch = useDispatch();

    const handlerDeleteItemFromCart = () =>
    {
        dispatch(deleteItem(pizzaId))
    }


    return (
        <Button type='primary' onClick={handlerDeleteItemFromCart}>Delete</Button>)
}

export default DeleteItem