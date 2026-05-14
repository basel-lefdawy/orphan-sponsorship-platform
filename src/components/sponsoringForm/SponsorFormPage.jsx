// SponsorFormPage.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
import { sponsorFields, sponsorshipDetailFields, authorizedFields } from "./sponsorFormFields";

import "../../pages/HelpRequest/HelpRequest.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const SponsorFormPage = () => {
  const [dialog, setDialog] = useState({
    open: false,
    type: "success",
    title: "",
    message: "",
  });

  const [showBankFields, setShowBankFields] = useState(false);

  const { id } = useParams();

  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors },
  } = useForm({
    mode: "all",
    defaultValues: sponsorDefaultValues,
  });

  const paymentMethod = watch("paymentMethod");

  useEffect(() => {
    setShowBankFields(paymentMethod === "BankAccount");
  }, [paymentMethod]);

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
    return null;
  };

  const formatDateVal = (d) => {
    return d ? dayjs(d).format("YYYY-MM-DD") : null;
  };

  const onSubmit = async (data) => {
    try {
      const payload = {
        // ─── معلومات الكفيل ─────────────────────────
        identityNumber: data.sponsorId,
        firstName: data.sponsorName,
        fatherName: data.sponsorFatherName,
        grandfatherName: data.sponsorGrandfatherName,
        familyName: data.sponsorFamilyName,
        dateOfBirth: formatDateVal(data.sponsorBirthDate),
        gender: genderToStored(data.sponsorGender),
        jobType: data.sponsorWorkType,
        country: data.sponsorCountry,
        city: data.sponsorCity,
        street: data.sponsorStreet || null,
        mobile: data.sponsorPhone,
        phone: data.sponsorHomePhone || null,
        email: data.sponsorEmail,

        // ─── تفاصيل الكفالة ──────────────────────────
        orphanId: Number(id),
        monthlySAmount: Number(data.monthlyAmount),
        startingSDate: formatDateVal(data.sponsorshipStartDate),
        endSDate: formatDateVal(data.sponsorshipEndDate) || null,
        paymentMethod: data.paymentMethod === "BankAccount" ? "bank_transfer" : "cash",
        bankName: data.BankName || null,
        branchNumber: data.BranchNumber || null,
        accountNumber: data.bankAccount || null,
        accountHolderName: data.AccountHolderName || null,
        iban: data.IBAN || null,

        // ─── معلومات المفوض ───────────────────────────
        delegateIdentityNumber: data.agentId || null,
        delegateFirstName: data.agentName || null,
        delegateFatherName: data.agentFatherName || null,
        delegateGrandfatherName: data.agentGrandfatherName || null,
        delegateFamilyName: data.agentFamilyName || null,
        delegateJobType: data.agentWorkType || null,
        delegateGender: genderToStored(data.agentGender) || null,
        delegateRelationship: data.agentKinship || null,
        delegateCountry: data.agentCountry || null,
        delegateCity: data.agentCity || null,
        delegateStreet: data.agentStreet || null,
        delegateMobile: data.agentPhone || null,
      };

      const response = await fetch(`${API_BASE_URL}/api/sponsorship-requests`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "فشل إرسال الطلب");
      }

      setDialog({
        open: true,
        type: "success",
        title: "تم إرسال الطلب",
        message: "تم إرسال طلب الكفالة بنجاح، سيتم مراجعته من قبل الإدارة",
      });

      reset(sponsorDefaultValues);
    } catch (error) {
      console.error(error);
      setDialog({
        open: true,
        type: "error",
        title: "فشل الإرسال",
        message: error.message || "حدث خطأ أثناء إرسال الطلب",
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

  return (
    <>
      <form
        className="form"
        onSubmit={handleSubmit(onSubmit, onError)}
        dir="rtl"
      >
        <h1 className="main-title">طلب كفالة</h1>

        <FormSection
          title="معلومات الكفيل"
          fields={sponsorFields}
          renderField={renderField}
        />

        <FormSection
          title="طريقة الصرف"
          fields={paymentFields}
          renderField={renderField}
        />

        {showBankFields && (
          <FormSection
            title="تفاصيل البنك"
            fields={bankFields}
            renderField={renderField}
          />
        )}

        <FormSection
          title="تفاصيل الكفالة"
          fields={sponsorshipDetailFields}
          renderField={renderField}
        />

        <FormSection
          title="معلومات المفوض"
          fields={authorizedFields}
          renderField={renderField}
        />

        <div className="submit">
          <Button
            type="submit"
            variant="contained"
            className="submit-btn"
          >
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