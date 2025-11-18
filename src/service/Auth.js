const userSchema = require('../model/UserModel');
const { hashPassword } = require('../utils/bcrypt');


exports.registerService = async (payload) => {
    const { firstname, lastname, email, phoneno, password, dob } = payload

    const isExisting = await userSchema.findOne({ email: email })

    if (isExisting) {
        return {
            success: false,
            status: 409,
            message: `User already registered with this ${email}. Please try different email`
        };
    }

    const hashpassword = await hashPassword(password)

    const user = await userSchema.create({
        firstname,
        lastname,
        email,
        phoneno,
        password: hashpassword,
        dob
    });

    return {
        success: true,
        status: 200,
        message: "User Registered Successfully",
        data: user
    };

}