import styles from 'styles/ProductList.module.sass';
import ProductItem from 'components/ProductItem';

const ProductList = () => (
  <div className={`${styles.container}`}>
    <h2 className={styles.title}>Carnes</h2>
    <div className="row">
      <ProductItem />
      <ProductItem />
      <ProductItem />
      <ProductItem />
    </div>
  </div>
);

export default ProductList;
