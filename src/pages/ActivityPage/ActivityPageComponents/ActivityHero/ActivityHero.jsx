// src/pages/ActivityPage/ActivityPageComponents/ActivityHero/ActivityHero.jsx
import styles from "./ActivitiesHero.module.css";
const ActivitiesHero = () => {
    return (
        <section className={styles.hero}>
            <div className={styles.container}>
                <h1 className={styles.title}>
                    أنشطتنا… حيث يتحول الدعم إلى ابتسامة
                </h1>
                <p className={styles.description}>
                    تعرف على الأنشطة التعليمية والترفيهية التي نقوم بها لإسعاد الأطفال
                    وتطوير مهاراتهم.
                </p>
            </div>
        </section>
    );
};

export default ActivitiesHero;