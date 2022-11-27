import {Container} from "../ui/container/Container.jsx";
import styles from './home.module.scss'
import {Link} from "react-router-dom";

export const Home = () => {
  const categories = [{name:'Телефоны', category: 'phone', img: 'https://cdn21vek.by/img/galleries/6975/619/preview_b/iphone13promax256gbmlmj3_apple_616592a1dc3d1.jpeg'}]
  return (
    <Container className={styles.parent}>
      <p className={styles.text}>Каталог</p>
      <div className={styles.tiles}>
        {categories.map((item, index) => (
          <Link className={styles.tile} to={`/products/${item.category}`}>
              <img src={item.img} alt="" />
              <p>{item.name}</p>
          </Link>
          ))}
      </div>
    </Container>
  )
}