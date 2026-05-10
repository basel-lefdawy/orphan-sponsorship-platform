import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, MenuItem } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

import StatusDialog from "../StatusDialog";
import FormSection from "../../pages/HelpRequest/FormSection";
import FormTextField from "../../pages/HelpRequest/FormTextField";
import FormSelect from "../../pages/HelpRequest/FormSelect";
import FormDatePicker from "../../pages/HelpRequest/FormDatePicker";
import { paymentFields, bankFields } from "../../pages/HelpRequest/formFields";
import { sponsorDefaultValues } from "./sponsorDefaultValues";
import {
  sponsorFields,
  sponsorshipDetailFields,
  authorizedFields,
} from "./sponsorFormFields";
import "../../pages/HelpRequest/HelpRequest.css";

const SponsorFormPage = () => {
  const [dialog, setDialog] = useState({
    open: false,
    type: "success",
    title: "",
    message: "",
  });
  const [showBankFields, setShowBankFields] = useState(false);

  const { register, handleSubmit, watch, control, reset, formState: { errors } } = useForm({
    mode: "all",
    defaultValues: sponsorDefaultValues,
  });

  const paymentMethod = watch("paymentMethod");

  useEffect(() => {
    setShowBankFields(paymentMethod === "BankAccount");
  }, [paymentMethod]);

  /** اليتيم المختار من الصفحة السابقة — كما في الإصدار السابق */
  const [orphanFromSelection, setOrphanFromSelection] = useState(null);
  useEffect(() => {
    try {
      const raw = localStorage.getItem("selectedOrphan");
      setOrphanFromSelection(raw ? JSON.parse(raw) : null);
    } catch {
      setOrphanFromSelection(null);
    }
  }, []);

  const renderField = (field) => {
    if (field.type === "number") {
      return (
        <FormTextField
          name={field.name}
          label={field.label}
          register={register}
          errors={errors}
          rules={field.rules || {}}
          type="number"
        />
      );
    }
    if (field.type === "text") {
      return <FormTextField {...field} register={register} errors={errors} />;
    }
    if (field.type === "select") {
      return (
        <FormSelect {...field} register={register} errors={errors}>
          {field.options?.map((opt) => (
            <MenuItem key={opt.value} value={opt.value}>
              {opt.label}
            </MenuItem>
          ))}
        </FormSelect>
      );
    }
    if (field.type === "date") {
      return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <FormDatePicker {...field} control={control} errors={errors} />
        </LocalizationProvider>
      );
    }
    return null;
  };

  const genderToStored = (g) => {
    if (g === "Male") return "male";
    if (g === "Female") return "female";
    return "";
  };

  const formatDateVal = (d) => (d ? dayjs(d).format("YYYY-MM-DD") : "");

  const onSubmit = (data) => {
    const payload = {
      sponsor: {
        id: data.sponsorId,
        name: data.sponsorName,
        father: data.sponsorFatherName,
        grandfather: data.sponsorGrandfatherName,
        family: data.sponsorFamilyName,
        birthDate: formatDateVal(data.sponsorBirthDate),
        gender: genderToStored(data.sponsorGender),
        workType: data.sponsorWorkType,
        country: data.sponsorCountry,
        cityName: data.sponsorCity,
        streetName: data.sponsorStreet || "",
        MobilePhone: data.sponsorPhone,
        LandlinePhone: data.sponsorHomePhone || "",
        email: data.sponsorEmail,
      },
      sponsoring: {
        orphanId: orphanFromSelection?.orphanId,
        sponsoringType: orphanFromSelection?.sponsoringType,
        monthlyAmount: data.monthlyAmount,
        startDate: formatDateVal(data.sponsorshipStartDate),
        endDate: formatDateVal(data.sponsorshipEndDate),
        paymentMethod: data.paymentMethod === "BankAccount" ? "bank" : "cash",
        bankName: data.BankName || "",
        accountNumber: data.bankAccount || "",
        BranchNumber: data.BranchNumber || "",
        AccountHolderName: data.AccountHolderName || "",
        IBAN: data.IBAN || "",
      },
      agent: {
        id: data.agentId || "",
        name: data.agentName,
        father: data.agentFatherName,
        grandfather: data.agentGrandfatherName,
        family: data.agentFamilyName,
        workType: data.agentWorkType || "",
        gender: genderToStored(data.agentGender),
        kinship: data.agentKinship,
        MobilePhone: data.agentPhone,
        country: data.agentCountry,
        cityName: data.agentCity,
        streetName: data.agentStreet || "",
      },
    };

    localStorage.setItem("sponsoringFormData", JSON.stringify(payload));

    setDialog({
      open: true,
      type: "success",
      title: "تم المصادقة",
      message:
        orphanFromSelection?.orphanId != null
          ? "تم حفظ الطلب ومطابقته؛ يمكنك متابعة العمل حسب سياسات الجمعية."
          : "تم حفظ الطلب ومطابقته.",
    });
    reset(sponsorDefaultValues);
  };

  const onError = () => {
    setDialog({
      open: true,
      type: "error",
      title: "لم يتم إرسال الطلب",
      message: "يرجى تعبئة جميع الحقول المطلوبة بشكل صحيح.",
    });
  };

  return (
    <>
      <form className="form" onSubmit={handleSubmit(onSubmit, onError)} dir="rtl">
        <h1 className="main-title">طلب كفالة</h1>

        <FormSection title="معلومات الكفيل" fields={sponsorFields} renderField={renderField} />

        <FormSection title="طريقة الصرف" fields={paymentFields} renderField={renderField} />

        {showBankFields && (
          <FormSection title="تفاصيل البنك" fields={bankFields} renderField={renderField} />
        )}

        <FormSection title="تفاصيل الكفالة" fields={sponsorshipDetailFields} renderField={renderField} />

        <FormSection title="معلومات المفوض" fields={authorizedFields} renderField={renderField} />

        <div className="submit">
          <Button type="submit" variant="contained" className="submit-btn">
            ✔ مصادقة وإرسال
          </Button>
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

export default SponsorFormPage;
