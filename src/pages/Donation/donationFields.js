export const basicFields = [
  { name: "amount", label: "قيمة التبرع", type: "number", required: "قيمة التبرع مطلوبة", min: { value: 1, message: "يجب أن تكون أكبر من 0" } },

];

export const paymentMethodField = [
  {name: "method",label: "طريقة الدفع", type: "radio",required: "اختر طريقة الدفع",options: [
      { value: "paypal", label: "PayPal" },
      { value: "card", label: "card" }]}, 
  { name: "firstName", label: "الاسم الأول",type: "text",required: "الاسم الأول مطلوب",minLength: { value: 3, message: "قصير جداً" }},
  {name: "lastName",label: "اسم العائلة",type: "text",required: "اسم العائلة مطلوب",minLength: { value: 3, message: "قصير جداً" }},
  {name: "email",label: "البريد الالكتروني",type: "text",required: "البريد الإلكتروني مطلوب",pattern: {  value: /^\S+@\S+$/i,message: "البريد الإلكتروني غير صالح"}}
];


export const cardFields = [
  { name: "cardNumber", label: "رقم البطاقة", type: "text", required: "رقم البطاقة مطلوب", pattern: /^\d{16}$/ },
  { name: "cvc", label: "رمز التحقق", type: "text", required: "رمز التحقق مطلوب", pattern: /^\d{3,4}$/ },
  { name: "expiry", label: "تاريخ الانتهاء MM/YY", type: "text", required: "تاريخ الانتهاء مطلوب", pattern: /^\d{2}\/\d{2}$/ },
  { name: "cardName", label: "اسم حامل البطاقة", type: "text", required: "اسم حامل البطاقة مطلوب" }
];
