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

export default Hero;
