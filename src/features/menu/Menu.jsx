import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from './MenuItem'

function Menu()
{
  const menu =  useLoaderData();
  return (
    <ul className="divide-y divide-stone-300 px-2">
      {menu.map(item => <MenuItem key={item.id} pizza={item}/>)}
    </ul>
  );
}

export const loader = async () =>
{
  const menu = await getMenu();
  return menu
}

export default Menu;
