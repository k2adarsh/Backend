import {asyncHandler} from "../utils/asyncHandler.js";
import {User} from "../models/user.model.js";
import {ApiError} from "../utils/ApiError.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js";
import {ApiResponse} from "../utils/ApiResponse.js";

const registerUser = asyncHandler( async ( req , res ) => {
    // get user details from frontend
    // validation - not empty
    // check if user already exists: username, email
    // check for images, check for avatar
    // upload them to cloudinary, avatar
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return response with success message and user details

    const {username , email , fullName , avatar , coverImage , password} = req.body;

    if (typeof fullName !== "string" || !fullName.trim()) {
        throw new ApiError(400, "Full name is required");
    }

    if (typeof email !== "string" || !email.trim()) {
        throw new ApiError(400, "Email is required");
    }

    if (typeof username !== "string" || !username.trim()) {
        throw new ApiError(400, "Username is required");
    }

    if (typeof password !== "string" || !password.trim()) {
        throw new ApiError(400, "Password is required");
    }


    const fullNameRegex = /^[a-zA-Z ]+$/;
    const usernameRegex = /^[a-zA-Z0-9_-]{3,15}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;


    // Full name
    if (!fullNameRegex.test(fullName.trim())) {
        throw new ApiError(400, "Full name must contain only alphabets and spaces");
    }

    // Username
    if (!usernameRegex.test(username.trim())) {
        throw new ApiError(400, "Username must be 3-15 characters and contain only letters, numbers, _ or -");
    }

    // Email
    if (!emailRegex.test(email.trim())) {
        throw new ApiError(400, "Invalid email format");
    }

    // Password
    if (!passwordRegex.test(password)) {
        throw new ApiError(
            400,
            "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character"
        );
    }

    // now db call to check if email or username already exist
    //but we keep both seperate to give specific error message
    // Normalize input
    const normalizedUsername = username.trim().toLowerCase();
    const normalizedEmail = email.trim().toLowerCase();

    // Check username
    const existedUsername = await User.findOne({
        username: normalizedUsername
    });

    if (existedUsername) {
        throw new ApiError(409, "Username already exists");
    }

    // Check email
    const existedEmail = await User.findOne({
        email: normalizedEmail
    });

    if (existedEmail) {
        throw new ApiError(409, "Email already registered");
    }

    // now image and avatars
    const avatarLocalPath = req.files?.avatar?.[0]?.path;
    const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar image is required");
    }

    // upload to cloudinary
    const avatarCloudinaryResult = await uploadOnCloudinary(avatarLocalPath);
    const coverImageCloudinaryResult = await uploadOnCloudinary(coverImageLocalPath);

    if(!avatarCloudinaryResult){
        throw new ApiError(500, "Error while uploading avatar image");
    }

    // create user object
    const user = await User.create({
        username: normalizedUsername,
        email: normalizedEmail,
        fullName: fullName.trim(),
        avatar: avatarCloudinaryResult.secure_url,
        coverImage: coverImageCloudinaryResult?.secure_url || null,
        password
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )
})

export {registerUser};