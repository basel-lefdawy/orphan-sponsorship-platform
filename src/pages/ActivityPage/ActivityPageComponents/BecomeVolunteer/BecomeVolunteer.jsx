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
    DialogActions,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Box,
    IconButton
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styles from "./BecomeVolunteer.module.css";
const BecomeVolunteer = ({ activities }) => {
    const [showForm, setShowForm] = useState(false);
    const [showInfo, setShowInfo] = useState(false);
    const [loading, setLoading] = useState(false);
    const [upcomingEvent, setUpcomingEvent] = useState(null);
    const [openFutureModal, setOpenFutureModal] = useState(false);
    const [openPastModal, setOpenPastModal] = useState(false);


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

            <Dialog open={openFutureModal} onClose={() => setOpenFutureModal(false)} fullWidth maxWidth="md">
                <DialogTitle>الأحداث المستقبلية</DialogTitle>
                <DialogContent>
                    {getFutureEvents(activities).length === 0 ? <Typography>لا توجد أحداث مستقبلية أخرى</Typography> :
                        getFutureEvents(activities).map(event => (
                            <Accordion key={event.id} sx={{ mb: 1, borderRadius: "8px !important", boxShadow: 1 }}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography sx={{ fontWeight: "bold", width: "33%", flexShrink: 0 }}>
                                        📅 {event.date}
                                    </Typography>
                                    <Typography sx={{ color: "text.secondary" }}>
                                        {event.title}
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                                        <Typography>⏰ <span style={{ fontWeight: "bold" }}>الساعة:</span> {event.time}</Typography>
                                        <Typography>📍 <span style={{ fontWeight: "bold" }}>المكان:</span> {event.location}</Typography>
                                        <Typography>💵 <span style={{ fontWeight: "bold" }}>السعر:</span> {event.price ? `$${event.price}` : "مجاني"}</Typography>
                                        {event.note && (
                                            <Typography variant="body2" sx={{ mt: 1, p: 1, bgcolor: "#f5f5f5", borderRadius: "4px" }}>
                                                💡 {event.note}
                                            </Typography>
                                        )}
                                        <Button
                                            variant="contained"
                                            color="success"
                                            sx={{ mt: 2, alignSelf: "flex-end" }}
                                            onClick={() => {
                                                setOpenFutureModal(false);
                                                setShowForm(true);
                                            }}
                                        >
                                            انضم لهذا النشاط
                                        </Button>
                                    </Box>
                                </AccordionDetails>
                            </Accordion>
                        ))
                    }
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenFutureModal(false)} color="primary">إغلاق</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openPastModal} onClose={() => setOpenPastModal(false)} fullWidth maxWidth="md">
                <DialogTitle>الأحداث الماضية</DialogTitle>
                <DialogContent>
                    {getPastEvents(activities).length === 0 ? <Typography>لا توجد أحداث سابقة</Typography> :
                        getPastEvents(activities).map(event => (
                            <Accordion key={event.id} sx={{ mb: 1, borderRadius: "8px !important", boxShadow: 1 }}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography sx={{ fontWeight: "bold", width: "33%", flexShrink: 0 }}>
                                        📅 {event.date}
                                    </Typography>
                                    <Typography sx={{ color: "text.secondary" }}>
                                        {event.title}
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                                        <Typography>⏰ <span style={{ fontWeight: "bold" }}>الساعة:</span> {event.time}</Typography>
                                        <Typography>📍 <span style={{ fontWeight: "bold" }}>المكان:</span> {event.location}</Typography>
                                        <Typography>💵 <span style={{ fontWeight: "bold" }}>السعر:</span> {event.price ? `$${event.price}` : "مجاني"}</Typography>
                                        {event.note && (
                                            <Typography variant="body2" sx={{ mt: 1, p: 1, bgcolor: "#f5f5f5", borderRadius: "4px" }}>
                                                💡 {event.note}
                                            </Typography>
                                        )}
                                    </Box>
                                </AccordionDetails>
                            </Accordion>
                        ))
                    }
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenPastModal(false)} color="secondary">إغلاق</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default BecomeVolunteer;
