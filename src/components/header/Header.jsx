import styles from './header.module.scss'
import {IoCartOutline} from "react-icons/io5";
import {AiOutlineUser} from "react-icons/ai";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {Container} from "../ui/container/Container.jsx";

export const Header = () => {
  const user = useSelector(state => state.user)
  console.log(user)
  return (
    <header>
      <Container className={styles.parent}>
        <div className={styles.burger}>
          <span></span>
        </div>
        <Link to={'/'} className={styles.logo}>
          <h1 className={styles.title}>Tourism</h1>
        </Link>
        <input placeholder={'Я ищу...'}  className={styles.search}/>
        <div className={styles.user}>
          {user.isAuth ?
            (<Link to={`/${user.userId}`}>
              <AiOutlineUser />
              <p>Кабинет</p>
            </Link>) :
            (<Link to={'/auth/login'}>
              <AiOutlineUser />
              <p>Логин</p>
            </Link>)}
          <Link to={'/cart'}>
            <IoCartOutline />
            <p>Корзина</p>
          </Link>
        </div>
      </Container>
    </header>
  )
}