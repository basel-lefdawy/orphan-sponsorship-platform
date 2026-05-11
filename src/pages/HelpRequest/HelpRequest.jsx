import { useForm } from "react-hook-form";
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
  conditionalFields,
} from "./formFields";

const HelpRequest = () => {

  // BACKEND API
  const API_URL = "http://localhost:5000/api/help-requests";

  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors },
  } = useForm({
    mode: "all",
    defaultValues,
  });

  const [showBankFields, setShowBankFields] = useState(false);

  const [conditionalFormFields, setConditionalFormFields] = useState([]);

  const [dialog, setDialog] = useState({
    open: false,
    type: "success",
    title: "",
    message: "",
  });

  // =========================
  // PAYMENT METHOD WATCHER
  // =========================
  const paymentMethod = watch("paymentMethod");

  useEffect(() => {
    setShowBankFields(paymentMethod === "BankAccount");
  }, [paymentMethod]);

  // =========================
  // DECEASED PERSON WATCHER
  // =========================
  const DeceasedPerson = watch("DeceasedPerson");

  useEffect(() => {

    let fields = [];

    if (DeceasedPerson === "Father") {
      fields = conditionalFatherFields;
    }

    else if (DeceasedPerson === "Mother") {
      fields = conditionalMotherFields;
    }

    else if (DeceasedPerson === "Both") {
      fields = conditionalFields;
    }

    setConditionalFormFields(fields);

  }, [DeceasedPerson]);

  // =========================
  // SUBMIT
  // =========================
  const onSubmit = async (data) => {

    try {

      // تنظيف وتحويل البيانات
      const formattedData = {

        ...data,

        // numbers
        FamilyMember: Number(data.FamilyMember),

        MonthlyIncome: Number(data.MonthlyIncome),

        // email
        email: data.email?.trim().toLowerCase(),

        // phone
        phoneNumber: data.phoneNumber?.trim(),

        // IDs
        OrphanID: data.OrphanID?.trim(),

        GuardianID: data.GuardianID?.trim(),

        // bank
        IBAN: data.IBAN?.trim(),

        bankAccount: data.bankAccount?.trim(),
      };

      // إذا الدفع نقدي احذف بيانات البنك
      if (formattedData.paymentMethod === "Cash") {

        delete formattedData.IBAN;

        delete formattedData.bankAccount;
      }

      console.log("FINAL DATA:", formattedData);

      const response = await fetch(API_URL, {

        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(formattedData),
      });

      const result = await response.json();

      if (!response.ok) {

        throw new Error(
          result.message || "فشل إرسال البيانات"
        );
      }

      // SUCCESS
      setDialog({
        open: true,
        type: "success",
        title: "تم إرسال الطلب بنجاح",
        message:
          "لقد تم إرسال بياناتك بنجاح، تحتاج بعض الوقت لفحصها من قبل الجمعية.",
      });

      reset(defaultValues);

    } catch (err) {

      console.error(err);

      // ERROR
      setDialog({
        open: true,
        type: "error",
        title: "لم يتم إرسال الطلب",
        message:
          err.message || "حدث خطأ أثناء الإرسال",
      });
    }
  };

  // =========================
  // FORM VALIDATION ERROR
  // =========================
  const onError = () => {

    setDialog({
      open: true,
      type: "error",
      title: "لم يتم إرسال الطلب",
      message:
        "يرجى تعبئة جميع الحقول المطلوبة بشكل صحيح.",
    });
  };

  // =========================
  // FIELD RENDERER
  // =========================
  const renderField = (field) => {

    // TEXT / NUMBER
    if (
      field.type === "text" ||
      field.type === "number"
    ) {

      return (
        <FormTextField
          {...field}
          register={register}
          errors={errors}
        />
      );
    }

    // SELECT
    if (field.type === "select") {

      return (
        <FormSelect
          {...field}
          register={register}
          errors={errors}
        >
          {field.options?.map((opt) => (

            <MenuItem
              key={opt.value}
              value={opt.value}
            >
              {opt.label}
            </MenuItem>

          ))}
        </FormSelect>
      );
    }

    // DATE
    if (field.type === "date") {

      return (
        <LocalizationProvider
          dateAdapter={AdapterDayjs}
        >
          <FormDatePicker
            {...field}
            control={control}
            errors={errors}
          />
        </LocalizationProvider>
      );
    }

    return null;
  };

  // =========================
  // UI
  // =========================
  return (
    <>
      <form
        className="form"
        onSubmit={handleSubmit(onSubmit, onError)}
        dir="rtl"
      >

        <h1 className="main-title">
          نموذج طلب المساعدة
        </h1>

        {/* ORPHAN */}
        <FormSection
          title="معلومات اليتيم"
          fields={orphanFields}
          renderField={renderField}
        />

        {/* GUARDIAN */}
        <FormSection
          title="معلومات ولي الأمر"
          fields={guardianFields}
          renderField={renderField}
        />

        {/* PAYMENT */}
        <FormSection
          title="طريقة الصرف"
          fields={paymentFields}
          renderField={renderField}
        />

        {/* BANK */}
        {showBankFields && (
          <FormSection
            title="تفاصيل البنك"
            fields={bankFields}
            renderField={renderField}
          />
        )}

        {/* FAMILY */}
        <FormSection
          title="تفاصيل العائلة"
          fields={familyFields}
          renderField={renderField}
        />

        {/* CONDITIONAL */}
        <FormSection
          fields={conditionalFormFields}
          renderField={renderField}
        />

        {/* SUBMIT */}
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

      {/* STATUS DIALOG */}
      <StatusDialog
        open={dialog.open}
        type={dialog.type}
        title={dialog.title}
        message={dialog.message}
        duration={10000}
        onClose={() =>
          setDialog({
            ...dialog,
            open: false,
          })
        }
      />
    </>
  );
};

export default HelpRequest;