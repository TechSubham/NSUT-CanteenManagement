import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { auth } from '../../firebase/firebase';

const Page = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleLogout = async () => {
    try {
      setError("");
      await auth.signOut(); 
      navigate("/login");
    } catch (err) {
      setError("Failed to log out: " + err.message); 
    }
  };

  return (
    <div>
      <h1>This is the homepage</h1>
      {error && <p className="text-red-500">{error}</p>} 
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
};

export default Page;
