import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";

import store from '../../store'
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import EmptyCart from '../cart/EmptyCart'
import { clear, getTotalCartPice } from '../cart/cartSlice'
import { formatCurrency } from "../../utils/helpers";
import { fetchAddress } from '../user/userSlice'

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );


function CreateOrder()
{
  const [withPriority, setWithPriority] = useState(false);

  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  const formError = useActionData();

  const { username, status, position, address, error } = useSelector(state => state.user);
  const cart = useSelector(state => state.cart.cart);
  const totalCartPrice = useSelector(getTotalCartPice);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;

  const dispatch = useDispatch();


  const isLoadingAddress = status === 'loading';

  if (!cart.length) return <EmptyCart />

  return (
    <div className="px-4 py-6">
      <h2 className="text-xl font-semibold mb-8">Ready to order? Let is go!</h2>


      <Form method="POST">
        <div className="flex flex-col mb-5 gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            className="input grow"
            type="text"
            name="customer"
            defaultValue={username}
            required />
        </div>

        <div className="flex flex-col mb-5 gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="input w-full" type="tel" name="phone" required />
            {formError?.phone && <p className="text-xs mt-2 bg-red-100 text-red-600 rounded-full p-2">{formError.phone}</p>}
          </div>
        </div>

        <div className="flex flex-col mb-5 gap-2 sm:flex-row sm:items-center relative">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              className="input w-full"
              type="text"
              name="address"
              required
              defaultValue={address || null}
            />
            {status === 'error' && <p className="absolute text-xs mt-2 bg-red-100 text-red-600 rounded-full p-2">{error}</p>}
          </div>
          {
            !position.latitude && !position.longitude && <span className="absolute right-1 top-[34px] sm:right-2 sm:top-[6px] md:top-[5px]">
              <Button
                type='small'
                onClick={(e) =>
                {
                  e.preventDefault();
                  dispatch(fetchAddress())
                }}
                disabled={isLoadingAddress || isSubmitting}
              >
                Get Address
              </Button>
            </span>
          }
        </div>

        <div className="flex items-center sm:mt-8 mb-2 my-12 gap-2">
          <input
            className="h-6 w-6 my-8 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input type="hidden" name="position" value={`${position.latitude},${position.longitude}`} />

          <Button disabled={isSubmitting} type='primary' >
            {isSubmitting ? 'Placing Order...' : `Order now from ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export const action = async ({ request }) =>
{
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log(data);
  
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'true'
  }

  const error = {};
  if (!isValidPhone(order.phone))
  {
    error.phone = 'Please give us your correct phone number. we might need it to contact you.'
  }
  if (Object.keys(error).length > 0) return error;

  const newOrder = await createOrder(order);

  store.dispatch(clear());

  return redirect(`/order/${newOrder.id}`)
}

export default CreateOrder;
