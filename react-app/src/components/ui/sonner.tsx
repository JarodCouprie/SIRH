import { Toaster as Sonner } from "sonner";
import React from "react";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  // const { theme = "system" } = useTheme();

  return (
    <Sonner
      // theme={theme as ToasterProps["theme"]}
      className="toaster group"
      position="top-right"
      invert={true}
      theme={"dark"}
      richColors={true}
      {...props}
    />
  );
};

export { Toaster };
