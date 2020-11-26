import styles from 'styles/Menu.module.sass';

const Menu = () => (
  <div className={styles.container}>
    <h2 className="h5 mb-3 d-none d-lg-block ml-1" style={{ color: '#273791' }}>
      Categorías
    </h2>

    <ul className={styles.tabs}>
      <li className={styles.itemActive}>
        <a className={styles.tabActive} href="/">
          Carnes
        </a>
      </li>
      <li className={styles.item}>
        <a className={styles.tabItem} href="/">
          Sopas
        </a>
      </li>
      <li className={styles.item}>
        <a className={styles.tabItem} href="/">
          Ensaladas
        </a>
      </li>
      <li className={styles.item}>
        <a className={styles.tabItem} href="/">
          Arroz
        </a>
      </li>
      <li className={styles.item}>
        <a className={styles.tabItem} href="/">
          Empanada
        </a>
      </li>
      <li className={styles.item}>
        <a className={styles.tabItem} href="/">
          Tostones
        </a>
      </li>
    </ul>
  </div>
);

export default Menu;
