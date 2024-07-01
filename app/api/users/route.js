import db from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import base64url from "base64url";
import { render } from "@react-email/render";
import nodemailer from "nodemailer";
import EmailTemplate from "@/components/ui/email-template";

export async function POST(request) {
  try {
    const { name, email, password, role } = await request.json();

    const existingUser = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          data: null,
          message: "User Already exists",
        },
        { status: 409 }
      );
    }

    // Encrypt the Password => bycrypt
    const hashedPassword = await bcrypt.hash(password, 10);
    const rawToken = uuidv4();
    // Encode the token using Base64 URL-safe format
    const token = base64url.encode(rawToken);

    const newUser = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
        verificationToken: token,
      },
    });

    if (role === "USER") {
      const userId = newUser.id;
      const newUserProfile = await db.userProfile.create({
        data: {
          name,
          emailAddress:email,
          userId
        },
      });

    }
    //Generate Token
    // Generate a random UUID (version 4)

    if (role === "FARMER") {
      const userId = newUser.id;
      const subject = `คุณได้สมัครเป็นผู้ขายในเว็บเซ็บของ ${process.env.NAME_WEBSITE} โปรดยืนยันบัญชีของคุณ`;
      const linkText = "ยืนยันบัญชีของคุณ";
      const description = "ขอขอบคุณที่สร้างบัญชีกับเรา โปรดยืนยันบัญชีของคุณ";

      const redirectUrl = `onboarding/${userId}?token=${token}`;

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.USER,
          pass: process.env.APP_PASSWORD,
        },
      });

      const emailHtml = render(
        EmailTemplate({ name, redirectUrl, linkText, subject, description })
      );

      const options = {
        from: `${process.env.NAME_WEBSITE} <${process.env.USER}>`,
        to: email,
        subject: subject,
        html: emailHtml,
        headers: {
          "X-Priority": "1",
          "X-MSMail-Priority": "High",
          Importance: "High",
        },
      };

      transporter.sendMail(options, (err, info) => {
        if (err) {
          console.log("err", err);
        } else {
          console.log("Send: ", info.response);
        }
      });
    }

    
    return NextResponse.json(
      {
        data: newUser,
        message: "User Created Successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error,
        message: "Server Error: Something Went wrong",
      },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const users = await db.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(users);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to Fetch Users", error },
      { status: 500 }
    );
  }
}
