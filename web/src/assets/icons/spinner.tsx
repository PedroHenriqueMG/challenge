import { IconProps } from "@/interface/iconProps";

export const Spinner = ({ height, width }: IconProps) => {
  return (
    <svg
      width={width}
      height={height}
      fill="none"
      className="animate-spin"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M32.0221 3.49765L30.1969 2.90423L28.3269 2.47214L26.4264 2.20468L24.5098 2.10388L22.5917 2.17051L20.6867 2.40405L18.8093 2.80274L16.9738 3.36354L15.1942 4.08217L13.484 4.95318L11.8562 5.96993L10.3232 7.12468L8.89663 8.40865L7.58745 9.81206L6.40556 11.3242L5.35996 12.9337L4.45861 14.6281L3.70837 16.3946L3.11495 18.2198L2.68287 20.0898L2.41541 21.9904L2.31461 23.907L2.38123 25.8251L2.61478 27.73L3.01347 29.6074L3.57427 31.4429L4.2929 33.2226L5.16391 34.9328L6.18066 36.5606L7.33541 38.0936L8.61937 39.5201L10.0228 40.8293L11.535 42.0112L13.1444 43.0568L14.8388 43.9581L16.6054 44.7084L18.4306 45.3018L20.3006 45.7339L22.2011 46.0013L24.1177 46.1021L26.0358 46.0355"
        stroke="url(#paint0_linear_3308_38910)"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <defs>
        <linearGradient
          id="paint0_linear_3308_38910"
          x1="-3.71814"
          y1="37.1054"
          x2="37.8782"
          y2="3.57106"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#006FBB" />
          <stop offset="1" stopColor="#4AF1F9" />
        </linearGradient>
      </defs>
    </svg>
  );
};
