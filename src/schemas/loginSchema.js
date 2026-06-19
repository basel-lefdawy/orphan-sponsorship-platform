import { z } from "zod";

export const loginSchema = z.object({
    email: z
        .string()
        .min(1, "البريد الإلكتروني مطلوب")
        .email("يرجى إدخال بريد إلكتروني صالح"),

    password: z
        .string()
        .min(1, "كلمة المرور مطلوبة"),

    rememberMe: z.boolean().optional(),
});