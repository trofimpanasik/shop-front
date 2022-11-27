import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {request} from "../../requests/request.js";
import {User} from "./User/User.jsx";
import styles from './profile.module.scss'
import {Product} from "./product/Product.jsx";

export const Profile = () => {
  const {id} = useParams()
  const [user, setUser] = useState(null)
  // const user = useSelector(state => state.user)
  useEffect(() => {
    (async () => {
      const res = await request(`/profile/user/${id}`, {}, 'get')
      setUser(res)
    })()
    console.log(id)
  }, [])
  console.log(user)
  return (
    <div className={styles.parent}>
      {user && <User user={user}/>}
      <Product />
    </div>
  )
}