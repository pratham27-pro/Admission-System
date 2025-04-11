import AuthUser from "../models/auth-user.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
    console.log("Received signup request with data:", req.body); // Log the request data
    
    const { username, email, password } = req.body;
  
    try {
        // Check for duplicate email
        const existingUser = await AuthUser.findOne({ email });
        if (existingUser) {
            console.log("Email already in use:", email); // Log if email already exists
            return next(errorHandler(409, "Email already in use.")); // Ensure response is returned
        }
  
        // Hash password
        const hashedPassword = bcryptjs.hashSync(password, 10);
  
        // Create new user
        const newUser = new AuthUser({ username, email, password: hashedPassword });
        await newUser.save();
  
        // Log the new user created
        console.log("New user created:", newUser);

        // Remove the password field from the returned user data
        const userData = { ...newUser._doc };
        delete userData.password; // Correct field name is `password`
  
        console.log("Returning user data:", userData); // Log returned data
        // Send back user data (without password)
        return res.status(201).json(userData); // Ensure you're returning a response here
    } catch (error) {
        console.error("Signup error:", error);
        return next(errorHandler(500, "Error while doing user signup.")); // Ensure response is returned
    }
};



export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const validUser = await AuthUser.findOne({ email });
        if (!validUser) {
            return next(errorHandler(401, "Invalid email/credentials"));
        }

        const validPassword = bcryptjs.compareSync(password, validUser.password);  
        if (!validPassword) return next(errorHandler(401, "Invalid credentials"));

        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
        const { password: hashedPassword, ...rest} = validUser._doc;

        const expiry = new Date(Date.now() + 3600000); // 1hr
        res.cookie("access-token", token, {httpOnly: true, expires: expiry}).status(200).json(validUser);

    } catch (error) {
        next(error);
        console.log("Error while login of the user");
    }
};