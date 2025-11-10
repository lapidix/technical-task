"use client";

import { ToastType } from "@/shared/types";
import { createContext } from "react";

export interface ToastMessage {
  id: string;
  message: string;
  type: ToastType;
}

export interface ToastContextType {
  toasts: ToastMessage[];
  showToast: (message: string, type?: ToastMessage["type"]) => void;
  hideToast: (id: string) => void;
}

export const ToastContext = createContext<ToastContextType | undefined>(
  undefined
);
