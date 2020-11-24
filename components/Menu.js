import styles from 'styles/Menu.module.sass';

const Menu = () => (
  <div className={styles.container}>
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
