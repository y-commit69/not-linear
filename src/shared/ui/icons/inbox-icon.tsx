import type { IconName } from "./icons";
import type { SVGProps } from "react";
const spriteHref = "/sprite.svg";
export const InboxIcon = ({
  name,
  ...props
}: SVGProps<SVGSVGElement> & {
  name: IconName;
}) => {
  return (
    <svg {...props}>
      <use href={`${spriteHref}#${name}`} />
    </svg>
  );
};