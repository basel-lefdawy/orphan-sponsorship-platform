// src/pages/ActivityPage/ActivityPageComponents/ActivityCards/ActivityCard.jsx
import styles from "./ActivityCard.module.css";

const ActivityCard = ({ activity }) => {
    return (
        <div
            className={styles.card}
        >
            <img
                src={activity.image}
                alt={activity.title}
                className={styles.image}
            />
            <h3 className={styles.title}>{activity.title}</h3>
            <p className={styles.description}>{activity.description}</p>
            <span className={styles.date}>{activity.date}</span>
        </div>
    );
};

export default ActivityCard;