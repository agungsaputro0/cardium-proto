import { forwardRef, InputHTMLAttributes } from 'react';
import Label from './Label';

interface RadioButtonElementProps extends InputHTMLAttributes<HTMLInputElement> {
  inputClass?: string;
  forwhat: string;
  labelMessage: string;
  inputName: string;
  options: Array<{ value: string; label: string }>;
}

// Use forwardRef to handle ref forwarding
const RadioButtonElement = forwardRef<HTMLInputElement, RadioButtonElementProps>(({
    inputClass,
    forwhat,
    labelMessage,
    inputName,
    options,
    value,           // Terima prop value untuk mengetahui pilihan yang sedang aktif
    onChange,        // Terima onChange untuk memperbarui state di parent
    ...props
  }, ref) => {
    return (
      <div className={inputClass}>
        <Label className="text-gray-800 font-semibold" forwhat={forwhat} labelMessage={labelMessage} />
        <div className="flex space-x-4 border-b-2 border-gray-500 py-[6px] px-2">
          {options.map((option, index) => (
            <label key={index} className="flex items-center space-x-2">
              <input
                type="radio"
                name={inputName}
                id={`${inputName}-${index}`}
                value={option.value}
                checked={value === option.value}  // Pastikan ini memeriksa nilai yang benar
                onChange={onChange}                // Memanggil onChange saat nilai berubah
                className="text-gray-800 border-gray-300 focus:ring focus:ring-gray-800"
                ref={ref}
                {...props}
              />
              <span className="text-gray-600">{option.label}</span>
            </label>
          ))}
        </div>
      </div>
    );
  });
  

RadioButtonElement.displayName = 'RadioButtonElement';

export default RadioButtonElement;
