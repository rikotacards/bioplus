import React from "react";
import { CustomImage } from "../components/Backgrounds/CustomImage";
import { Default } from "../components/Backgrounds/Default";
import { Flux } from "../components/Backgrounds/Flux";
import { Gradient } from "../components/Backgrounds/Gradient";
import { Rainbow } from "../components/Backgrounds/Rainbow";
import { Solid } from "../components/Backgrounds/Solid";
import { Sunset } from "../components/Backgrounds/Sunset";
import { BackgroundName } from "./backgrounds";

type BackgroundMappingType = {
  default: React.ReactNode;
  solid: React.ReactNode;
  gradient: React.ReactNode;
  flux: React.ReactNode;
  sunset: React.ReactNode;
  rainbow: React.ReactNode;
  customImage: React.ReactNode;
};
interface BackgroundMappingProps {
  uid: string;
  backgroundComponentName: BackgroundName
}
export const BackgroundMapping: React.FC<BackgroundMappingProps> = ({
  uid,
  backgroundComponentName,
}) => {
  
  const backgroundMappingType: BackgroundMappingType = {
    default: <Default />,
    solid: <Solid />,
    gradient: <Gradient />,
    flux: <Flux />,
    sunset: <Sunset />,
    rainbow: <Rainbow />,
    customImage: <CustomImage passedInUid={uid} />,
  };
  return <>{backgroundMappingType[backgroundComponentName]}</>;
};
