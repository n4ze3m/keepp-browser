import { gql } from "graphql-request";
import { getToken } from "~utils/token";

export { }

const endpoint = 'https://langford.stepzen.net/api/keeppt/__graphql'


chrome.contextMenus.create({
    title: "Save url to keeppt",
    id: "keeppt",
    contexts: ["all"],
});


const mutation = gql`
mutation InsertKeepWithLink($title: String!, $target_url: String!, $image: String!, $description: String!, $user_id: ID!) {
  insertKeepsWithLink(
    is_link: true
    title: $title
    target_url: $target_url
    description: $description
    image: $image
    user_id: $user_id
  ) {
    message
  }
}

`

const fetchCurrentSite = () => {
    const url = new URL(window?.location?.href)
    const title = document?.title || url.hostname
    const metaImage = document.querySelector("meta[property='og:image']")
    const image = metaImage ? metaImage.getAttribute("content") : ""
    const metaDescription = document.querySelector("meta[property='og:description']")
    return {
        title: title,
        image: image,
        target_url: url.href,
        description: metaDescription ? metaDescription.getAttribute("content") : "",
    }
}

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
    if (info.menuItemId == "keeppt") {
        const tabId = tab.id
        const response = await chrome.scripting.executeScript({
            target: {
                tabId: tabId
            },
            func: fetchCurrentSite
        })
        if (response.length !== 0) {
            const data = response[0]["result"]
            if (data) {
                const userId = await getToken()
                if (userId) {
                    const variables = {
                        ...data,
                        user_id: userId
                    }
                   await fetch(endpoint, {
                        method: "POST",
                        headers: {
                            Authorization: "apikey langford::stepzen.net+1000::7cd83a30b35ab571b850b49d37e9f1579b2a78b479be820d2ff2ce919561e2a5",
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            query: mutation,
                            variables: variables
                        })
                   })
                }

            }
        }
    }
})

chrome.runtime.onMessageExternal.addListener((request, sender, sendResponse) => {
    // if (request.jwt) {
    const method = request.method;
    switch (method) {
        case 'connect':
            const token = request.token;
            chrome.storage.local.set({ token }, () => {
                sendResponse({ message: true });
            }
            );
            break;
        case 'connected':
            chrome.storage.local.get('token', (result) => {
                console.log(result);
                sendResponse({ message: result.token ? true : false });
            })
            break;
        default:
            sendResponse({ message: false });
    }
    // }
});