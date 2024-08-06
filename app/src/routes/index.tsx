import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik'
import { routeLoader$, type DocumentHead } from '@builder.io/qwik-city'

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
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
})

export const imageUrl = (url: string) => {
  return new URL(url, import.meta.env.VITE_APP_URL).toString()
}

export default component$(() => {
  const ANIMATION_SPEED = 400

  const signal = useHomePageImages()

  const imageUrl = (url: string) => {
    return new URL(url, import.meta.env.VITE_APP_URL).toString()
  }

  const currentOffset = useSignal(0)

  useVisibleTask$(({ cleanup }) => {
    // TODO: make somewhat responsive (stop using hardcoded values)
    // TODO: when an image is moved out of the screen, bring it back to the end so it is infinite
    // TODO: pause when navigating away
    const interval = setInterval(() => {
      currentOffset.value++
    }, ANIMATION_SPEED)
    cleanup(() => clearInterval(interval))
  })

  return (
    <main class="h-full flex flex-start items-center relative overflow-hidden">
      <div
        class={`flex flex-shrink-0 overflow-x-scroll gap-2 scroll-smooth transition-transform ease-linear`}
        style={{
          transform: `translateX(-${currentOffset.value}rem)`,
          transitionDuration: `${ANIMATION_SPEED}ms`,
        }}
      >
        {signal.value.map((image) => {
          const url = imageUrl(image.attributes.formats.large.url)
          return (
            <div class="w-[800px] h-[800px]">
              <img
                style={{ backgroundImage: `url(${url})` }}
                // width="800"
                // height="800"
                class="w-full h-full object-cover bg-center bg-cover bg-no-repeat"
              />
            </div>
          )
        })}
      </div>
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
