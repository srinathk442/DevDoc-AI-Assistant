import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import User from "@/models/User";
import { connectDB } from "@/lib/db";
export async function POST(req: Request) {
  await connectDB();
  const { username, password } = await req.json();

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return NextResponse.json({ error: "Username already taken" }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ username, password: hashedPassword });

  return NextResponse.json({ message: "User registered", user: { username: user.username } });
}