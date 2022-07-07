import { Container, Skeleton } from "@mantine/core"
import { useQuery } from "react-query"

import { useStorage } from "@plasmohq/storage"

import { Protect } from "~components/Common/Protected"
import InfoCard from "~components/Info"
import SaveKeep from "~components/save"
import useLocal from "~utils/useLocal"

export type TabInfo = {
  url: string
  fullUrl: string
  title?: string
  image?: string
}

export default function AddPage() {
  const fetchCurrentSite = () => {
    const url = new URL(window?.location?.href)
    const title = document?.title || url.hostname
    const metaImage = document.querySelector("meta[property='og:image']")
    const image = metaImage ? metaImage.getAttribute("content") : null
    return {
      url: url.hostname,
      title: title,
      image: image,
      fullUrl: url.href
    }
  }

  const getTabId = async () => {
    const tab = await chrome.tabs.query({ active: true, currentWindow: true })
    return tab[0].id
  }

  const [token] = useLocal("token")

  const fetchSite = async () => {
    const tabId = await getTabId()
    console.log(tabId)
    const response = await chrome.scripting.executeScript({
      target: {
        tabId: tabId
      },
      func: fetchCurrentSite
    })
    if (response.length === 0) {
      return null
    } else {
      return response[0]["result"]
    }
  }

  const { status, data: cardData } = useQuery<TabInfo>("site", fetchSite)

  return (
    <>
      <Container>
        {status === "loading" && <Skeleton mt="sm" />}
        {status === "success" && <InfoCard data={cardData} />}
        <SaveKeep />
      </Container>
    </>
  )
}
