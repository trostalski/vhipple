import { NextResponse } from "next/server";
import example_01 from "./example_01.json";

export async function GET() {
  // load and return example_001.json data
  return NextResponse.json(example_01, { status: 200 });
}
