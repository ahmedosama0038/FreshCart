"use client";

import { useState, useRef } from "react";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";

interface Props {
  onNext: (otp: string) => void;
  onBack: () => void;
}

export default function StepOTP({ onNext, onBack }: Props) {

  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));

  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (value: string, index: number) => {

    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];

    newOtp[index] = value;

    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }

  };

  const handleKeyDown = (
    e: React.KeyboardEvent,
    index: number
  ) => {

    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }

  };

  const handlePaste = (
    e: React.ClipboardEvent
  ) => {

    const paste = e.clipboardData
      .getData("text")
      .slice(0, 6);

    if (!/^\d+$/.test(paste)) return;

    const newOtp = paste.split("");

    setOtp([
      ...newOtp,
      ...new Array(6 - newOtp.length).fill("")
    ]);

    inputsRef.current[paste.length - 1]?.focus();

  };

  const handleSubmit = () => {

    const finalOtp = otp.join("");

    if (finalOtp.length < 6) {
      toast.error("Please enter the 6-digit code");
      return;
    }

    onNext(finalOtp);

  };

  return (

    <div className="space-y-8">

      <div className="text-center lg:text-left">

        <h3 className="text-2xl font-bold">
          Verify Code
        </h3>

        <p className="text-gray-400 text-sm">
          Enter the 6-digit code
        </p>

      </div>

      <div className="flex gap-2">

        {otp.map((digit, index) => (

          <input
            key={index}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
          ref={(el: HTMLInputElement | null) => {
  inputsRef.current[index] = el;
}}
            onPaste={handlePaste}
            onChange={(e) =>
              handleChange(
                e.target.value,
                index
              )
            }
            onKeyDown={(e) =>
              handleKeyDown(e, index)
            }
            className="w-12 h-14 text-center border rounded-xl"
          />

        ))}

      </div>

      <button
        onClick={handleSubmit}
        className="w-full py-3 bg-green-600 text-white rounded-xl"
      >
        Verify
      </button>

      <button
        onClick={onBack}
        className="text-gray-400 flex gap-2 items-center justify-center"
      >
        <FontAwesomeIcon icon={faArrowLeft} />
        Back
      </button>

    </div>

  );

}
