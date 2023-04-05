import { AiOutlineLoading3Quarters } from "react-icons/ai";

type ButtonProps = {
  title: string;
  className?: string;
  icon?: JSX.Element;
  loading?: boolean;
} & React.ComponentProps<"button">;

const Button = ({
  title,
  icon,
  className,
  loading,
  children,
  ...rest
}: ButtonProps) => {
  return (
    <button
      disabled={loading}
      {...rest}
      className={`relative h-[50px] text-sm uppercase bg-primary text-white w-full p-3 py-[10px] outline-none flex justify-center gap-3 items-center disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer transition shadow-sm rounded-lg border-transparent border-[1px] hover:bg-primary_hover hover:border-[1px] duration-500 ${className}`}
    >
      <span className="flex flex-row gap-2 items-center">
        {title}
        {loading ? (
          <AiOutlineLoading3Quarters size={17} className="animate-spin" />
        ) : (
          icon
        )}
      </span>
      {children}
    </button>
  );
};

export default Button;
