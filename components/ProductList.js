import styles from 'styles/ProductList.module.sass';
import ProductItem from 'components/ProductItem';

const ProductList = ({ productCategory, productListData }) => (
  <div className={`${styles.container}`}>
    <h2 className={styles.title}>{productCategory}</h2>
    <div className="row">
      {productListData.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  </div>
);

export default ProductList;
