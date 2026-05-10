/** نفس ترقيم ومطابقة أسلوب حقول ولي الأمر في طلب المساعدة (بدون حقل صلة القرابة) */
export const sponsorFields = [
  { name: "sponsorId", label: "رقم الهوية *", type: "text", rules: { required: "رقم الهوية مطلوب" } },
  { name: "sponsorName", label: "الاسم *", type: "text", rules: { required: "الاسم مطلوب" } },
  { name: "sponsorFatherName", label: "الأب *", type: "text", rules: { required: "اسم الأب مطلوب" } },
  { name: "sponsorGrandfatherName", label: "الجد *", type: "text", rules: { required: "اسم الجد مطلوب" } },
  { name: "sponsorFamilyName", label: "العائلة *", type: "text", rules: { required: "اسم العائلة مطلوب" } },
  { name: "sponsorBirthDate", label: "تاريخ الميلاد", type: "date" },
  {
    name: "sponsorGender",
    label: "الجنس *",
    type: "select",
    options: [
      { value: "Female", label: "انثى" },
      { value: "Male", label: "ذكر" },
    ],
    rules: { required: "الجنس مطلوب" },
  },
  { name: "sponsorWorkType", label: "نوع العمل *", type: "text", rules: { required: "نوع العمل مطلوب" } },
  {
    name: "sponsorCountry",
    label: "الدولة *",
    type: "select",
    options: [
      { value: "West-Bank", label: "الضفة الغربية" },
      { value: "Occupied Palestinian Territories", label: "الأراضي الفلسطينية المحتلة" },
    ],
    rules: { required: "اسم الدولة مطلوب" },
  },
  { name: "sponsorCity", label: "المدينة *", type: "text", rules: { required: "اسم المدينة مطلوب" } },
  { name: "sponsorStreet", label: "الشارع", type: "text" },
  {
    name: "sponsorPhone",
    label: "رقم الجوال *",
    type: "text",
    rules: { required: "رقم الجوال مطلوب" },
  },
  { name: "sponsorHomePhone", label: "الهاتف", type: "text" },
  {
    name: "sponsorEmail",
    label: "البريد الإلكتروني *",
    type: "text",
    rules: {
      required: "البريد الإلكتروني مطلوب",
      pattern: { value: /^\S+@\S+$/i, message: "البريد الإلكتروني غير صالح" },
    },
  },
];

/** تُعرض بعد «طريقة الصرف» و«تفاصيل البنك» بترتيب يشبه كتلة «تفاصيل العائلة» في طلب المساعدة */
export const sponsorshipDetailFields = [
  {
    name: "monthlyAmount",
    label: "قيمة الكفالة الشهرية *",
    type: "number",
    rules: {
      required: "قيمة الكفالة مطلوبة",
      validate: (v) =>
        (v !== "" && !Number.isNaN(Number(v)) && Number(v) > 0) ||
        "يجب أن تكون أكبر من 0",
    },
  },
  {
    name: "sponsorshipStartDate",
    label: "تاريخ بدء الكفالة *",
    type: "date",
    rules: { required: "تاريخ بدء الكفالة مطلوب" },
  },
  { name: "sponsorshipEndDate", label: "تاريخ انتهاء الكفالة", type: "date" },
];

export const authorizedFields = [
  { name: "agentId", label: "رقم الهوية", type: "text" },
  { name: "agentName", label: "الاسم *", type: "text", rules: { required: "الاسم مطلوب" } },
  { name: "agentFatherName", label: "الأب *", type: "text", rules: { required: "اسم الأب مطلوب" } },
  { name: "agentGrandfatherName", label: "الجد *", type: "text", rules: { required: "اسم الجد مطلوب" } },
  { name: "agentFamilyName", label: "العائلة *", type: "text", rules: { required: "اسم العائلة مطلوب" } },
  { name: "agentWorkType", label: "نوع العمل", type: "text" },
  {
    name: "agentGender",
    label: "الجنس",
    type: "select",
    options: [
      { value: "Female", label: "انثى" },
      { value: "Male", label: "ذكر" },
    ],
  },
  {
    name: "agentKinship",
    label: "صلة القرابة مع الكفيل *",
    type: "text",
    rules: { required: "صلة القرابة مطلوبة" },
  },
  {
    name: "agentPhone",
    label: "رقم الجوال *",
    type: "text",
    rules: { required: "رقم الجوال مطلوب" },
  },
  {
    name: "agentCountry",
    label: "الدولة *",
    type: "select",
    options: [
      { value: "West-Bank", label: "الضفة الغربية" },
      { value: "Occupied Palestinian Territories", label: "الأراضي الفلسطينية المحتلة" },
    ],
    rules: { required: "اسم الدولة مطلوب" },
  },
  { name: "agentCity", label: "المدينة *", type: "text", rules: { required: "اسم المدينة مطلوب" } },
  { name: "agentStreet", label: "الشارع", type: "text" },
];
