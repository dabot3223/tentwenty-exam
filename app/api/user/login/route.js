import { NextResponse } from "next/server";
import { db } from "../../../../lib/db";

export async function GET() {
  try {
    const [rows] = await db.query("SELECT id, name FROM users");
    return NextResponse.json({ success: true, data: rows });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, pass } = body;

    const [rows] = await db.query("select id,name,email from users where email = ? and pass = MD5(?)",
      [email, pass]
    );
    // console.log(rows)
    if (rows.length != 0) {
      return NextResponse.json(rows[0]);
    } else {
      return NextResponse.json({ success: false, error: "Email or password is wrong" });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
