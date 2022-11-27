import styles from './user.module.scss'
import avatar from '../../../assets/default.jpg'
import {useState} from "react";
import {request} from "../../../requests/request.js";
import {toast} from "react-toastify";

export const User = ({user}) => {
  const [firstName, setFirstName] = useState(user.firstName)
  const [secondName, setSecondName] = useState(user.secondName)
  const [sex, setSex] = useState(user.sex)
  const [city, setCity] = useState(user.location)
  const updateInfo = async () => {
    const res = await request(`/profile/`, {firstName, secondName, location: city, sex, userId: user.userId }, 'patch')
    if (res?.text) {
      toast(res.text)
    } else {
      toast('Информация обновлена', {type: 'success'})
    }
  }
  return (
    <div className={styles.parent}>
      <img className={styles.avatar} draggable={false} src={avatar} alt={'avatar'}/>
      <div className={styles.info}>
        <div className={styles.container}>
          <input onChange={(e) => setFirstName(e.target.value)} placeholder={'Имя'} value={firstName}/>
        </div>
        <div className={styles.radio}>
          <p>Пол: </p>
          <label className={styles.radLabel}>
            <input checked={sex === 'male'} onChange={() => setSex('male')} type="radio" className={styles.radInput} name="rad"/>
              <div className={styles.radDesign}></div>
              <div className={styles.radText}>Мужчина</div>
          </label>
          <label className={styles.radLabel}>
            <input checked={sex === 'female'} onChange={() => setSex('female')} type="radio" className={styles.radInput} name="rad"/>
            <div className={styles.radDesign}></div>
            <div className={styles.radText}>Женщина</div>
          </label>
        </div>
        <input onChange={(e) => setCity(e.target.value)} className={styles.city} placeholder={'Ваш город'} value={city}/>
        <p className={styles.email}>Почта: {user.email}</p>
        <button onClick={() => updateInfo()}>
          Сохранить изменения
        </button>
      </div>
    </div>
  )
}