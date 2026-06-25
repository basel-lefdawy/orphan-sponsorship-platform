import { useForm, Controller } from "react-hook-form";
import { fetchWithAuth } from "../services/authService";
import { Button, MenuItem } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState, useEffect } from "react";
import StatusDialog from "../components/StatusDialog";
import FormSection from "./HelpRequest/FormSection";
import FormTextField from "./HelpRequest/FormTextField";
import FormSelect from "./HelpRequest/FormSelect";
import FormDatePicker from "./HelpRequest/FormDatePicker";
import "./HelpRequest/HelpRequest.css";

const defaultValues = {
  orphanName: "",
  orphanAge: "",
  orphanGender: "",
  sponsorName: "",
  sponsorPhone: "",
  sponsorEmail: "",
  sponsorshipType: "",
  startDate: null,
  notes: "",
};

const sponsorshipFields = [
  { name: "orphanName", label: "اسم اليتيم *", type: "text", rules: { required: "اسم اليتيم مطلوب" } },
  { name: "orphanAge", label: "عمر اليتيم *", type: "text", rules: { required: "العمر مطلوب" } },
  {
    name: "orphanGender", label: "جنس اليتيم *", type: "select", options: [
      { value: "ذكر", label: "ذكر" },
      { value: "أنثى", label: "أنثى" }
    ], rules: { required: "الجنس مطلوب" }
  },
  {
    name: "sponsorshipType", label: "نوع الكفالة *", type: "select", options: [
      { value: "شهرية", label: "شهرية" },
      { value: "سنوية", label: "سنوية" }
    ], rules: { required: "نوع الكفالة مطلوب" }
  },
  { name: "startDate", label: "تاريخ بدء الكفالة *", type: "date", rules: { required: "تاريخ البدء مطلوب" } },
  { name: "notes", label: "ملاحظات", type: "text" },
];

const sponsorFields = [
  { name: "sponsorName", label: "اسم الكفيل *", type: "text", rules: { required: "اسم الكفيل مطلوب" } },
  { name: "sponsorPhone", label: "رقم الجوال *", type: "text", rules: { required: "رقم الجوال مطلوب" } },
  {
    name: "sponsorEmail", label: "البريد الإلكتروني *", type: "text", rules: {
      required: "البريد الإلكتروني مطلوب",
      pattern: { value: /^\S+@\S+$/i, message: "البريد الإلكتروني غير صالح" }
    }
  },
];

const OrphanSponsorshipForm = () => {
  const API_URL = "https://694907ae1ee66d04a450ee44.mockapi.io/api/orphan-sponsorships";
  const { register, handleSubmit, control, reset, formState: { errors } } = useForm({ mode: "all", defaultValues });

  const [dialog, setDialog] = useState({
    open: false,
    type: "success",
    title: "",
    message: "",
  });
  const onSubmit = async (data) => {
    try {
      const response = await fetchWithAuth(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("فشل إرسال البيانات");
      setDialog({
        open: true,
        type: "success",
        title: "تم إرسال الطلب بنجاح",
        message: "تم إرسال بيانات الكفالة بنجاح، سيتم التواصل معك قريباً.",
      });
      reset(defaultValues);
    } catch (err) {
      setDialog({
        open: true,
        type: "error",
        title: "لم يتم إرسال الطلب",
        message: err.message || "حدث خطأ أثناء الإرسال",
      });
    }
  };

  const onError = () => {
    setDialog({
      open: true,
      type: "error",
      title: "لم يتم إرسال الطلب",
      message: "يرجى تعبئة جميع الحقول المطلوبة بشكل صحيح.",
    });
  };

  const renderField = (field) => {
    if (field.type === "text")
      return <FormTextField {...field} register={register} errors={errors} />;
    if (field.type === "select")
      return (
        <FormSelect {...field} register={register} errors={errors}>
          {field.options?.map(opt => <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>)}
        </FormSelect>
      );
    if (field.type === "date")
      return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <FormDatePicker {...field} control={control} errors={errors} />
        </LocalizationProvider>
      );
  };

  return (
    <>
      <form className="form" onSubmit={handleSubmit(onSubmit, onError)} dir="rtl">
        <h1 className="main-title">نموذج كفالة يتيم</h1>
        <FormSection title="بيانات اليتيم" fields={sponsorshipFields} renderField={renderField} />
        <FormSection title="بيانات الكفيل" fields={sponsorFields} renderField={renderField} />
        <div className="submit">
          <Button type="submit" variant="contained" className="submit-btn">✔ مصادقة وإرسال</Button>
        </div>
      </form>
      <StatusDialog
        open={dialog.open}
        type={dialog.type}
        title={dialog.title}
        message={dialog.message}
        duration={10000}
        onClose={() => setDialog({ ...dialog, open: false })}
      />
    </>
  );
};

export default OrphanSponsorshipForm;
