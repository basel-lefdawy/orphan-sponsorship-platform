export const orphanFields = [
  { name: "OrphanID", label: "رقم الهوية *", type: "text", rules: {
  required: "رقم الهوية مطلوب",
  pattern: {
    value: /^\d{9}$/,
    message: "رقم الهوية الفلسطينية يجب أن يكون 9 أرقام",
  },
} },
  { name: "OrphanName", label: "الاسم *", type: "text", rules: { required: "الاسم مطلوب" } },
  { name: "OrphanFatherName", label: "الأب *", type: "text", rules: { required: "اسم الأب مطلوب" } },
  { name: "OrphanGrandfatherName", label: "الجد *", type: "text", rules: { required: "اسم الجد مطلوب" } },
  { name: "OrphanFamilyName", label: "العائلة *", type: "text", rules: { required: "اسم العائلة مطلوب" } },
  { name: "OrphanBirthDate", label: "تاريخ الميلاد *", type: "date",rules: {
  required: "تاريخ الميلاد مطلوب",
  validate: (value) =>
    new Date(value) <= new Date()
      || "تاريخ الميلاد لا يمكن أن يكون بالمستقبل",
} },

  { name: "gender", label: "الجنس *", type: "select", options: [
      { value: "Female", label: "انثى" },
      { value: "Male", label: "ذكر" }
    ], rules: { required: "الجنس مطلوب" }
  },
  { name: "GuaranteeType", label: "نوع الكفالة *", type: "select", options: [
      { value: "Educational", label: "طلب علم" },
      { value: "Medical", label: "علاج" },
      { value: "Full", label: "كفالة شاملة" },
      { value: "SocialCase", label: "حالة اجتماعية" }
    ], rules: { required: "نوع الكفالة مطلوب" }
  },
];

export const guardianFields = [
  { name: "GuardianID", label: "رقم الهوية *", type: "text", rules: {
  required: "رقم الهوية مطلوب",
  pattern: {
    value: /^\d{9}$/,
    message: "رقم الهوية الفلسطينية يجب أن يكون 9 أرقام",
  },
} },
  { name: "GuardianName", label: "الاسم *", type: "text", rules: { required: "الاسم مطلوب" } },
  { name: "GuardianFatherName", label: "الأب *", type: "text", rules: { required: "اسم الأب مطلوب" } },
  { name: "GuardianGrandfatherName", label: "الجد *", type: "text", rules: { required: "اسم الجد مطلوب" } },
  { name: "GuardianFamilyName", label: "العائلة *", type: "text", rules: { required: "اسم العائلة مطلوب" } },
  { name: "Relation", label: "صلة القرابة *", type: "select", options: [
      { value: "Mother", label: "أم" },
      { value: "Father", label: "أب" },
      { value: "GrandFather", label: "جد" },
      { value: "PaternalUncle", label: "عم" },
      { value: "MaternalUncle", label: "خال" },
      { value: "PaternalAunt", label: "عمة" },
      { value: "MaternalAunt", label: "خالة" }
    ], rules: { required: "صلة القرابة مطلوبة" }
  },
  { name: "country", label: "الدولة *", type: "select", options: [
      { value: "West-Bank", label: "الضفة الغربية" },
      { value: "Occupied Palestinian Territories", label: "الأراضي الفلسطينية المحتلة" }
    ], rules: { required: "اسم الدولة مطلوب" }
  },
  { name: "city", label: "المدينة *", type: "text", rules: { required: "اسم المدينة مطلوب" } },
  { name: "street", label: "الشارع", type: "text",rules: { required: "اسم الشارع مطلوب" } },
  {
  name: "phoneNumber",
  label: "رقم الجوال *",
  type: "text",
  rules: {
    required: "رقم الجوال مطلوب",
    pattern: {
      value: /^\d{10}$/,
      message: "رقم الجوال يجب أن يكون 10 أرقام",
    },
  },
},
 {
  name: "homePhone",
  label: "الهاتف",
  type: "text",
  rules: {
    pattern: {
      value: /^\d{7}$/,
      message: "رقم الهاتف يجب أن يكون 7 أرقام",
    },
  },
},
  { name: "email", label: "البريد الإلكتروني *", type: "text", rules: {
      required: "البريد الإلكتروني مطلوب",
      pattern: { value: /^\S+@\S+$/i, message: "البريد الإلكتروني غير صالح" }
    } },
];

export const paymentFields = [
  { name: "paymentMethod", label: "طريقة الصرف *", type: "select", options: [
      { value: "Cash", label: "نقدي" },
      { value: "BankAccount", label: "حساب بنكي" }
    ], rules: { required: "طريقة الصرف مطلوبة" }
  },
];

export const familyFields = [
  { name: "FamilyMember", label: "عدد أفراد الأسرة *", type: "number", rules: { required: "عدد أفراد الأسرة مطلوب", min: { value: 1, message: "يجب أن تكون أكبر من 0" } } },
  { name: "Breadwinner", label: "هل يوجد معيل للأسرة", type: "select", options: [
      { value: "yes", label: "نعم" },
      { value: "No", label: "لا" }
    ]
  },
  { name: "MonthlyIncome", label: "الدخل الشهري *", type: "number",rules: {
  required: "الدخل الشهري مطلوب",
  min: {
    value: 0,
    message: "الدخل لا يمكن أن يكون سالب",
  },
} },
  { name: "HouseCondition", label: "حال المسكن", type: "select", options: [
      { value: "Good", label: "جيد" },
      { value: "Fair", label: "مقبول" },
      { value: "Poor", label: "سيء" },
      { value: "Uninhabitable", label: "لا يصلح للسكن" }
    ]
  },
  { name: "HousingType", label: "السكن", type: "select", options: [
      { value: "Rented", label: "أجرة" },
      { value: "Owned", label: "ملك" }
    ]
  },
  { name: "DeceasedPerson", label: "الشخص المتوفي *", type: "select", options: [
      { value: "Father", label: "الأب" },
      { value: "Mother", label: "الأم" },
      { value: "Both", label: "كلاهما" }
    ] ,rules: { required: "الشخص المتوفي مطلوب" }},
];

export const conditionalFatherFields = [
  {
    name: "FatherDeathDate",
    label: "تاريخ وفاة الأب *",
    type: "date",
    rules: {
      required: "تاريخ وفاة الأب مطلوب",

      validate: (value, formValues) => {
        const fatherDeath = new Date(value);
        const birthDate = new Date(formValues.OrphanBirthDate);
        const today = new Date();

        // ممنوع مستقبل
        if (fatherDeath > today) {
          return "تاريخ وفاة الأب لا يمكن أن يكون في المستقبل";
        }

        // بداية الحمل تقريبًا (9 أشهر قبل الولادة)
        const conceptionStart = new Date(birthDate);
        conceptionStart.setMonth(conceptionStart.getMonth() - 9);

        // لا يسمح بتاريخ بعيد جدًا قبل الحمل
        if (fatherDeath < conceptionStart) {
          return "تاريخ وفاة الأب غير منطقي مع فترة الحمل";
        }

        return true;
      },
    },
  },

  {
    name: "MotherJobType",
    label: "نوع عمل الأم *",
    type: "text",
    rules: { required: "نوع العمل مطلوب" },
  },

  {
  name: "MotherSalary",
  label: "راتب الأم *",
  type: "number",
  rules: {
    required: "الراتب مطلوب",
    min: {
      value: 0,
      message: "الراتب لا يمكن أن يكون سالب",
    },
  },
}
];

export const conditionalMotherFields = [
  {
    name: "MotherDeathDate",
    label: "تاريخ وفاة الأم *",
    type: "date",
    rules: {
      required: "تاريخ وفاة الأم مطلوب",

      validate: (value, formValues) => {
        const motherDeath = new Date(value);
        const birthDate = new Date(formValues.OrphanBirthDate);
        const today = new Date();

        // ممنوع مستقبل
        if (motherDeath > today) {
          return "تاريخ وفاة الأم لا يمكن أن يكون في المستقبل";
        }

        // الأم لازم تكون على الأقل يوم الولادة أو بعدها
        if (motherDeath < birthDate) {
          return "تاريخ وفاة الأم يجب أن يكون يوم الولادة أو بعده";
        }

        return true;
      },
    },
  },

  {
    name: "MotherJobType",
    label: "نوع عمل الأب *",
    type: "text",
    rules: { required: "نوع العمل مطلوب" },
  },

  {
  name: "FatherSalary",
  label: "راتب الأب *",
  type: "number",
  rules: {
    required: "الراتب مطلوب",
    min: {
      value: 0,
      message: "الراتب لا يمكن أن يكون سالب",
    },
  },
}
];

export const conditionalFields = [
   {
    name: "MotherDeathDate",
    label: "تاريخ وفاة الأم *",
    type: "date",
    rules: {
      required: "تاريخ وفاة الأم مطلوب",

      validate: (value, formValues) => {
        const motherDeath = new Date(value);
        const birthDate = new Date(formValues.OrphanBirthDate);
        const today = new Date();

        // ممنوع مستقبل
        if (motherDeath > today) {
          return "تاريخ وفاة الأم لا يمكن أن يكون في المستقبل";
        }

        // الأم لازم تكون على الأقل يوم الولادة أو بعدها
        if (motherDeath < birthDate) {
          return "تاريخ وفاة الأم يجب أن يكون يوم الولادة أو بعده";
        }

        return true;
      },
    },
  },
    {
    name: "FatherDeathDate",
    label: "تاريخ وفاة الأب *",
    type: "date",
    rules: {
      required: "تاريخ وفاة الأب مطلوب",

      validate: (value, formValues) => {
        const fatherDeath = new Date(value);
        const birthDate = new Date(formValues.OrphanBirthDate);
        const today = new Date();

        // ممنوع مستقبل
        if (fatherDeath > today) {
          return "تاريخ وفاة الأب لا يمكن أن يكون في المستقبل";
        }

        // بداية الحمل تقريبًا (9 أشهر قبل الولادة)
        const conceptionStart = new Date(birthDate);
        conceptionStart.setMonth(conceptionStart.getMonth() - 9);

        // لا يسمح بتاريخ بعيد جدًا قبل الحمل
        if (fatherDeath < conceptionStart) {
          return "تاريخ وفاة الأب غير منطقي مع فترة الحمل";
        }

        return true;
      },
    },
  },
];

export const bankFields = [
  { name: "BankName", label: "اسم البنك", type: "select", options: [
      { value: "Arab Islamic Bank", label: "البنك الإسلامي العربي" },
      { value: "Palestine Islamic Bank", label: "البنك الإسلامي الفلسطيني" },
      { value: "Arab Bank", label: "البنك العربي" },
      { value: "Bank Of Palestine", label: "بنك فلسطين" }
    ] },
  { name: "BranchNumber", label: "رقم الفرع *", type: "text", rules: { required: "رقم الفرع مطلوب" } },
  { name: "bankAccount", label: "رقم الحساب البنكي *", type: "text", rules: { required: "رقم الحساب مطلوب", pattern: { value: /^\d{16}$/, message: "يجب أن يكون 16 رقم" } } },
  { name: "AccountHolderName", label: "اسم صاحب الحساب *", type: "text", rules: { required: "اسم صاحب الحساب مطلوب" } },
  {name: "IBAN",label: "IBAN",type: "text",
  rules: {
    pattern: {
      value: /^[A-Z]{2}[0-9A-Z]{13,32}$/,
      message: "رقم IBAN غير صالح",
    },
  },
}
];
