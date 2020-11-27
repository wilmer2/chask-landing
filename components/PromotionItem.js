import styles from 'styles/PromotionItem.module.sass';

const PromotionItem = ({ promotion }) => (
  <div className="d-flex position-relative col-12 col-sm-12" style={{ maxWidth: '500px' }}>
    <div className={styles.infoContainer} style={{ background: promotion.colorProducto }}>
      <div className={styles.infoContent}>
        <div>
          <h3 className={styles.title}>{promotion.nombreProducto} </h3>
          <p className={styles.description}>{promotion.descripcionProducto.toLowerCase()}</p>
        </div>

        <div className={styles.priceContainer}>$/ {promotion.precioProducto.toFixed(2)}</div>
      </div>
    </div>

    <figure className={styles.imageContainer}>
      <img className={styles.image} src={promotion.urlImagen} alt="Promoción" />
    </figure>
  </div>
);

export default PromotionItem;
