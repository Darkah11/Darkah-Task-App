// src/components/Modal.tsx
"use client";

import { useRef, useEffect, useState, ReactNode } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export default function Modal({ children, isOpen, onClose }: ModalProps) {
  const [mounted, setMounted] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  if (!mounted || !isOpen) return null;

  // Render the modal into the 'body' element
  return createPortal(
    <div className="fixed inset-0  flex items-center justify-center z-50 py-3 ">
      <div
        onClick={onClose}
        className=" bg-black/80 bg-opacity-50 absolute top-0 left-0 w-full h-full"
      />
      <div
        className=" relative bg-app-card p-6 rounded shadow-lg max-w-sm w-full max-h-full overflow-y-scroll no-scrollbar"
        ref={modalRef}
      >
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className=" absolute top-6 right-6 text-gray-500 hover:text-gray-700 text-xl"
          >
            &times; {/* Close symbol */}
          </button>
        </div>
        {children}
      </div>
    </div>,
    document.body // This mounts it directly under the body tag
  );
}
