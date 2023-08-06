import { CustomImage } from "../components/Backgrounds/CustomImage";
import { Default } from "../components/Backgrounds/Default";
import { Flux } from "../components/Backgrounds/Flux";
import { Gradient } from "../components/Backgrounds/Gradient";
import { Rainbow } from "../components/Backgrounds/Rainbow";
import { Solid } from "../components/Backgrounds/Solid";
import { Sunset } from "../components/Backgrounds/Sunset";
export type BackgroundMappingType = {
  [key:string]: JSX.Element
}

export const backgroundMapping: BackgroundMappingType = {
  default: <Default/>,
  solid: <Solid/>,
  gradient: <Gradient/>,
  flux: <Flux/>,
  sunset:<Sunset/>,
  rainbow: <Rainbow/>,
  customImage:<CustomImage/>
}