import { useSelector } from "react-redux"

const Username = () =>
{

  const username = useSelector(state => state.user.username);
  
  if(username === '') return null

  return (
    <p className="uppercase hidden font-semibold md:block">{username}</p>
  )
}

export default Username