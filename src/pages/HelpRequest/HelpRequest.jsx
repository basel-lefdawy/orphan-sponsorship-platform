import { useForm } from "react-hook-form";
import { Button, MenuItem } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState, useEffect } from "react";
import { fetchWithAuth } from "../../services/authService";

import StatusDialog from "../../components/StatusDialog";
import FormSection from "./FormSection";
import FormTextField from "./FormTextField";
import FormSelect from "./FormSelect";
import FormDatePicker from "./FormDatePicker";
import { applyServerFieldErrors } from "../../utils/applyServerFieldErrors";

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
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
  const API_URL = `${API_BASE_URL}/api/help-requests`;

  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    setError,
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

  // PAYMENT METHOD WATCHER
  const paymentMethod = watch("paymentMethod");

  useEffect(() => {
    setShowBankFields(paymentMethod === "BankAccount");
  }, [paymentMethod]);

  // DECEASED PERSON WATCHER
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

  // SUBMIT
  const onSubmit = async (data) => {
    try {

      const formattedData = {
        ...data,
        FamilyMember: Number(data.FamilyMember),
        MonthlyIncome: Number(data.MonthlyIncome),
        email: data.email?.trim().toLowerCase(),
        phoneNumber: data.phoneNumber?.trim(),
        OrphanID: data.OrphanID?.trim(),
        GuardianID: data.GuardianID?.trim(),
      };

      // تنظيف الحقول الفاضية

      const optionalFields = [
        "FatherDeathDate",
        "MotherDeathDate",
        "IBAN",
        "bankAccount",
        "homePhone"
      ];

      optionalFields.forEach((f) => {
        if (!formattedData[f]) delete formattedData[f];
      });

      console.log("FINAL DATA:", formattedData);

      const response = await fetchWithAuth(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      });

      const result = await response.json();

      if (!response.ok) {

        // VALIDATION ERRORS
        if (result.errors?.length) {
          applyServerFieldErrors(result.errors, setError);

          const messages = result.errors
            .map((e) => `• ${e.message}`)
            .join("\n");

          throw new Error(messages);
        }

        // NORMAL ERROR MESSAGE
        throw new Error(
          result.message || "فشل إرسال البيانات"
        );
      }

      setDialog({
        open: true,
        type: "success",
        title: "تم إرسال الطلب بنجاح",
        message: "تم إرسال الطلب بنجاح",
      });

      reset(defaultValues);

    } catch (err) {

      setDialog({
        open: true,
        type: "error",
        title: "لم يتم إرسال الطلب",
        message: err.message,
      });
    }
  };


  // FORM VALIDATION ERROR
  const onError = () => {

    setDialog({
      open: true,
      type: "error",
      title: "لم يتم إرسال الطلب",
      message:
        "يرجى تعبئة جميع الحقول المطلوبة بشكل صحيح.",
    });
  };

  // FIELD RENDERER
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

  // UI
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
