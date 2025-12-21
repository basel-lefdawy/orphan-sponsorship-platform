import { useNavigate } from "react-router-dom";
import styles from "./ActivityCard.module.css";

const ActivityCard = ({ activity }) => {
    const navigate = useNavigate();

    return (
        <div
            className={styles.card}
            onClick={() => navigate(`/activities/${activity.id}`)}
        >
            <img
                src={activity.images[0]}
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