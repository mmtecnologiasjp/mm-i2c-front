export function VStack(props: React.HTMLAttributes<HTMLDivElement>) {
  const { children, className, ...otherProps } = props;

  return (
    <div className={`flex flex-col ${className}`} {...otherProps}>
      {children}
    </div>
  );
}
