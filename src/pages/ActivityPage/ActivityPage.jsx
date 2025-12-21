import { useState } from "react";
import Hero from "./ActivityPageComponents/ActivityHero/ActivityHero";
import ActivityCard from "./ActivityPageComponents/ActivityCards/ActivityCard";
import styles from "./ActivitiesPage.module.css";
import Button from "@mui/material/Button";
import SearchForActivity from "./ActivityPageComponents/SearchForActivity/SearchForActivity";

function Activities() {
    const activities = [
        {
            id: 1,
            title: "رحلة جبلية",
            description: "استمتع بالمناظر الطبيعية أثناء التسلق على الجبال",
            date: "2025-12-20",
            images: [
                "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c2VlfGVufDB8fDB8fHww",
                "https://images.unsplash.com/photo-1550522667-09c9bdb293a1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c2VlfGVufDB8fDB8fHww"
            ],
            location: "جبال القدس",
            participants: 15,
            category: "رحلات"
        },
        {
            id: 2,
            title: "ورشة رسم",
            description: "تعلم أساسيات الرسم بالألوان المائية",
            date: "2025-12-21",
            images: [
                "https://images.unsplash.com/photo-1629822908853-b1d2a39ece98?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGFpbnRpbmclMjBraWRzfGVufDB8fDB8fHww"
            ],
            location: "الدار الرئيسية",
            participants: 10,
            category: "فن"
        },
        {
            id: 3,
            title: "تلاوة القرآن الكريم",
            description: "جلسة لتعليم الأطفال تلاوة القرآن",
            date: "2025-12-22",
            images: [
                "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cXVyYW58ZW58MHx8MHx8fDA%3D"
            ],
            location: "المسجد",
            participants: 20,
            category: "تعليم"
        },
        {
            id: 4,
            title: "ورشة موسيقى",
            description: "تعلم العزف على آلات موسيقية مختلفة",
            date: "2025-12-23",
            images: [
                "https://images.unsplash.com/photo-1723035092325-03ad613d3dae?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bXVzaWMlMjBhbmQlMjBraWRzfGVufDB8fDB8fHww"
            ],
            location: "الدار الرئيسية",
            participants: 12,
            category: "فن"
        },
        {
            id: 5,
            title: "زيارة متحف",
            description: "جولة تعليمية للأطفال في متحف العلوم والتاريخ",
            date: "2025-12-24",
            images: [
                "https://images.unsplash.com/photo-1491156855053-9cdff72c7f85?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bXVzZXVtfGVufDB8fDB8fHww"
            ],
            location: "متحف المدينة",
            participants: 18,
            category: "تعليم"
        },
        {
            id: 6,
            title: "رحلة بحرية",
            description: "استمتع بالأنشطة المائية على شاطئ البحر",
            date: "2025-12-25",
            images: [
                "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHNlZXxlbnwwfHwwfHx8MA%3D%3D"
            ],
            location: "شاطئ المدينة",
            participants: 20,
            category: "رحلات"
        },
        {
            id: 7,
            title: "ورشة حياكة",
            description: "تعلم أساسيات الحياكة والخياطة",
            date: "2025-12-26",
            images: [
                "https://images.unsplash.com/photo-1578353022142-09264fd64295?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2V3aW5nfGVufDB8fDB8fHww"
            ],
            location: "الدار الرئيسية",
            participants: 8,
            category: "فن"
        },
        {
            id: 8,
            title: "يوم رياضي",
            description: "أنشطة رياضية متنوعة للأطفال في الحديقة",
            date: "2025-12-27",
            images: [
                "https://images.unsplash.com/photo-1486286701208-1d58e9338013?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Zm9vdGJhbGx8ZW58MHx8MHx8fDA%3D"
            ],
            location: "الحديقة العامة",
            participants: 25,
            category: "رياضة"
        },
        {
            id: 9,
            title: "ورشة تلوين الطين",
            description: "نشاط فني لتشكيل وتلوين الطين",
            date: "2025-12-28",
            images: [
                "https://images.unsplash.com/photo-1762951045576-ae21990c2c46?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fENsYXklMjBjb2xvcmluZ3xlbnwwfHwwfHx8MA%3D%3D"
            ],
            location: "الدار الرئيسية",
            participants: 14,
            category: "فن"
        },
        {
            id: 10,
            title: "مسرحية للأطفال",
            description: "عرض مسرحي ترفيهي وتعليمي للأطفال",
            date: "2025-12-29",
            images: [
                "https://images.unsplash.com/photo-1710980350236-816833b63c4f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fGElMjBwbGF5fGVufDB8fDB8fHww"
            ],
            location: "المسرح البلدي",
            participants: 30,
            category: "فن"
        }
    ];

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
        setVisibleCount((prev) => prev + 2);
    };

    return (
        <>
            <Hero />
            <SearchForActivity
                searchInput={searchInput}
                setSearchInput={setSearchInput}
                onSearch={handleSearch}
            />

            <div className={styles.cardsWrapper}>
                {filteredActivities.slice(0, visibleCount).map((activity) => (
                    <ActivityCard key={activity.id} activity={activity} />
                ))}
            </div>

            {visibleCount < filteredActivities.length && (
                <div style={{ textAlign: "center", margin: "2rem 0" }}>
                    <Button variant="contained" onClick={handleLoadMore}>
                        عرض المزيد
                    </Button>
                </div>
            )}
        </>
    );
}

export default Activities;
