import { BookOpen } from 'lucide-react';

interface BookCheckoutProps {
  onCheckout: (data: {
    studentName: string;
    studentId: string;
    bookTitle: string;
    bookId: string;
  }) => void;
}

export function BookCheckout({ onCheckout }: BookCheckoutProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    onCheckout({
      studentName: formData.get('studentName') as string,
      studentId: formData.get('studentId') as string,
      bookTitle: formData.get('bookTitle') as string,
      bookId: formData.get('bookId') as string,
    });
    
    e.currentTarget.reset();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-black">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-red-600 p-2 rounded">
          <BookOpen className="text-white" size={24} />
        </div>
        <h2 className="text-2xl text-black">Book Checkout</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="studentName" className="block text-black mb-2">
            Student Name <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            id="studentName"
            name="studentName"
            required
            className="w-full px-4 py-2 border-2 border-black rounded focus:outline-none focus:border-red-600"
            placeholder="Enter student name"
          />
        </div>

        <div>
          <label htmlFor="studentId" className="block text-black mb-2">
            Student ID <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            id="studentId"
            name="studentId"
            required
            className="w-full px-4 py-2 border-2 border-black rounded focus:outline-none focus:border-red-600"
            placeholder="Enter student ID"
          />
        </div>

        <div>
          <label htmlFor="bookTitle" className="block text-black mb-2">
            Book Title <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            id="bookTitle"
            name="bookTitle"
            required
            className="w-full px-4 py-2 border-2 border-black rounded focus:outline-none focus:border-red-600"
            placeholder="Enter book title"
          />
        </div>

        <div>
          <label htmlFor="bookId" className="block text-black mb-2">
            Book ID <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            id="bookId"
            name="bookId"
            required
            className="w-full px-4 py-2 border-2 border-black rounded focus:outline-none focus:border-red-600"
            placeholder="Enter book ID"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-red-600 text-white py-3 rounded hover:bg-red-700 transition-colors border-2 border-black"
        >
          Checkout Book
        </button>
      </form>
    </div>
  );
}
