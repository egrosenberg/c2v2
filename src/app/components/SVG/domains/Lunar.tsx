import type { SVGIconProps } from "../types";

export default function Lunar({ color, size }: SVGIconProps) {
  return (
    <svg
      id="Layer_1"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 495.44 468.7"
      width={size}
      height={size}
    >
      <defs></defs>
      <path
        fill={(color ?? "page.text.initial") as string}
        d="M363.31,1.85c50.26,35.94,83.03,94.79,83.03,161.3,0,109.44-88.72,198.17-198.17,198.17S50,272.6,50,163.15C50,95.49,83.93,35.75,135.69,0,55.17,40.9,0,124.5,0,220.99c0,136.81,110.91,247.72,247.72,247.72s247.72-110.91,247.72-247.72c0-95.06-53.55-177.6-132.13-219.13Z"
      />
      <circle fill={color as string} cx="248.17" cy="163.15" r="140.13" />
    </svg>
  );
}
