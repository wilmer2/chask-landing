import PropTypes from 'prop-types';
import { Search } from 'react-feather';
import { primaryColor } from 'shared/constants';
import styles from 'styles/Hero.module.sass';

const Hero = ({ branchOffice, shop, onSearchProducts }) => {
  const handleChangeText = (e) => onSearchProducts(e.target.value.toLowerCase());

  return (
    <div className="container-lg pb-2">
      <h1 className="h4">{branchOffice.nombreSucursal}</h1>
      <div className="d-flex justify-content-between align-items-center">
        <figure className={styles.logoContainer} style={{ background: branchOffice.colorSucursal }}>
          <img
            className={styles.logo}
            src={shop.imagenTienda}
            alt={`${branchOffice.nombreSucursal} logo`}
          />
        </figure>
        <div className={`${styles.searchContainer}`}>
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Buscar algún plato"
            onChange={handleChangeText}
          />
          <div className={styles.searchIconContainer}>
            <Search color={primaryColor} size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};

Hero.propTypes = {
  shop: PropTypes.shape({
    id: PropTypes.number,
    idUser: PropTypes.number,
    confirmarTienda: PropTypes.number,
    estadoTienda: PropTypes.number,
    emailTienda: PropTypes.string,
    emailUsuario: PropTypes.string,
    encargadoTienda: PropTypes.string,
    imagenTienda: PropTypes.string,
    nombreTienda: PropTypes.string,
    nombreUsuario: PropTypes.string,
    rucTienda: PropTypes.string,
    tipoTienda: PropTypes.string,
    razonSocialTienda: PropTypes.string,
  }).isRequired,
  branchOffice: PropTypes.shape({
    id: PropTypes.number,
    idTienda: PropTypes.number,
    colorSucursal: PropTypes.string,
    comisionSucursal: PropTypes.string,
    direccionSucursal: PropTypes.string,
    emailSucursal: PropTypes.string,
    encargadoSucursal: PropTypes.string,
    envioSucursal: PropTypes.number,
    estadoSucursal: PropTypes.string,
    latitud: PropTypes.number,
    longitud: PropTypes.number,
    nombreSucursal: PropTypes.string,
    nombreTienda: PropTypes.string,
    razonSocialSucursal: PropTypes.string,
    recepcionistaSucursal: PropTypes.string,
    recomendadoSucursal: PropTypes.string,
    restriccionSucursal: PropTypes.string,
    rucSucursal: PropTypes.string,
    telefonoSucursal: PropTypes.string,
    tiempoSucursal: PropTypes.number,
    tipoSucursal: PropTypes.string,
    whatsappSucursal: PropTypes.string,
    zonaSucursal: PropTypes.string,
  }).isRequired,
  onSearchProducts: PropTypes.func.isRequired,
};
export default Hero;
