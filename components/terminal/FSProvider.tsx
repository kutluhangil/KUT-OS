"use client";

import { useEffect, useRef } from "react";
import { initFS } from "@/lib/fs/persist";

interface FSProviderProps {
  children: React.ReactNode;
}

export function FSProvider({ children }: FSProviderProps) {
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      initFS();
    }
  }, []);

  return <>{children}</>;
}
