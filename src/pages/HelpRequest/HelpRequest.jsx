import { useForm, Controller } from "react-hook-form";
import { Button, MenuItem } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState, useEffect } from "react";
import StatusDialog from "../../components/StatusDialog";
import FormSection from "./FormSection";
import FormTextField from "./FormTextField";
import FormSelect from "./FormSelect";
import FormDatePicker from "./FormDatePicker";
import "./HelpRequest.css";
import { defaultValues } from "./defaultValues"; 

import {
  orphanFields,
  guardianFields,
  paymentFields,
  bankFields,
  familyFields,
  conditionalFatherFields,
  conditionalMotherFields,
  conditionalFields
} from "./formFields";

const HelpRequest = () => {
  const API_URL = "https://694907ae1ee66d04a450ee44.mockapi.io/api/help-requests";
  const { register, handleSubmit, watch, control, reset, formState: { errors } } = useForm({ mode: "all", defaultValues });

  const [showBankFields, setShowBankFields] = useState(false);
  const [conditionalFormFields, setConditionalFormFields] = useState([]);

  const [dialog, setDialog] = useState({
    open: false,
    type: "success",
    title: "",
    message: "",
  });

  const paymentMethod = watch("paymentMethod");
  useEffect(() => {
    setShowBankFields(paymentMethod === "BankAccount");
  }, [paymentMethod]);

  
  const DeceasedPerson = watch("DeceasedPerson");
  useEffect(() => {
    let fields = [];
    if (DeceasedPerson === "Father") fields = conditionalFatherFields;
    else if (DeceasedPerson === "Mother") fields = conditionalMotherFields;
    else if (DeceasedPerson === "Both") fields = conditionalFields;
    setConditionalFormFields(fields);
  }, [DeceasedPerson]);

  const onSubmit = async (data) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("فشل إرسال البيانات");

      setDialog({
        open: true,
        type: "success",
        title: "تم إرسال الطلب بنجاح",
        message: "لقد تم إرسال بياناتك بنجاح، تحتاج بعض الوقت لفحصها من قبل الجمعية.",
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
        <h1 className="main-title">كفالة يتيم</h1>

        <FormSection title="معلومات اليتيم" fields={orphanFields} renderField={renderField} />
        <FormSection title="معلومات ولي الأمر" fields={guardianFields} renderField={renderField} />
        <FormSection title="طريقة الصرف" fields={paymentFields} renderField={renderField}/>

        {showBankFields && (
          <FormSection title="تفاصيل البنك" fields={bankFields} renderField={renderField} />
        )}

        <FormSection title="تفاصيل العائلة" fields={familyFields} renderField={renderField} />

        <FormSection fields={conditionalFormFields} renderField={renderField} />

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

export default HelpRequest;
