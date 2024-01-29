// Test ID: IIDSAT

import { useFetcher, useLoaderData } from "react-router-dom";
import { getOrder } from "../../services/apiRestaurant";
import
{
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";
import OrderItem from "../order/OrderItem";
import { useEffect } from "react";
import UpdateOrder from "./UpdateOrder";


function Order()
{
  const order = useLoaderData();

  const fetcher = useFetcher();

  useEffect(() =>
  {
    if (fetcher.state === 'idle' && !fetcher.data) fetcher.load('/menu');
  }, [fetcher])
  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className="p-6 space-y-8">
      <div className="flex flex-wrap justify-between items-center">
        <h2 className="text-xl font-semibold">Order # {id} Status</h2>

        <div className="space-x-2 mt-2 sm:mt-0">
          {priority && <span className="bg-red-500 rounded-full py-1 px-3 text-sm uppercase tracking-wide text-red-50">Priority</span>}
          <span className="bg-green-500 rounded-full py-1 px-3 text-sm uppercase tracking-wide text-green-50">{status} order</span>
        </div>
      </div>

      <div className="flex flex-wrap justify-between items-center gap-2 p-6 bg-stone-300">
        <p className="font-medium">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className="text-xs text-stone-600">(Estimated delivery: {formatDate(estimatedDelivery)})</p>
      </div>

      <ul className="divide-y divide-stone-300">
        {
          cart.map(item => <OrderItem
            key={item.pizzaId}
            item={item}
            isLoadingIngredients={fetcher.state === 'loading'}
            ingredients={fetcher.data?.find(pizza => pizza.id === item.pizzaId).ingredients}
          />)
        }
      </ul>

      <div className="space-y-2 p-6 bg-stone-300">
        <p className="text-sm font-medium text-stone-600">Price pizza: {formatCurrency(orderPrice)}</p>
        {priority && <p className="text-sm font-medium text-stone-600">Price priority: {formatCurrency(priorityPrice)}</p>}
        <p className="font-bold">To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}</p>
      </div>

      {!priority && <UpdateOrder />}

    </div>
  );
}

export const loader = async ({ params }) =>
{
  const order = await getOrder(params.orderId);
  return order
}

export default Order;
