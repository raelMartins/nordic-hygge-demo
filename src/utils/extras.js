import { appWindow } from "../constants/routes";

const isMobile = appWindow?.matchMedia("(max-width: 700px)").matches;

export default isMobile;

