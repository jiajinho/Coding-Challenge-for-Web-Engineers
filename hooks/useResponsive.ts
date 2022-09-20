import { useEffect } from "react";
import { useMediaQuery } from "react-responsive";

import config from "config";
import useViewportStore from "stores/useViewportStore";

export default () => {
  const setViewport = useViewportStore(state => state.setViewport);

  const sm = useMediaQuery({ minWidth: config.viewport.sm });
  const md = useMediaQuery({ minWidth: config.viewport.md });
  const lg = useMediaQuery({ minWidth: config.viewport.lg });

  useEffect(() => {
    setViewport({ sm, md, lg });
  }, [sm, md, lg]);
}