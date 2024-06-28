import React, { useState, useRef } from 'react';

const OtpInput = ({ length, onChange }) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputRefs = useRef([]);

  const handleChange = (element, index) => {
    const value = element.value;
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      onChange(newOtp.join(""));

      // Move to the next input field
      if (value && index < length - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData('text');
    if (paste.length === length) {
      const newOtp = paste.split('');
      setOtp(newOtp);
      onChange(newOtp.join(''));
      inputRefs.current[length - 1].focus();
    }
    e.preventDefault();
  };

  return (
    <div onPaste={handlePaste}>
      {otp.map((data, index) => (
        <input
          key={index}
          type="text"
          maxLength="1"
          value={data}
          onChange={e => handleChange(e.target, index)}
          onKeyDown={e => handleKeyDown(e, index)}
          ref={el => inputRefs.current[index] = el}
          className='w-10 h-10 m-2 border border-slate-700 rounded text-xl text-center'
        />
      ))}
    </div>
  );
};

export default OtpInput;
