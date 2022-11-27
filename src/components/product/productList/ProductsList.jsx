import {Container} from "../../ui/container/Container";
import styles from './productsList.module.scss'
import {useEffect, useState} from "react";
import {request} from "../../../requests/request.js";
import {Link, useParams} from "react-router-dom";

export const ProductsList = () => {
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState([])
  const { category } = useParams()
  useEffect(() => {
    const req = async () => {
      const res = await request(`/products/${category}`, {}, 'get')
      setProducts(res)
      setLoading(false)
    }
    req()
  }, [])
  console.log(products)
  return (
    <Container className={styles.parent}>
      <div className={styles.list}>
        {loading ? <p>Загрузка...</p> :
          products.map((item, index) => (
            <Link className={styles.tile} key={index} to={`/products/${category}/${item.productId}`}>
              <img src={item.preview} alt="" />
              <p>{item.name}</p>
            </Link>
          ))}
      </div>
    </Container>
  )
}