import { UserPlus } from 'lucide-react';

interface VisitorCheckInProps {
  onCheckIn: (data: {
    name: string;
    email: string;
    college: string;
    reason: string;
    isEmployee: boolean;
    employeeType?: string;
  }) => void;
}

const colleges = [
  'College of Engineering',
  'College of Computer Studies',
  'College of Arts and Sciences',
  'College of Business and Accountancy',
  'College of Education',
  'College of Nursing',
  'Other'
];

const visitReasons = [
  'Study',
  'Research',
  'Borrow Books',
  'Return Books',
  'Group Study',
  'Internet Access',
  'Printing',
  'Meeting',
  'Other'
];

export function VisitorCheckIn({ onCheckIn }: VisitorCheckInProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const isEmployee = formData.get('isEmployee') === 'yes';
    
    onCheckIn({
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      college: formData.get('college') as string,
      reason: formData.get('reason') as string,
      isEmployee,
      employeeType: isEmployee ? (formData.get('employeeType') as string) : undefined
    });
    
    e.currentTarget.reset();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border-2 border-black">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-red-600 p-2 rounded">
          <UserPlus className="text-white" size={24} />
        </div>
        <h2 className="text-2xl text-black">Visitor Check-In</h2>
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
            required
            className="w-full px-4 py-2 border-2 border-black rounded focus:outline-none focus:border-red-600"
            placeholder="Enter your name"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-black mb-2">
            Email <span className="text-red-600">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full px-4 py-2 border-2 border-black rounded focus:outline-none focus:border-red-600"
            placeholder="your.email@neu.edu.ph"
          />
        </div>

        <div>
          <label htmlFor="college" className="block text-black mb-2">
            College <span className="text-red-600">*</span>
          </label>
          <select
            id="college"
            name="college"
            required
            className="w-full px-4 py-2 border-2 border-black rounded focus:outline-none focus:border-red-600"
          >
            <option value="">Select College</option>
            {colleges.map(college => (
              <option key={college} value={college}>{college}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="reason" className="block text-black mb-2">
            Reason for Visit <span className="text-red-600">*</span>
          </label>
          <select
            id="reason"
            name="reason"
            required
            className="w-full px-4 py-2 border-2 border-black rounded focus:outline-none focus:border-red-600"
          >
            <option value="">Select Reason</option>
            {visitReasons.map(reason => (
              <option key={reason} value={reason}>{reason}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-black mb-2">
            Are you an employee? <span className="text-red-600">*</span>
          </label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="isEmployee"
                value="no"
                defaultChecked
                className="mr-2"
                onChange={(e) => {
                  const employeeTypeField = document.getElementById('employeeTypeField');
                  if (employeeTypeField) {
                    employeeTypeField.style.display = 'none';
                  }
                }}
              />
              No
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="isEmployee"
                value="yes"
                className="mr-2"
                onChange={(e) => {
                  const employeeTypeField = document.getElementById('employeeTypeField');
                  if (employeeTypeField) {
                    employeeTypeField.style.display = 'block';
                  }
                }}
              />
              Yes
            </label>
          </div>
        </div>

        <div id="employeeTypeField" style={{ display: 'none' }}>
          <label htmlFor="employeeType" className="block text-black mb-2">
            Employee Type
          </label>
          <select
            id="employeeType"
            name="employeeType"
            className="w-full px-4 py-2 border-2 border-black rounded focus:outline-none focus:border-red-600"
          >
            <option value="">Select Type</option>
            <option value="Teacher">Teacher</option>
            <option value="Staff">Staff</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-red-600 text-white py-3 rounded hover:bg-red-700 transition-colors border-2 border-black"
        >
          Check In
        </button>
      </form>
    </div>
  );
}
