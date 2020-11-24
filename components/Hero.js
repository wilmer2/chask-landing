import styles from 'styles/Hero.module.sass';

const Hero = () => (
  <div className={styles.container}>
    <img
      className={styles.banner}
      src="https://www.innaturale.com/es/wp-content/uploads/2018/11/restaurantes-de-comida-rapida.jpg"
      alt="Restaurante banner"
    />

    <div className={styles.infoContainer}>
      <div className={styles.infoContent}>
        <figure className={styles.logoContainer}>
          <img
            className={styles.logo}
            src="https://www.innaturale.com/es/wp-content/uploads/2018/11/restaurantes-de-comida-rapida.jpg"
            alt="Restaurante logo"
          />
        </figure>
        <span className={`${styles.title} ml-2 ml-lg-3`}>Casa burger</span>
      </div>
    </div>
  </div>
);

export default Hero;
