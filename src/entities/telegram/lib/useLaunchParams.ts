import { useMemo } from "react";
import { retrieveLaunchParams } from "@telegram-apps/sdk-react";


export const useLaunchParams = () => {
  return useMemo(() => retrieveLaunchParams(), []);
}
