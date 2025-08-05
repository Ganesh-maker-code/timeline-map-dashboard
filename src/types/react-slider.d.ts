declare module "react-slider" {
  import React from "react";

  export interface SliderProps {
    min: number;
    max: number;
    value: number;
    onChange: (value: number) => void;
    renderThumb: (
      props: React.HTMLAttributes<HTMLDivElement>
    ) => React.ReactNode;
    renderTrack: (
      props: React.HTMLAttributes<HTMLDivElement>
    ) => React.ReactNode;
  }

  const Slider: React.FC<SliderProps>;
  export default Slider;
}
