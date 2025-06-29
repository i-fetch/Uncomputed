'use client';

import { useState } from 'react';

const DOCUMENT_TYPES = [
  { value: '', label: 'Select Document Type' },
  { value: 'passport', label: 'Passport' },
  { value: 'id_card', label: 'National ID Card' },
  { value: 'driver_license', label: 'Driver’s License' },
];

export default function KYCPage() {
  const [documentType, setDocumentType] = useState('');
  const [documentNumber, setDocumentNumber] = useState('');
  const [documentImage, setDocumentImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setDocumentImage(file);
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setPreviewUrl('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');
    // Simulate upload and verification
    setTimeout(() => {
      setStatus('submitted');
      setMessage('Your KYC submission is received and under review.');
    }, 1500);
    // In production, upload the file and send form data to your API here
  };

  return (
    <div className="max-w-lg mx-auto bg-zinc-900 p-6 sm:p-8 rounded-xl shadow-lg mt-10">
      <h2 className="text-2xl font-bold text-orange-400 mb-6 text-center">KYC Verification</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-gray-300 mb-2 font-medium">Document Type</label>
          <select
            className="w-full p-3 rounded-md bg-zinc-800 text-white"
            value={documentType}
            onChange={(e) => setDocumentType(e.target.value)}
            required
          >
            {DOCUMENT_TYPES.map((doc) => (
              <option key={doc.value} value={doc.value}>
                {doc.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-300 mb-2 font-medium">Document Number</label>
          <input
            type="text"
            className="w-full p-3 rounded-md bg-zinc-800 text-white"
            value={documentNumber}
            onChange={(e) => setDocumentNumber(e.target.value)}
            required
            placeholder="Enter your document number"
          />
        </div>
        <div>
          <label className="block text-gray-300 mb-2 font-medium">Upload Document Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-3 rounded-md bg-zinc-800 text-white"
            required
          />
        </div>
        {previewUrl && (
          <div className="mt-4">
            <img src={previewUrl} alt="Document Preview" className="w-full h-auto rounded-md" />
          </div>
        )}
        <div>
          <button
            type="submit"
            className="w-full p-3 rounded-md bg-orange-500 text-white font-semibold transition-all duration-200 hover:bg-orange-600"
          >
            {status === 'loading' ? 'Submitting...' : 'Submit for Verification'}
          </button>
        </div>
      </form>
      {message && (
        <div className={`mt-4 p-3 rounded-md text-center ${status === 'submitted' ? 'bg-green-500' : 'bg-red-500'}`}>
          {message}
        </div>
      )}
    </div>
  );
}