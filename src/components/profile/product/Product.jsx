import styles from './product.module.scss'
import {useState} from "react";
import {request} from "../../../requests/request.js";

export const Product = () => {
  const [photos, setPhotos] = useState([''])
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('phone')
  const [preview, setPreview] = useState('')
  const send = async () => {
    const res = await request(`/products/add/`, {name, description, price, category, photos, preview}, 'post')
    console.log(res)
  }
  return (
    <div className={styles.parent}>
      <h2>Добавление товара</h2>
      <input onChange={e => setName(e.target.value)} placeholder={'Название товара'}/>
      <input onChange={e => setDescription(e.target.value)} placeholder={'Описание товара'}/>
      <select>
        <option>Телефоны</option>
      </select>
      <input onChange={e => setPrice(e.target.value)} placeholder={'Цена'}/>
      <input onChange={e => setPreview(e.target.value)} placeholder={'Ссылка на превью фото'}/>
      {photos.map((photo, index) => (
        <div key={index}>
          <input onChange={(e) => setPhotos(photos => {
            photos[index] = e.target.value
            return photos
          })} placeholder={'Ссылка на фото'}/>
          <img src={photo} alt={'photo'}/>
          <button onClick={() => setPhotos(photos => [...photos.slice(0, index), ...photos.slice(index, -1)])}>Удалить</button>
        </div>
      ))}
      <button onClick={() => {setPhotos([...photos, ''])}}>Добавить фото</button>
      <button onClick={() => send()}>Выложить</button>
    </div>
  )
}