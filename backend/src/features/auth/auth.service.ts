import  prisma  from "../../config/prisma.js"
import AppError from "../../utils/AppErrors.js";
import { LoginInput, SignupInput } from "./auth.validation.js";
import bcrypt from "bcrypt";
import { env } from "../../config/env.js";
import { appendFile } from "node:fs";
import crypto from "crypto";

const signup = async(data:SignupInput)=>{

    const existingUser = await prisma.user.findUnique({
        where: {
            email: data.email,
        }
    });

    if(existingUser) {
        throw new AppError("Email already registered", 409);
    }
    const saltNumber = Number(env.BCRYPT_SALT_ROUNDS)
    const hashedPassword = await bcrypt.hash(data.password, saltNumber);

    const user = await prisma.user.create({
        data : {
            email : data.email,
            name : data.name,
            password : hashedPassword
        },
        select: {
            id: true,
            email: true,
            name: true
        }
    })

    return user;
}

const login = async(data:LoginInput)=>{

    const existingUser = await prisma.user.findUnique({
        where: {
            email: data.email,
        }
    });

    if(!existingUser) {
        throw new AppError("Invalid input field", 401);
    }
    
    const comparePassword = await bcrypt.compare(data.password, existingUser.password);

    if(!comparePassword) {
        throw new AppError("Invalid input field", 401);
    }

    const {password, ...safeUser} = existingUser;

    return safeUser;
}

const getCurrentUser = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
    },
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return user;
};

export const forgotPassword = async (email: string) => {
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    });

    if(!user) {
       return;
    }

    const resetToken = crypto.randomBytes(32).toString("hex");

    const hashedToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    const expiry = new Date(Date.now() + 15 * 60 * 1000);

    await prisma.user.update({
        where: {
            id: user.id,
        },
        data: {
            resetPasswordToken: hashedToken,
            resetPasswordExpiresAt: expiry,
        },
    });

    const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;

    console.log("Reset URL:", resetUrl);

    return;
};

export const resetPassword = async (
  token: string,
  newPassword: string
) => {
  const hashedToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const user = await prisma.user.findFirst({
    where: {
      resetPasswordToken: hashedToken,
      resetPasswordExpiresAt: {
        gt: new Date(),
      },
    },
  });

  if (!user) {
    throw new AppError("Invalid or expired reset token", 400);
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      password: hashedPassword,
      resetPasswordToken: null,
      resetPasswordExpiresAt: null,
    },
  });
};



export { signup, login, getCurrentUser };