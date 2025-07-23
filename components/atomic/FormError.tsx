import React from 'react';

interface FormErrorProps {
  message?: string;
}

const FormError: React.FC<FormErrorProps> = ({ message }) => {
  if (!message) return null;

  return <p className="text-red-600 mt-1 text-sm">{message}</p>;
};

export default FormError;
