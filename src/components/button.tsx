// import { FC } from "react";
import { TouchableOpacity } from "react-native";

export const Button = ({
  children,
  secondary = false,
  outline = false,
  ...props
}) => {
  return (
    <TouchableOpacity
      className={`grid w-full min-w-full items-center justify-center rounded-full ${secondary ? "bg-transparent" : "bg-[#18EAFF]"} ${outline ? "border border-[#18EAFF]" : "border-none"}  px-6 py-4`}
      {...props}
    >
      {children}
    </TouchableOpacity>
  );
};
