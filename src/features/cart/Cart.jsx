import { Link } from 'react-router-dom';
import LinkButton from '../../ui/LinkButton'
import Button from '../../ui/Button';
import CartItem from './CartItem'
import { useDispatch, useSelector } from 'react-redux';
import { clear } from './cartSlice';
import EmptyCart from './EmptyCart'


function Cart()
{
  const username = useSelector(state => state.user.username)
  const cart = useSelector(state => state.cart.cart);

  const dispatch = useDispatch();

  const handlerClearCart = () => 
  {
    if (cart.length !== 0)
    {
      const message = confirm('Do you want to clear the shopping cart?');

      if (message) dispatch(clear());
      else return
    }
    alert('Your shopping cart is empty')
  }

if(!cart.length) return <EmptyCart />

  return (
    <div className='p-4'>
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <h2>Your cart, {username}</h2>

      <ul className='mt-3 divide-y divide-stone-300 border-b'>
        {
          cart.map(item => <CartItem key={item.pizzaId} item={item} />)
        }
      </ul>

      <div className='mt-6 space-x-2'>
        <Button to="/order/new" type='primary'>Order pizzas</Button>
        <Button type='secondary' onClick={handlerClearCart}>Clear cart</Button>
      </div>
    </div>
  );
}

export default Cart;
