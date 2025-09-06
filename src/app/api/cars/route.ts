// app/api/cars/route.ts
import { getAllCars } from "@/src/lib/actions/cars-actions";
import { NextResponse } from "next/server";

export async function GET() {
  const cars = await getAllCars();
  return NextResponse.json(cars);
}
