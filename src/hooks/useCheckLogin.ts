import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

import { verifyUserLocal } from 'utils';

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