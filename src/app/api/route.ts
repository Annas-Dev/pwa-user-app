import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET() {
  let { data: info, error } = await supabase.from("info").select("*");
  if (error) {
    console.error("Error fetching data:", error);
    return null;
  }
  return NextResponse.json({ info });
}

export async function POST(request: Request) {
  const body = await request.json();
  const { data, error } = await supabase.from("info").insert([body]).select();
  if (error) {
    console.error("Error inserting data:", error);
    return null;
  }
  return NextResponse.json({ data, error });
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  const { error } = await supabase.from("info").delete().eq("id", id);
  if (error) {
    console.error("Error inserting data:", error);
    return null;
  }
  return NextResponse.json({ error });
}
export async function PUT(request: Request) {
  // const { id } = await request.json();
  const update = await request.json();

  const { data, error } = await supabase
    .from("info")
    .update({
      name: update.name,
      email: update.email,
      alamat: update.alamat,
      nomor_telepon: update.nomor_telepon,
      tgl_lahir: update.tgl_lahir,
      kewarganegaraan: update.kewarganegaraan,
      image: update.image,
    })
    .eq("id", update.id)
    .select();

  if (error) {
    console.error("Error inserting data:", error);
    return null;
  }
  return NextResponse.json({ data });
}
