'use client';

import React, { useState } from 'react';
import { toast } from 'sonner';

const DOCUMENT_TYPES = [
  { label: 'Passport', value: 'passport' },
  { label: 'National ID', value: 'id_card' },
  { label: 'Driver\'s License', value: 'drivers_license' },
];

export default function KYCForm() {
  const [form, setForm] = useState({
    documentType: DOCUMENT_TYPES[0].value,
    documentNumber: '',
    documentImage: null,
  });
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'documentImage') {
      setForm({ ...form, documentImage: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // Simulate blob upload and return a fake URL
  const uploadToBlob = async (file) => {
    // Replace this with your actual blob upload logic
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`https://fakeblobstorage.com/${file.name}`);
      }, 1500);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.documentImage) {
      toast.error('Please upload your document image.');
      return;
    }
    setUploading(true);

    try {
      // Upload image to blob and get URL
      const imageUrl = await uploadToBlob(form.documentImage);

      // Send KYC data to your API
      const res = await fetch('/api/kyc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          documentType: form.documentType,
          documentNumber: form.documentNumber,
          documentImageUrl: imageUrl,
        }),
      });

      if (res.ok) {
        toast.success('KYC submitted! Pending verification.');
        setForm({
          documentType: DOCUMENT_TYPES[0].value,
          documentNumber: '',
          documentImage: null,
        });
      } else {
        toast.error('Submission failed. Try again.');
      }
    } catch (err) {
      toast.error('An error occurred. Try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-zinc-900 p-8 rounded-xl shadow-lg mt-10">
      <h2 className="text-2xl font-bold text-orange-400 mb-6 text-center">KYC Verification</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div>
          <label className="block text-gray-300 mb-2 font-semibold">Document Type</label>
          <select
            name="documentType"
            value={form.documentType}
            onChange={handleChange}
            className="w-full p-3 rounded-md bg-zinc-800 text-yellow-400 font-bold"
            required
          >
            {DOCUMENT_TYPES.map((doc) => (
              <option key={doc.value} value={doc.value}>{doc.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-300 mb-2 font-semibold">Document Number</label>
          <input
            type="text"
            name="documentNumber"
            value={form.documentNumber}
            onChange={handleChange}
            className="w-full p-3 rounded-md bg-zinc-800 text-white"
            required
          />
        </div>
        <div>
          <label className="block text-gray-300 mb-2 font-semibold">Upload Document Image</label>
          <input
            type="file"
            name="documentImage"
            accept="image/*"
            onChange={handleChange}
            className="w-full text-white"
            required
          />
        </div>
        <button
          type="submit"
          disabled={uploading}
          className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-orange-500 hover:to-yellow-400 text-black font-bold py-3 rounded-md shadow-lg mt-4"
        >
          {uploading ? 'Submitting...' : 'Submit for Verification'}
        </button>
      </form>
    </div>
  );
}