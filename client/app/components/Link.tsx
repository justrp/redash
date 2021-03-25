import React from "react";
import Button, { ButtonProps as AntdButtonProps } from "antd/lib/button";

interface LinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "role" | "type" | "target"> {
  href: string;
}

interface LinkWithIconProps extends LinkProps {
  children: string;
  icon: JSX.Element;
  alt: string;
}

interface ButtonProps extends AntdButtonProps {
  href: string;
}

function DefaultLinkComponent({ children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a {...props}>{children}</a>;
}

Link.Component = DefaultLinkComponent;

function Link({ tabIndex = 0, children, ...props }: LinkProps) {
  return (
    <Link.Component tabIndex={tabIndex} {...props}>
      {children}
    </Link.Component>
  );
}

function LinkWithIcon({ icon, alt, children, ...props }: LinkWithIconProps) {
  return (
    <Link {...props}>
      {children} {icon} <span className="sr-only">{alt}</span>
    </Link>
  );
}

Link.WithIcon = LinkWithIcon;

function ExternalLink({
  icon = <i className="fa fa-external-link" aria-hidden="true" />,
  alt = "(opens in a new tab)",
  ...props
}: LinkWithIconProps) {
  const externalLinkProps = { target: "_blank", rel: "noopener noreferrer", icon, alt };

  return <Link.WithIcon {...externalLinkProps} {...props} />;
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
