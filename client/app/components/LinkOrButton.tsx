import { omit } from "lodash";
import React from "react";
import Link, { LinkProps } from "@/components/Link";
import PlainButton, { PlainButtonProps } from "@/components/PlainButton";

export type LinkButtonProps = PlainButtonProps | LinkProps;

export default function LinkOrButton(props: LinkButtonProps) {
  if ("href" in props) {
    return <Link {...omit(props, "onClick")} />;
  }

  return <PlainButton type="link" {...omit(props, "href")} />;
}
