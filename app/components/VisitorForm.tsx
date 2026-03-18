import { useState } from 'react';
import { UserPlus } from 'lucide-react';

interface VisitorFormProps {
  onAddVisitor: (visitor: {
    name: string;
    company: string;
    purpose: string;
    phone: string;
  }) => void;
}

export function VisitorForm({ onAddVisitor }: VisitorFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    purpose: '',
    phone: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.company && formData.purpose) {
      onAddVisitor(formData);
      setFormData({ name: '', company: '', purpose: '', phone: '' });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-black">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-red-600 p-2 rounded">
          <UserPlus className="text-white" size={24} />
        </div>
        <h2 className="text-2xl text-black">Register New Visitor</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-black mb-2">
            Full Name <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border-2 border-black rounded focus:outline-none focus:border-red-600"
            placeholder="Enter visitor name"
          />
        </div>

        <div>
          <label htmlFor="company" className="block text-black mb-2">
            Company/Organization <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border-2 border-black rounded focus:outline-none focus:border-red-600"
            placeholder="Enter company name"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-black mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border-2 border-black rounded focus:outline-none focus:border-red-600"
            placeholder="Enter phone number"
          />
        </div>

        <div>
          <label htmlFor="purpose" className="block text-black mb-2">
            Purpose of Visit <span className="text-red-600">*</span>
          </label>
          <textarea
            id="purpose"
            name="purpose"
            value={formData.purpose}
            onChange={handleChange}
            required
            rows={3}
            className="w-full px-4 py-2 border-2 border-black rounded focus:outline-none focus:border-red-600 resize-none"
            placeholder="Enter purpose of visit"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-red-600 text-white py-3 rounded hover:bg-red-700 transition-colors border-2 border-black"
        >
          Check In Visitor
        </button>
      </form>
    </div>
  );
}
