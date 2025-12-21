import Hero from "./ActivityPageComponents/ActivityHero/ActivityHero";
import ActivityCard from "./ActivityPageComponents/ActivityCards/ActivityCard";
import styles from "./ActivitiesPage.module.css";
function Activities() {
const activities = [
    {
        id: 1,
        title: "رحلة جبلية",
        description: "استمتع بالمناظر الطبيعية أثناء التسلق على الجبال",
        date: "2025-12-20",
        images: [
            "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=800&q=80"
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
            "https://dayswithgrey.com/wp-content/uploads/2022/11/how-to-paint-with-kids-105.jpg"
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
            "https://jomalquran.b-cdn.net/wp-content/uploads/2023/02/quran-kids.jpg"
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
            "https://images.unsplash.com/photo-1511376777868-611b54f68947?auto=format&fit=crop&w=800&q=80"
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
            "https://images.unsplash.com/photo-1581091012184-7b0f90d174a4?auto=format&fit=crop&w=800&q=80"
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
            "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80"
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
            "https://images.unsplash.com/photo-1617196031971-779a34893026?auto=format&fit=crop&w=800&q=80"
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
            "https://images.unsplash.com/photo-1599058917210-f0b99b9f0d06?auto=format&fit=crop&w=800&q=80"
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
            "https://images.unsplash.com/photo-1599086892842-78dc399c8a7f?auto=format&fit=crop&w=800&q=80"
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
            "https://images.unsplash.com/photo-1602810316733-3e99177d8f2b?auto=format&fit=crop&w=800&q=80"
        ],
        location: "المسرح البلدي",
        participants: 30,
        category: "فن"
    }
];

    return (
        <>
            <Hero />
            <div className={styles.cardsWrapper}>
                {activities.map((activity) => (
                    <ActivityCard key={activity.id} activity={activity} />
                ))}
            </div>

        </>
    );
}

export default Activities;
