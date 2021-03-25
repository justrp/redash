import React from "react";
import Button, { ButtonProps as AntdButtonProps } from "antd/lib/button";

interface LinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "role" | "type" | "target"> {
  href: string;
}

interface LinkWithIconProps extends LinkProps {
  children: string;
  icon: JSX.Element;
  alt: string;
  target?: "_blank" | "_parent" | "_top";
}

interface ButtonProps extends AntdButtonProps {
  href: string;
}

function DefaultLinkComponent({ children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a {...props}>{children}</a>;
}

Link.Component = DefaultLinkComponent;

function Link({ children, ...props }: LinkProps) {
  return <Link.Component {...props}>{children}</Link.Component>;
}

function LinkWithIcon({ icon, alt, children, ...props }: LinkWithIconProps) {
  return (
    <Link.Component {...props}>
      {children} {icon} <span className="sr-only">{alt}</span>
    </Link.Component>
  );
}

Link.WithIcon = LinkWithIcon;

function ExternalLink({
  icon = <i className="fa fa-external-link" aria-hidden="true" />,
  alt = "(opens in a new tab)",
  ...props
}: LinkWithIconProps) {
  return <Link.WithIcon target="_blank" rel="noopener noreferrer" icon={icon} alt={alt} {...props} />;
}

Link.External = ExternalLink;

// Ant Button will render an <a> if href is present.
function DefaultButtonLinkComponent(props: ButtonProps) {
  return <Button {...props} />;
}

ButtonLink.Component = DefaultButtonLinkComponent;

function ButtonLink(props: ButtonProps) {
  return <ButtonLink.Component {...props} />;
}

Link.Button = ButtonLink;

export default Link;
