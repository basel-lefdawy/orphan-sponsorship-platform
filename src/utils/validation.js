const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const UPPERCASE_REGEX = /[A-Z]/;
const LOWERCASE_REGEX = /[a-z]/;
const NUMBER_REGEX = /[0-9]/;

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
        errors.fullName = "Full name is required.";
    } else if (trimmedName.length < 2) {
        errors.fullName = "Full name must be at least 2 characters.";
    }

    if (!trimmedEmail) {
        errors.email = "Email is required.";
    } else if (!EMAIL_REGEX.test(trimmedEmail)) {
        errors.email = "Please enter a valid email address.";
    }

    if (!password) {
        errors.password = "Password is required.";
    } else if (password.length < 8) {
        errors.password = "Password must be at least 8 characters.";
    } else if (!UPPERCASE_REGEX.test(password)) {
        errors.password = "Password must include at least one uppercase letter.";
    } else if (!LOWERCASE_REGEX.test(password)) {
        errors.password = "Password must include at least one lowercase letter.";
    } else if (!NUMBER_REGEX.test(password)) {
        errors.password = "Password must include at least one number.";
    }

    if (!confirmPassword) {
        errors.confirmPassword = "Please confirm your password.";
    } else if (password !== confirmPassword) {
        errors.confirmPassword = "Passwords do not match.";
    }

    return errors;
}

export function hasSignUpErrors(errors) {
    return Object.values(errors).some(Boolean);
}
