import styles from '../auth.module.scss'
import img from '../background.jpeg'
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {AiFillEye, AiFillEyeInvisible} from "react-icons/all.js";
import {request} from "../../../requests/request.js";
import {toast} from "react-toastify";
import {useDispatch} from "react-redux";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [seePassword, setSeePassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    console.log(email, password);
  }, [email, password]);
  const eye = () => {
    return seePassword ? (
      <AiFillEyeInvisible onClick={() => setSeePassword(!seePassword)} />
    ) : (<AiFillEye onClick={() => setSeePassword(!seePassword)} />)
  }
  const checkForm = async () => {
    const res = await request('/auth/login/', {email, password}, 'post')
    if(res?.text){
      toast(res.text, {type: 'error'})
    } else {
      localStorage.setItem('key', res.key)
      const key = await request('/auth/auth', {}, 'get')
      localStorage.setItem('key', key.key)
      dispatch({type: 'SET_USER', payload: {user: key.user,  isAuth: true}})
      navigate(`/${key.user.userId}`)
    }
  }
  return (
    <div className={styles.parent}>
      <img draggable={false} className={styles.background} src={img} alt={'background'}/>
      <div className={styles.form}>
        <h1>Вход</h1>
        <form onSubmit={(e) => e.preventDefault()}>
          <p>Почта</p>
          <div className={styles.container}>
            <input onChange={e => setEmail(e.target.value)} placeholder={'Введите почту'} />
          </div>
          <p>Пароль</p>
          <div className={styles.container}>
            <input onChange={(e) => setPassword(e.target.value)} placeholder={'Введите пароль'} />
          </div>
          <button onClick={() => checkForm()}>Войти</button>
        </form>
        <span><p>Ещё нет аккаунта?</p><Link to={'/auth/reg'}><button className={styles.reg}>Регистрация</button></Link></span>
      </div>
    </div>
  )
}