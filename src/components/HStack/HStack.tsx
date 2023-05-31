export function HStack(props: React.HTMLAttributes<HTMLDivElement>) {
  const { children, className, ...otherProps } = props;

  return (
    <div className={`flex ${className}`} {...otherProps}>
      {children}
    </div>
  );
}
