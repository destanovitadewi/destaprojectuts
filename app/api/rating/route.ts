import { db } from "@/lib/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

// Handle POST request: Menyimpan rating ke Firestore
export async function POST(request: NextRequest) {
  try {
    // Mengambil data JSON dari request
    const { rating } = await request.json();

    // Validasi rating (wajib angka 1–5)
    if (typeof rating !== 'number' || rating < 1 || rating > 5) {
      return NextResponse.json(
        { success: false, error: "Rating harus berupa angka antara 1 hingga 5" },
        { status: 400 }
      );
    }

    // Menyimpan rating ke Firestore
    await addDoc(collection(db, "ratings"), { rating });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Gagal menyimpan rating:", error);
    return NextResponse.json(
      { success: false, error: "Terjadi kesalahan saat menyimpan rating" },
      { status: 500 }
    );
  }
}

// Handle GET request: Mengambil data rata-rata rating
export async function GET() {
  try {
    const snapshot = await getDocs(collection(db, "ratings"));
    const ratings = snapshot.docs.map((doc) => doc.data().rating);

    console.log("Data ratings yang diambil:", ratings); // Debugging

    if (ratings.length === 0) {
      return NextResponse.json({ average: "0.0", total: 0 });
    }

    const total = ratings.length;
    const average = ratings.reduce((a: number, b: number) => a + b, 0) / total;

    console.log("Total ratings:", total); // Debugging
    console.log("Average rating:", average); // Debugging

    // Memastikan rata-rata dalam bentuk angka dan membatasi 1 angka desimal
    return NextResponse.json({ average: average.toFixed(1), total });
  } catch (error) {
    console.error("Gagal mengambil data rating:", error);
    return NextResponse.json(
      { success: false, error: "Terjadi kesalahan saat mengambil data rating" },
      { status: 500 }
    );
  }
}
