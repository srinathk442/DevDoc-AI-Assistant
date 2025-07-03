import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "@/models/User";
import { connectDB } from "@/lib/db";

export async function POST(req:Request){
    await connectDB();
  const { username, password } = await req.json();

  const user = await User.findOne({ username });
  if (!user) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
 const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET!, {
    expiresIn: "1h",
  });

  return NextResponse.json({ token });
}