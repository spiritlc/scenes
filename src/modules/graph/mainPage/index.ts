import connecting from "./connecting";
import { graphOption } from "@/assets/config/types/graphOption";

export default function createConfig({ container }: graphOption) {
  return {
    connecting,
    container,
  };
}
