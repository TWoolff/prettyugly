import Image from 'next/image'
import { useAppContext } from '@/app/context'
import css from './imagetext.module.css'

interface ImageTextProps {
  data: {
    fields: {
      id: string
      image: {
        fields: {
          file: {
            url: string
            details: {
              image: {
                width: number
                height: number
              }
            }
          }
        }
      }
      textEnglish: {
        content: Array<{
          content: Array<{
            value: string
          }>
        }>
      }
      textDanish: {
        content: Array<{
          content: Array<{
            value: string
          }>
        }>
      }
      placement: boolean
    }
  }
}

const ImageText = ({ data }: ImageTextProps) => {
  const { state } = useAppContext()
  const { language } = state
  
  if (!data?.fields) return null
  
  const content = language === 'en-US' 
    ? data.fields.textEnglish.content
    : data.fields.textDanish.content

  const renderContent = (content: any[]) => {
    return content.map((node, index) => {
      switch (node.nodeType) {
        case 'paragraph':
          return <p key={index}>{node.content[0]?.value}</p>
        case 'heading-2':
          return <h2 key={index}>{node.content[0]?.value}</h2>
        default:
          return null
      }
    })
  }

  return ( 
    <div className={`${css.container} ${data.fields.placement ? css.sideBySide : css.stacked} grid`}>
      <div className={css.content}>
        {renderContent(content)}
      </div>
      <Image 
        src={`https:${data.fields.image.fields.file.url}`} 
        alt={data.fields.id}
        width={data.fields.image.fields.file.details.image.width}
        height={data.fields.image.fields.file.details.image.height}
      />
    </div>
   )
}

export default ImageText
