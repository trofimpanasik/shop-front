import styles from "../auth.module.scss";
import img from "../background.jpeg";
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {AiFillEye, AiFillEyeInvisible} from "react-icons/all.js";
import {toast} from "react-toastify";
import {request} from "../../../requests/request.js";
import {useDispatch} from "react-redux";

export const Reg = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [seePassword, setSeePassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    console.log(email, password, password2);
  }, [email, password, password2]);
  const eye = () => {
    return seePassword ? (
      <AiFillEyeInvisible onClick={() => setSeePassword(!seePassword)} />
    ) : (<AiFillEye onClick={() => setSeePassword(!seePassword)} />)
  }
  const checkForm = async () => {
    if(password.length < 6 && password2.length < 6) {
      toast("Пароль должен быть больше 6 символов", {type: "error"});
    } else if(password !== password2) {
      toast('Пароли не совпадают', {type: 'error'});
    } else {
      const reg = await request('/auth/reg/', {email, password}, 'post')
      localStorage.setItem('key', reg.key)
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
        <h1>Регистрация</h1>
        <form onSubmit={(e) => e.preventDefault()}>
          <p>Почта</p>
          <div className={styles.container}>
            <input onChange={(e) => setEmail(e.target.value)} placeholder={'Введите почту'} />
          </div>
          <p>Пароль</p>
          <div className={styles.container}>
            <input type={seePassword ? 'text' : 'password'} onChange={(e) => setPassword(e.target.value)} placeholder={'Введите пароль'} />
            {eye()}
          </div>
          <p>Повторите пароль</p>
          <div className={styles.container}>
            <input type={seePassword ? 'text' : 'password'} onChange={(e) => setPassword2(e.target.value)} placeholder={'Повторите пароль'} />
            {eye()}
          </div>
          <button onClick={() => checkForm()}>Зарегистрироватся</button>
        </form>
        <span><p>Уже есть аккаунт?</p><Link to={'/auth/login'}><button className={styles.reg}>Логин</button></Link></span>
      </div>
    </div>
  )
}