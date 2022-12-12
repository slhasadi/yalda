import Image from 'next/image'  

export function NextImageProxy(actualImageUrl: string, width: number|675, height: number| 320, title:string) {
  return <Image src={`/api/imageProxy?imageUrl=${actualImageUrl}`} objectFit='cover' layout='responsive' width={width} height={height} alt={title} />  
}