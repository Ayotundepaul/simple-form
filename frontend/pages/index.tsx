// frontend/pages/index.tsx
import { useState, FormEvent } from 'react';

interface FormData {
  name: string;
  nationality: string;
  age: string;
}

export default function Home() {
  const [formData, setFormData] = useState<FormData>({ name: '', nationality: '', age: '' });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        // Handle successful submission here
      } else {
        // Handle errors here
      }
    } catch (error) {
      // Handle network errors here
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
        <input type="text" name="nationality" value={formData.nationality} onChange={handleChange} placeholder="Nationality" />
        <input type="text" name="age" value={formData.age} onChange={handleChange} placeholder="Age" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
