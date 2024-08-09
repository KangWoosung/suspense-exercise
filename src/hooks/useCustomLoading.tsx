import { useEffect, useRef, useState } from "react";
import { useNavigation } from "react-router-dom";

export default function useCustomLoading() {
  const { state } = useNavigation();
  const [isSuspenseLoading, setIsSuspenseLoading] = useState(false);
  const [activeLoader, setActiveLoader] = useState<string | null>(null);
  const navigationStartTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (state === "loading" && !isSuspenseLoading) {
      navigationStartTimeRef.current = Date.now();
      setActiveLoader("navigation");
    } else if (state === "idle") {
      const navigationDuration =
        Date.now() - (navigationStartTimeRef.current || 0);

      // 매우 짧은 시간 내에 loading에서 idle로 변경된 경우, 이를 Suspense로 간주
      if (navigationDuration < 50 && isSuspenseLoading) {
        setActiveLoader("suspense");
      } else if (!isSuspenseLoading) {
        setActiveLoader(null);
      }

      navigationStartTimeRef.current = null;
    }
  }, [state, isSuspenseLoading]);

  useEffect(() => {
    if (isSuspenseLoading) {
      setActiveLoader("suspense");
    } else if (state !== "loading") {
      setActiveLoader(null);
    }
  }, [isSuspenseLoading, state]);

  return {
    activeLoader,
    setIsSuspenseLoading,
    isSuspenseActive: activeLoader === "suspense",
  };
}
