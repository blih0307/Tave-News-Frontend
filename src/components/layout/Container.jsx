export default function Container({ children, className = '' }) {
  return <div className={`max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 ${className}`}>{children}</div>
}