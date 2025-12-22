// src/pages/ActivityPage/ActivityPage.jsx
import { useState, useEffect } from "react";
import Hero from "./ActivityPageComponents/ActivityHero/ActivityHero";
import ActivityCard from "./ActivityPageComponents/ActivityCards/ActivityCard";
import styles from "./ActivitiesPage.module.css";
import Button from "@mui/material/Button";
import SearchForActivity from "./ActivityPageComponents/SearchForActivity/SearchForActivity";
import BecomeVolunteer from "./ActivityPageComponents/BecomeVolunteer/BecomeVolunteer";

function Activities() {
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("https://mocki.io/v1/0f346fc4-1c35-49b2-97c8-551d28034522")
            .then(res => res.json())
            .then(data => {
                setActivities(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching activities:", err);
                setLoading(false);
            });
    }, []);

    const [visibleCount, setVisibleCount] = useState(4);
    const [searchInput, setSearchInput] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const handleSearch = () => {
        setSearchTerm(searchInput);
        setVisibleCount(4);
    };


    const filteredActivities =
        searchTerm.trim() === ""
            ? activities
            : activities.filter(
                (a) =>
                    a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    a.description.toLowerCase().includes(searchTerm.toLowerCase())
            );


    const handleLoadMore = () => {
        setVisibleCount((prev) => prev + 4);
    };

    return (
        <>
            <Hero />
            <SearchForActivity
                searchInput={searchInput}
                setSearchInput={setSearchInput}
                onSearch={handleSearch}
            />

            {loading ? (
                <div style={{ textAlign: "center", padding: "2rem" }}>
                    <h3>جارٍ تحميل الأنشطة</h3>
                </div>
            ) : (
                <div className={styles.cardsWrapper}>
                    {filteredActivities.slice(0, visibleCount).map((activity) => (
                        <ActivityCard key={activity.id} activity={activity} />
                    ))}
                </div>
            )}

            {visibleCount < filteredActivities.length && (
                <div style={{ textAlign: "center", margin: "2rem 0" }}>
                    <Button variant="contained" onClick={handleLoadMore}>
                        عرض المزيد
                    </Button>
                </div>
            )}
            <BecomeVolunteer activities={activities} />
        </>
    );
}

export default Activities;
