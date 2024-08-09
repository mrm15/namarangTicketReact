import React, {useEffect, useRef, useState} from 'react';
import "./OTPInput.scss"
interface OTPInputProps {
    length: number;
    onChange: (otp: string) => void;
}

const OTPInput: React.FC<OTPInputProps> = ({ length, onChange }) => {
    const [otp, setOtp] = useState<string[]>(Array(length).fill(''));
    const inputsRef = useRef<HTMLInputElement[]>([]);
    useEffect(() => {
        if (inputsRef.current[0]) {
            inputsRef.current[0].focus(); // Focus on the first input field when the component mounts
        }
    }, []);
    const handleChange = (value: string, index: number) => {
        if (/^[0-9]$/.test(value) || value === '') {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);
            onChange(newOtp.join(''));

            // Move focus to next input
            if (value !== '' && index < length - 1) {
                inputsRef.current[index + 1].focus();
            }

            // Move focus to previous input if empty
            if (value === '' && index > 0) {
                inputsRef.current[index - 1].focus();
            }
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
            inputsRef.current[index - 1].focus();
        }
    };

    return (
        <div className={"ltr flex justify-center"}>
            <div style={{display: 'flex', gap: '10px'}}
            >
                {Array(length)
                    .fill(0)
                    .map((_, index) => (
                        <input
                            key={index}
                            className={"otp-input"}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={otp[index]}
                            onChange={(e) => handleChange(e.target.value, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            ref={(el) => (inputsRef.current[index] = el!)}

                        />
                    ))}
            </div>
        </div>

    );
};

export default OTPInput;
