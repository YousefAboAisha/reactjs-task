type InputProps = {
  value: string;
  // handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder: string;
  className?: string;
  icon?: JSX.Element;
} & React.ComponentProps<"input">;

const Input = ({
  value,
  placeholder,
  className,
  icon,
  ...rest
}: InputProps) => {
  return (
    <div className="relative bg-theme w-full rounded-lg">
      <div className="absolute flex justify-center p-2 rounded-l-md items-center left-2 top-[50%] translate-y-[-50%] h-full border-none outline-none text-text_light dark:text-text_dark">
        {icon}
      </div>

      <input
        value={value}
        {...rest}
        className={`h-[50px] pl-12 pr-3 full-theme rounded-lg outline-none duration-300 w-full focus:valid:border-primary focus:border-primary dark:focus:border-primary disabled:cursor-not-allowed ${className}`}
        placeholder={placeholder}
        required
      />
    </div>
  );
};

export default Input;
