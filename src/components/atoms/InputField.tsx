import React from 'react';

interface InputFieldProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  multiline?: boolean;
  rows?: number;
  error?: string;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  type = 'text',
  placeholder = '',
  required = false,
  value,
  onChange,
  multiline = false,
  rows = 4,
  error,
}) => {
  const baseInputStyles =
    'w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-cyan-600 focus:bg-white focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 font-mono text-sm shadow-sm';

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label htmlFor={name} className="text-xs font-mono text-slate-700 uppercase tracking-wider flex justify-between font-bold">
        <span>{label}</span>
        {required && <span className="text-cyan-600">*</span>}
      </label>

      {multiline ? (
        <textarea
          id={name}
          name={name}
          rows={rows}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={onChange}
          className={`${baseInputStyles} resize-none`}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={onChange}
          className={baseInputStyles}
        />
      )}

      {error && <span className="text-xs text-rose-600 font-mono mt-0.5">{error}</span>}
    </div>
  );
};
