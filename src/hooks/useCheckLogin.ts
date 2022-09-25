import React, { useMemo } from 'react';
import { useRouter } from 'next/router';
import { verifyUserLocal } from 'utils';
import { toast } from 'react-toastify';

export default () => {
  const router = useRouter();

  useMemo(() => {
    if (router.pathname !== "/") {
      if (typeof window !== "undefined" && !verifyUserLocal()) {
        toast.warn("Please login first");
        router.push("/");
      }
    }
  }, [router.pathname]);


}