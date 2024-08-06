import { component$ } from '@builder.io/qwik'
import { routeLoader$, type DocumentHead } from '@builder.io/qwik-city'
import { stack } from '~/styled-system/patterns'
import { HStack } from '~/styled-system/jsx'
import { css } from '~/styled-system/css'

interface ImageData {
  ext: string
  url: string
  hash: string
  mime: string
  name: string
  path: string | null
  size: number
  width: number
  height: number
  sizeInBytes: number
}

interface ImageResponse {
  data: {
    attributes: {
      images: {
        data: [
          {
            id: number
            attributes: {
              name: string
              alternativeText: string | null
              caption: string | null
              width: number
              height: number
              formats: {
                large: ImageData
                small: ImageData
                medium: ImageData
                thumbnail: ImageData
              }
              hash: string
              ext: string
              mime: string
              size: number
              url: string
              previewUrl: string | null
              provider: string | null
              provider_metadata: string | null
              createdAt: string
              updatedAt: string
            }
          },
        ]
      }
    }
  }
}

export const useHomePageImages = routeLoader$(async () => {
  const res = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}home-pages/1?populate=*`,
    {
      headers: new Headers({
        Authorization: 'Bearer ' + import.meta.env.VITE_API_TOKEN,
      }),
    }
  )
  const {
    data: {
      attributes: { images: images },
    },
  } = (await res.json()) as ImageResponse

  return images.data
})

export const imageUrl = (url: string) => {
  return new URL(url, import.meta.env.VITE_APP_URL).toString()
}

export default component$(() => {
  const signal = useHomePageImages()

  const imageUrl = (url: string) => {
    return new URL(url, import.meta.env.VITE_APP_URL).toString()
  }

  return (
    <main
      class={stack({
        height: 'full',
        alignItems: 'flex-start',
        justifyContent: 'center',
        position: 'relative',
      })}
    >
      <HStack class={css({ overflowX: 'scroll' })}>
        {signal.value.map((image) => {
          const url = imageUrl(image.attributes.formats.large.url)
          return (
            <div class={css({ width: '800px', height: '800px' })}>
              <img
                style={{ backgroundImage: `url(${url})` }}
                // width="800"
                // height="800"
                class={css({
                  // minWidth: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  bgPosition: 'center',
                  bgSize: 'cover',
                  bgRepeat: 'no-repeat',
                })}
              />
            </div>
          )
        })}
      </HStack>
    </main>
  )
})

export const head: DocumentHead = {
  title: 'Lucie Langlois - Artiste peintre',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description',
    },
  ],
}
