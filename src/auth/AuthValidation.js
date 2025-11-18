const { z } = require('zod')

exports.registerSchema = z.object({
    firstname: z.string().min(2, "Minimum 2 letters required").max(20, "Maximum 20 letters allowed"),
    lastname: z.string().min(2, "Minimum 2 letters required").max(20, "Maximum 20 letters allowed"),
    email: z.email("Please enter a valid email address").min(1, "email is required"),
    phoneno: z.string().regex(/^[0-9]{10}$/, "Phone number must be exactly 10 digits"),
    password: z.string().min(1, "Password is required").min(8, "password must be atleast 8 characters").max(16, "password must be less than 16 letters").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
    dob: z
        .string()
        .refine((value) => {
            // Validate DD/MM/YYYY
            const regex = /^([0-2]\d|3[0-1])\/(0\d|1[0-2])\/\d{4}$/;
            return regex.test(value);
        }, "Invalid date format. Use DD/MM/YYYY")
        .transform((value) => {
            const [day, month, year] = value.split("/");
            return new Date(`${year}-${month}-${day}`);
        })
        .refine((date) => !isNaN(date.getTime()), "Invalid date")
        .refine((date) => date < new Date(), "DOB cannot be in the future")

})

exports.loginSchema = z.object({
    identifier: z.string()
        .min(1, "Email or phone is required")
        .refine(
            (value) => {
                const isEmail = /\S+@\S+\.\S+/.test(value);
                const isPhone = /^[0-9]{10}$/.test(value);
                return isEmail || isPhone;
            },
            { message: "Enter a valid email or 10-digit phone number" }
        ),
    password: z.string().min(8, "Password must be at least 8 characters"),
})