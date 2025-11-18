const userSchema = require('../model/UserModel');
const { hashPassword, comparePassword } = require('../utils/bcrypt');
const { generateToken } = require('../utils/jwt');

class AuthService {

    registerService = async (payload) => {
        const { firstname, lastname, email, phoneno, password, dob } = payload

        const existingEmailUser = await userSchema.findOne({ email });

        if (existingEmailUser) {
            return {
                success: false,
                status: 409,
                message: `User already registered with this email: ${email}.`
            };
        }

        const existingPhoneUser = await userSchema.findOne({ phoneno });

        if (existingPhoneUser) {
            return {
                success: false,
                status: 409,
                message: `User already registered with phone number: ${phoneno}.`
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

    loginService = async (payload) => {
        const { identifier, password } = payload

        const isEmail = /\S+@\S+\.\S+/.test(identifier);

        const user = await userSchema.findOne(isEmail ? { email: identifier } : { phoneno: identifier })

        if (!user) {
            return {
                success: false,
                status: 404,
                message: `${identifier} not found`
            }
        }

        const isMatchPassword = await comparePassword(password, user.password)

        if (user && !isMatchPassword) {
            return {
                success: false,
                status: 401,
                message: "Invalid Password"
            }
        }

        const token = generateToken({ id: user._id })

        return {
            status: 200,
            success: true,
            message: "Logged in successfully",
            user: {
                id: user._id,
                name: user.firstname,
                email: user.email,
                phone: user.phoneno
            },
            token: token
        }
    }
}

module.exports = new AuthService()