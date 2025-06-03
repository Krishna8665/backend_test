import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../schema/User.js';
import cookieParser from 'cookie-parser';  // Import cookie-parser



export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if all fields are provided
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'All fields are required!' });
        }

        // Check if the email already exists.
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists!' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save the new user
        const user = new User({ username, email, password: hashedPassword });
        await user.save();

        // Generate a JWT token
        const token = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Send token in cookies instead of response headers
        res.cookie('token', token, {
            httpOnly: true,   // Cookie is not accessible via JavaScript (security)
            // secure: process.env.NODE_ENV === 'production', // Use secure cookie if in production (HTTPS)
            maxAge: 3600000, // 1 hour expiration time
            sameSite: 'Strict', // Strict CSRF protection
        });

        res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error, please try again.' });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required!' });
        }

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found!' });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials!' });
        }

        // Generate JWT token
        const token = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Send token in cookies instead of response headers
        res.cookie('token', token, {
            httpOnly: true,  // Cookie is not accessible via JavaScript (security)
            secure: process.env.NODE_ENV === 'production', // Use secure cookie if in production (HTTPS)
            maxAge: 3600000, // 1 hour expiration time
            sameSite: 'Strict', // Strict CSRF protection
        });

        res.status(200).json({ message: 'Login successful!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error, please try again.' });
    }
};

// LOGOUT
export const logout = (req, res) => {
    // Clear the cookie (log the user out)
    res.clearCookie('token', { path: '/' }); // Clear the cookie with the name 'token'
    res.status(200).json({ message: 'Logged out successfully!' });
};
