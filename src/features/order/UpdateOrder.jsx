import { useFetcher } from "react-router-dom"
import Button from "../../ui/Button";
import { updateOrder } from "../../services/apiRestaurant";

const UpdateOrder = () =>
{
    const fetcher = useFetcher();
    return (
        <fetcher.Form method="PATCH" className="text-right">
            <Button type='primary'>
                Make PRIORITY
            </Button>
        </fetcher.Form>
    )
}

export default UpdateOrder

export const action = async ({ params }) =>
{
    const data = { priority: true };
    await updateOrder(params.orderId, data)
    return null
}