import Image from 'next/image'

const Logo = ({ width = 50, height = 50, className = '', alt = 'HLPFLCG Logo' }) => {
  return (
    <Image
      src="/logo.svg"
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority
    />
  )
}

export default Logo
