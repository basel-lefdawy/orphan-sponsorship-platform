const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const UPPERCASE_REGEX = /[A-Z]/;
const LOWERCASE_REGEX = /[a-z]/;
const NUMBER_REGEX = /[0-9]/;
const SPECIAL_CHARACTER_REGEX = /[@$!%*?&_\-#^]/;

export function validateSignUpForm(formData) {
    const errors = {
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
    };

    const trimmedName = formData.fullName.trim();
    const trimmedEmail = formData.email.trim();
    const password = formData.password;
    const confirmPassword = formData.confirmPassword;

    if (!trimmedName) {
        errors.fullName = "الاسم الكامل مطلوب.";
    } else if (trimmedName.length < 2) {
        errors.fullName = "يجب أن يكون الاسم الكامل حرفين على الأقل.";
    }

    if (!trimmedEmail) {
        errors.email = "البريد الإلكتروني مطلوب.";
    } else if (!EMAIL_REGEX.test(trimmedEmail)) {
        errors.email = "يرجى إدخال بريد إلكتروني صالح.";
    }

    if (!password) {
        errors.password = "كلمة المرور مطلوبة.";
    } else if (password.length < 8) {
        errors.password = "يجب أن تكون كلمة المرور 8 أحرف على الأقل.";
    } else if (!UPPERCASE_REGEX.test(password)) {
        errors.password = "يجب أن تحتوي كلمة المرور على حرف كبير واحد على الأقل.";
    } else if (!LOWERCASE_REGEX.test(password)) {
        errors.password = "يجب أن تحتوي كلمة المرور على حرف صغير واحد على الأقل.";
    } else if (!NUMBER_REGEX.test(password)) {
        errors.password = "يجب أن تحتوي كلمة المرور على رقم واحد على الأقل.";
    } else if (!SPECIAL_CHARACTER_REGEX.test(password)) {
        errors.password =
            "يجب أن تحتوي كلمة المرور على رمز خاص واحد على الأقل (@$!%*?&_-#^).";
    }

    if (!confirmPassword) {
        errors.confirmPassword = "يرجى تأكيد كلمة المرور.";
    } else if (password !== confirmPassword) {
        errors.confirmPassword = "كلمتا المرور غير متطابقتين.";
    }

    return errors;
}

export function hasSignUpErrors(errors) {
    return Object.values(errors).some(Boolean);
}
