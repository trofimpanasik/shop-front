import styles from './body.module.scss';
import {IoIosArrowRoundBack} from "react-icons/io";
import {BiShareAlt} from "react-icons/bi";
import {AiFillFire, AiFillStar, AiOutlineClose} from "react-icons/ai";
import {useEffect, useState} from "react";
import {Container} from "../../ui/container/Container";
import {request} from "../../../requests/request.js";
import {useParams} from "react-router-dom";

export const Product = () => {
  const [selectedImg, setSelectedImg] = useState(null);
  const [loading, setLoading] = useState(true);
  const {id} = useParams();
  const [product, setProduct] = useState(null);
  const recomendation = [// proton: d2xC+Hrtq%UigT9  mongo ac: g7446!BS9bu4vUf
    {
      name: 'Наушники Xiaomi Buds 3 М2111Е1 (черный, международная версия)',
      price: '214.99',
      categories: 'Скидки на беспроводные наушники',
      discount: '-15%',
      img: 'https://content2.onliner.by/catalog/device/header/3c39042c3d871e429e0349721be47a73.jpeg'
    },
    {
      name: 'Умные часы Huawei Watch GT 3 Active 46 мм',
      price: ' 599.00',
      categories: 'Умные часы Honor и Huawei',
      discount: '-12%',
      img: 'https://content2.onliner.by/catalog/device/header/a8592ad26966f6552533c5965d607709.jpeg'
    },
    {
      name: 'Фитнес-браслет Xiaomi Smart Band 7 (международная версия)',
      price: ' 130.00',
      categories: 'Фитнес-браслеты',
      discount: null,
      img: 'https://content2.onliner.by/catalog/device/header/3d1539e7b55921664aa80f7b59cc9f55.jpeg'
    },
    {
      name: 'Беспроводная колонка SVEN PS-160',
      price: ' 82.32',
      categories: 'Bluetooth-колонки',
      discount: ' -21%',
      img: 'https://content2.onliner.by/catalog/device/header/ad27b36ccf0ad62f1f2d1d1ada3629b6.jpeg'
    },
    {
      name: 'Внешний аккумулятор Xiaomi Redmi Power Bank 20000mAh (черный, международная версия)',
      price: ' 89.00',
      categories: 'Пауэрбанки',
      discount: null,
      img: 'https://content2.onliner.by/catalog/device/header/a5bec6550c53119ef1c301c95a36aad1.jpeg'
    }
  ]
  useEffect(() => {
    const req = async () => {
      const res = await request(`/products/product/${id}`, {}, 'get');
      setProduct(res);
      setLoading(false);
    }
    req()
  }, [])
  if(loading){
    return (
      <Container>
        <div>...loading</div>
      </Container>
    )
  }
  return (
    <div className={styles.parent}>
      <span className={styles.source}>

        <IoIosArrowRoundBack />
        <a>Каталог</a>/
        <a>Электроника</a>/
        <a>Телефоны</a>/
        <a>HONOR</a>
        <BiShareAlt className={styles.share}/>
      </span>
      <div className={styles.product}>
        <h2>
          {product.name}
        </h2>
        <div className={styles.container}>
          <img alt={'product'} src={product.preview}/>
          <div className={styles.product__info}>
            <p className={styles.description}>
              {product.description}
            </p>
            <div className={styles.reviews}>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <a>
                17 отзывов
              </a>
              <button>
                Оставить отзыв
              </button>
            </div>
            {/*<div className={styles.color}>*/}
            {/*  <div className={styles.color__item}>*/}
            {/*    <p>Цвет корпуса:</p>*/}
            {/*    <p>Серебристый кристалл</p>*/}
            {/*  </div>*/}
            {/*  <div className={styles.items}>*/}
            {/*    <img alt={'green'} src={'https://content2.onliner.by/catalog/device/header/9a2e959f690a819571a3306a35c19b8c.jpeg'}/>*/}
            {/*    <img alt={'white'} src={'https://content2.onliner.by/catalog/device/header/5238e392211ecea0f6e2747bec5c8b4e.jpeg'}/>*/}
            {/*    <img alt={'black'} src={'https://content2.onliner.by/catalog/device/header/0aac500c2297880b9f0572c51b211399.jpeg'}/>*/}
            {/*  </div>*/}
            {/*</div>*/}
            <div className={styles.price}>
              <h3>
                {product.price} р.
              </h3>
              <div className={styles.buttons}>
                <button>
                  15 предложений
                </button>
                <button>
                  График цен
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.images}>
        {product.photos.map((image, index) => (
          <div  onClick={() => setSelectedImg(image)} key={index}>
            <img alt={'product'} src={image}/>
          </div>
          ))}
      </div>
      {selectedImg && (
        <div className={styles.selectedPhoto}>
          <img alt={'product'} src={selectedImg} />
          <AiOutlineClose className={styles.close}  onClick={() => setSelectedImg(null)}/>
        </div>
        )}
      <div className={styles.recommendations}>
        <h2>
          Рекомендуем купить
        </h2>
        {recomendation.map((product, index) => (
        <div className={styles.block} key={index}>
          <div className={styles.img}>
            <img alt={'product'} src={product.img}/>
          </div>
          <div className={styles.recommendations__info}>
            <p className={styles.categories}>
              {product.categories}
            </p>
            <p className={styles.name}>
              {product.name}
            </p>
            <div className={styles.recommendations__price}>
              <h3 className={`${styles.price} ${product.discount !== null ? styles.sale : null}`}>
                от {product.price}р
              </h3>
              {product.discount && (
              <div className={styles.discount}>
                <AiFillFire />
                {product.discount}
              </div>
                )}
            </div>
          </div>
        </div>
          ))}
      </div>
    </div>
  )
}
