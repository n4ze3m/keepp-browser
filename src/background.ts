export { }


let data = []

chrome.runtime.onMessageExternal.addListener(
    function (request, sender, sendResponse) {
        console.log(request)
        const method = request.method

        if (method === 'connected') {
            return sendResponse({
                message: data.length > 0
            })
        } else if (method === 'connect') {
            data.push(request.data)
            return sendResponse({
                message: true
            })
        }
        return sendResponse({
            message: false
        })
    });