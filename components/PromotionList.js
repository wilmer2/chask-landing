import Slider from 'react-slick';
import PropTypes from 'prop-types';
import PromotionItem from 'components/PromotionItem';
import styles from 'styles/PromotionList.module.sass';

const PromotionList = ({ promotions }) => {
  const slidesToShowDesktop = () => {
    if (promotions.length > 2) {
      return 3;
    }

    if (promotions.length > 1) {
      return 2;
    }

    return 1;
  };
  const responsive = [
    {
      breakpoint: 2000,
      settings: {
        arrows: false,
        infinite: true,
        slidesToShow: slidesToShowDesktop(),
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        arrows: false,
        infinite: true,
        slidesToShow: promotions.length > 1 ? 2 : 1,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        arrows: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ];

  return (
    <div className={styles.container}>
      <h2 className={`${styles.title} h4`}>Promociones</h2>
      <Slider
        responsive={responsive}
        arrows={false}
        mobileFirst
        speed={500}
        autoplay
        autoplaySpeed={2000}
      >
        {promotions.map((promotion) => (
          <PromotionItem key={promotion.id} promotion={promotion} />
        ))}
      </Slider>
    </div>
  );
};

PromotionList.propTypes = {
  promotions: PropTypes.arrayOf(
    PropTypes.shape({
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
    }),
  ).isRequired,
};
export default PromotionList;
