import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import StatusDialog from "../../components/StatusDialog";
import FieldRenderer from "./FieldRenderer";
import { createDonation } from "../Donation/DonationApi";


import {
  basicFields,
  paymentMethodField,
  cardFields,
} from "./donationFields";

const DonationForm = ({ onClose }) => {
  const [openDialog, setOpenDialog] = useState(true);
  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    mode: "all", 
    defaultValues: {
      amount: 100,
      method: "",
      firstName: "",
      lastName: "",
      email: "",
      cardNumber: "",
      cvc: "",
      expiry: "",
      cardName: "",
    },
  });

  const method = watch("method");

  const [dialog, setDialog] = useState({
    open: false,
    type: "success",
    title: "",
    message: "",
  });

  useEffect(() => {
    if (method !== "card") {
      reset({
        cardNumber: "",
        cvc: "",
        expiry: "",
        cardName: "",
      });
    }
  }, [method, reset]);

  const onSubmit = async (data) => {
    try {
      const donationData = {
        ...data,
        date: new Date().toISOString(),
      };

      await createDonation(donationData);

      setDialog({
        open: true,
        type: "success",
        title: "شكرًا لتبرعك 💚",
        message: "تم إرسال التبرع بنجاح.",
      });

      reset();
    } catch (error) {
      setDialog({
        open: true,
        type: "error",
        title: "خطأ",
        message: "تعذر إرسال التبرع، حاول مرة أخرى.",
      });
    }
  };

  const onError = () => {
    setDialog({
      open: true,
      type: "error",
      title: "لم يتم إرسال التبرع",
      message: "يرجى تعبئة جميع الحقول المطلوبة بشكل صحيح.",
    });
  };

  // تعديل: استخدم onClose بدل navigate
  const handleClose = () => {
    setOpenDialog(false);
    if (onClose) onClose();
  };

  return (
    <>
      <Dialog
        open={openDialog}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            maxHeight: '90vh',
            overflow: 'auto'
          }
        }}
      >
        <DialogTitle dir="rtl" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 2 }}>
          <Typography variant="h5" fontWeight="bold">
            نموذج التبرع
          </Typography>
          <IconButton onClick={handleClose} sx={{ color: '#2e7d32' }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dir="rtl">
          <Box component="form" onSubmit={handleSubmit(onSubmit, onError)} sx={{ display: "flex", flexDirection: "column", gap: 3, pt: 2 }}>
            {basicFields.map((field) => (
              <FieldRenderer
                key={field.name}
                field={field}
                register={register}
                control={control}
                errors={errors}
              />
            ))}

            <Box sx={{ borderBottom: 1, borderColor: "divider", pb: 1 }}>
              <Typography variant="h6" fontWeight="bold">
                طريقة الدفع
              </Typography>
            </Box>

            <FieldRenderer
              field={paymentMethodField[0]}
              register={register}
              control={control}
              errors={errors}
            />
            <Stack direction="row" spacing={2} flexWrap="wrap">
              {paymentMethodField.slice(1, 3).map((field) => (
                <FieldRenderer
                  key={field.name}
                  field={{
                    ...field,
                    sx: { flex: "1 1 45%" },
                  }}
                  register={register}
                  control={control}
                  errors={errors}
                />
              ))}
            </Stack>
            <FieldRenderer
              field={paymentMethodField[3]}
              register={register}
              control={control}
              errors={errors}
            />
            {method === "card" && (
              <>
                <Box
                  sx={{
                    borderBottom: 1,
                    borderColor: "divider",
                    pb: 1,
                    mt: 2,
                  }}
                >
                  <Typography variant="h6" fontWeight="bold">
                    معلومات البطاقة
                  </Typography>
                </Box>

                <Stack direction="row" spacing={2} flexWrap="wrap">
                  {cardFields.slice(0, 2).map((field) => (
                    <FieldRenderer
                      key={field.name}
                      field={{
                        ...field,
                        sx: { flex: "1 1 45%" },
                      }}
                      register={register}
                      control={control}
                      errors={errors}
                    />
                  ))}
                </Stack>

                <Stack direction="row" spacing={2} flexWrap="wrap">
                  {cardFields.slice(2).map((field) => (
                    <FieldRenderer
                      key={field.name}
                      field={{
                        ...field,
                        sx: { flex: "1 1 45%" },
                      }}
                      register={register}
                      control={control}
                      errors={errors}
                    />
                  ))}
                </Stack>
              </>
            )}

            <Button
              variant="contained"
              type="submit"
              size="large"
              sx={{
                py: 1.5,
                fontWeight: "bold",
                backgroundColor: "#008000",
              }}
            >
              التبرع الآن
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
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

export default DonationForm;