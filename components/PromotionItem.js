import PropTypes from 'prop-types';
import styles from 'styles/PromotionItem.module.sass';

const PromotionItem = ({ promotion }) => (
  <div className={`${styles.container} d-flex position-relative col-12 col-sm-12`}>
    <div className={styles.infoContainer} style={{ background: promotion.colorProducto }}>
      <div className={styles.infoContent}>
        <div>
          <h3 className={styles.title}>{promotion.nombreProducto}</h3>
          <p className={styles.description}>{promotion.descripcionProducto.toLowerCase()}</p>
        </div>

        <div className={styles.priceContainer}>
          $/
          {promotion.precioProducto.toFixed(2)}
        </div>
      </div>
    </div>

    <figure className={styles.imageContainer}>
      <img className={styles.image} src={promotion.urlImagen} alt="Promoción" />
    </figure>
  </div>
);

PromotionItem.propTypes = {
  promotion: PropTypes.shape({
    id: PropTypes.number,
    idCategoria: PropTypes.number,
    idSucursal: PropTypes.number,
    idTipo: PropTypes.number,
    categoriaProducto: PropTypes.string,
    colorProducto: PropTypes.string,
    descripcionExtendidaProducto: PropTypes.string,
    descripcionProducto: PropTypes.string,
    descuentoProducto: PropTypes.number,
    diasProducto: PropTypes.string,
    estadoProducto: PropTypes.string,
    fechaProducto: PropTypes.string,
    horaFinalProducto: PropTypes.string,
    horaInicialProducto: PropTypes.string,
    nombreProducto: PropTypes.string,
    pesoProducto: PropTypes.number,
    precioProducto: PropTypes.number,
    sucursal: PropTypes.string,
    tipoProducto: PropTypes.string,
    urlImagen: PropTypes.string,
    volumenProducto: PropTypes.number,
  }).isRequired,
};

export default PromotionItem;
