import { useState } from "react";
import {
    getPastEvents,
    getFutureEvents,
    getNextEvent
} from "../../../../utils/eventUtils";
import {
    Button,
    TextField,
    Card,
    CardContent,
    Typography,
    CircularProgress,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
} from "@mui/material";
import styles from "./BecomeVolunteer.module.css";
import Activities from "../../ActivityPage";

const BecomeVolunteer = ({ activities }) => {
    const [showForm, setShowForm] = useState(false);
    const [showInfo, setShowInfo] = useState(false);
    const [loading, setLoading] = useState(false);
    const [upcomingEvent, setUpcomingEvent] = useState(null);
    const [openFutureModal, setOpenFutureModal] = useState(false);
    const [openPastModal, setOpenPastModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: ""
    });

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem("volunteerData", JSON.stringify(formData));
        alert("تم حفظ بياناتك بنجاح ✅");
        setShowForm(false);
    };

    const handleSearch = () => {
        setLoading(true);
        setShowInfo(false);
        setShowForm(false);

        const nextEvent = getNextEvent(activities);

        setTimeout(() => {
            setLoading(false);
            if (nextEvent) {
                setUpcomingEvent(nextEvent);
                setShowInfo(true);
            } else {
                alert("لا توجد أحداث مستقبلية متاحة");
            }
        }, 2000);
    };

    return (
        <div className={styles.wrapper}>
            <h2>كن متطوعاً معنا</h2>
            <p>انضم إلى فريقنا وشارك في الأنشطة الإنسانية والتعليمية للأطفال</p>

            <div className={styles.buttons}>
                <Button variant="contained" color="success" onClick={() => { setShowForm(true); setShowInfo(false) }}>انضم الآن</Button>
                <Button variant="outlined" color="success" onClick={handleSearch}>النشاط القادم</Button>
                <Button variant="outlined" color="primary" onClick={() => setOpenFutureModal(true)}>الأحداث المستقبلية</Button>
                <Button variant="outlined" color="secondary" onClick={() => setOpenPastModal(true)}>الأحداث الماضية</Button>
            </div>

            {loading && (
                <div className={styles.loading}>
                    <CircularProgress color="success" />
                    <p>جارٍ البحث عن الحدث القادم...</p>
                </div>
            )}

            {showInfo && upcomingEvent && (
                <Card className={styles.infoCard}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>🔍 الحدث القادم</Typography>
                        <Typography>📌 النشاط: {upcomingEvent.title}</Typography>
                        <Typography>📅 التاريخ: {upcomingEvent.date}</Typography>
                        <Typography>⏰ الساعة: {upcomingEvent.time}</Typography>
                        <Typography>📍 المكان: {upcomingEvent.location}</Typography>
                        <Typography>💵 السعر: ${upcomingEvent.price}</Typography>
                        <Typography variant="body2" color="textSecondary">{upcomingEvent.note}</Typography>
                    </CardContent>
                </Card>
            )}

            {showForm && (
                <form className={styles.form} onSubmit={handleSubmit}>
                    <TextField label="الاسم" name="name" fullWidth required onChange={handleChange} />
                    <TextField label="البريد الإلكتروني" name="email" type="email" fullWidth required onChange={handleChange} />
                    <TextField label="رقم الهاتف" name="phone" fullWidth required onChange={handleChange} />
                    <Button type="submit" variant="contained" color="success" fullWidth>إرسال</Button>
                </form>
            )}

            {/* مودال الأحداث المستقبلية */}
            <Dialog open={openFutureModal} onClose={() => setOpenFutureModal(false)} fullWidth maxWidth="sm">
                <DialogTitle>الأحداث المستقبلية</DialogTitle>
                <DialogContent>
                    {activities.length === 0 ? <Typography>لا توجد أحداث مستقبلية أخرى</Typography> :
                        activities.map(event => (
                            <Card key={event.id} className={styles.infoCard} style={{ marginBottom: "12px" }}>
                                <CardContent>
                                    <Typography>
                                        📅 {event.date} - {" "}
                                        <span
                                            style={{ cursor: "pointer", textDecoration: "underline", color: "#1976d2", fontWeight: "bold" }}
                                            onClick={() => setSelectedEvent(event)}
                                        >
                                            {event.title}
                                        </span>
                                    </Typography>
                                </CardContent>
                            </Card>
                        ))
                    }
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenFutureModal(false)} color="primary">إغلاق</Button>
                </DialogActions>
            </Dialog>

            {/* مودال الأحداث الماضية */}
            <Dialog open={openPastModal} onClose={() => setOpenPastModal(false)} fullWidth maxWidth="sm">
                <DialogTitle>الأحداث الماضية</DialogTitle>
                <DialogContent>
                    {activities.length === 0 ? <Typography>لا توجد أحداث سابقة</Typography> :
                        activities.map(event => (
                            <Card key={event.id} className={styles.infoCard} style={{ marginBottom: "12px" }}>
                                <CardContent>
                                    <Typography>
                                        📅 {event.date} - {" "}
                                        <span
                                            style={{ cursor: "pointer", textDecoration: "underline", color: "#1976d2", fontWeight: "bold" }}
                                            onClick={() => setSelectedEvent(event)}
                                        >
                                            {event.title}
                                        </span>
                                    </Typography>
                                </CardContent>
                            </Card>
                        ))
                    }
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenPastModal(false)} color="secondary">إغلاق</Button>
                </DialogActions>
            </Dialog>

            {/* مودال تفاصيل الحدث */}
            <Dialog open={!!selectedEvent} onClose={() => setSelectedEvent(null)} fullWidth maxWidth="sm">
                <DialogTitle>تفاصيل الحدث</DialogTitle>
                <DialogContent>
                    {selectedEvent && (
                        <Card className={styles.infoCard} style={{ border: "none", boxShadow: "none" }}>
                            <CardContent>
                                <Typography>📌 النشاط: {selectedEvent.title}</Typography>
                                <Typography>📅 التاريخ: {selectedEvent.date}</Typography>
                                <Typography>⏰ الساعة: {selectedEvent.time}</Typography>
                                <Typography>📍 المكان: {selectedEvent.location}</Typography>
                                <Typography>💵 السعر: ${selectedEvent.price}</Typography>
                                <Typography variant="body2" color="textSecondary">{selectedEvent.note}</Typography>
                            </CardContent>
                        </Card>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setSelectedEvent(null)} color="primary">إغلاق</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default BecomeVolunteer;
