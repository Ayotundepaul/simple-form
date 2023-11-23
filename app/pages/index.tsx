// pages/index.tsx
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
    const response = await fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    // Handle the response...
  };

  const handleChange = (name: keyof FormData) => (event: FormEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [name]: event.currentTarget.value });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={formData.name} onChange={handleChange('name')} placeholder="Name" />
        <input type="text" name="nationality" value={formData.nationality} onChange={handleChange('nationality')} placeholder="Nationality" />
        <input type="text" name="age" value={formData.age} onChange={handleChange('age')} placeholder="Age" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
