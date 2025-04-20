'use client';

import React, { useEffect, useState } from 'react';
import { db } from '../../lib/firebase'; // Sesuaikan dengan struktur folder
import { collection, addDoc, getDocs } from 'firebase/firestore';
import Image from 'next/image'; // Import Image from Next.js

interface Feedback {
  name: string;
  rating: number;
  message: string;
  id?: string;
}

export default function CommentSection() {
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [name, setName] = useState<string>('');
  const [rating, setRating] = useState<number>(0); // Update rating to number
  const [message, setMessage] = useState<string>('');

  // Mengambil data feedbacks dari Firestore
  const fetchFeedback = async () => {
    const feedbackCollection = collection(db, 'feedbacks'); // Koleksi feedbacks
    const feedbackSnapshot = await getDocs(feedbackCollection); // Ambil semua dokumen
    const feedbackList = feedbackSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Feedback[];
    setFeedback(feedbackList); // Set data feedback ke state
  };

  useEffect(() => {
    fetchFeedback(); // Ambil data feedback saat komponen dimuat
  }, []);

  // Menangani form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validasi rating agar selalu angka antara 1 dan 5
    if (rating < 1 || rating > 5) {
      alert('Rating harus antara 1 hingga 5');
      return;
    }

    // Menambah feedback baru ke Firestore
    try {
      const feedbackCollection = collection(db, 'feedbacks');
      await addDoc(feedbackCollection, { name, rating, message });

      // Reset form setelah submit
      setName('');
      setRating(0); // Reset to 0
      setMessage('');

      // Ambil feedback baru setelah submit
      fetchFeedback();
    } catch (error) {
      console.error("Error adding feedback:", error);
    }
  };

  // Menghitung rata-rata rating
  const ratings = feedback
    .map((f) => Number(f.rating))
    .filter((r) => !isNaN(r));

  const averageRating =
    ratings.length > 0
      ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1)
      : 0;

  return (
    <div className="mt-10 px-6 text-black">
      <h2 className="text-2xl font-bold mb-4 text-indigo-700">📝 Komentar & Rating</h2>
      <p className="mb-4">⭐ Rata-rata rating: <strong>{averageRating}</strong> dari {feedback.length} pengguna</p>

      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <input
          type="text"
          placeholder="Nama"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Rating (1-5)"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))} // Convert to number
          required
          min={1}
          max={5}
          className="w-full p-2 border rounded"
        />
        <textarea
          placeholder="Pesan"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
          Kirim
        </button>
      </form>

      <ul className="space-y-4">
        {feedback.map((fb, i) => (
          <li key={i} className="p-4 bg-gray-100 rounded shadow flex items-start space-x-4">
            <div className="flex-shrink-0">
              <Image
                src={`https://api.dicebear.com/7.x/identicon/svg?seed=${fb.name}`}
                alt={`Avatar of ${fb.name}`}
                width={40} // Set the width of the image
                height={40} // Set the height of the image
                className="rounded-full"
              />
            </div>
            <div>
              <p className="font-semibold">{fb.name} ({fb.rating}⭐)</p>
              <p className="text-gray-700">{fb.message}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
