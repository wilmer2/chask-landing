import styles from 'styles/Header.module.sass';
import { primaryColor } from 'shared/constants';
import { ShoppingCart } from 'react-feather';

const Header = () => (
  <header className={`${styles.header} container-xl`}>
    <figure className={styles.imgContainer}>
      <img className={styles.img} src="/assets/images/chaski-perfil.png" alt="Chaski logo" />
    </figure>
    <a className={styles.link} href="/">
      <div className="mr-2">
        <ShoppingCart size={17} color={primaryColor} />
      </div>
      <span>Registra tu tienda</span>
    </a>
  </header>
);

export default Header;
