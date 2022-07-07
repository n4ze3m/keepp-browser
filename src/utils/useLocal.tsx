import React from "react"

export default function useLocal(key: string) {
  const [value, setValue] = React.useState<string | null>(null)
  React.useEffect(() => {
    chrome.storage.local.get(key, (result) => {
      setValue(result[key])
    })
  }, [key])
  return [value]
}
