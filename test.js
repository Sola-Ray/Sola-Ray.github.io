async function storeSpotifyCodeInChromeStorage(code) {
    return new Promise((resolve, reject) => {
        chrome.storage.local.set({ 'spotify_code': code }, () => {
            if (chrome.runtime.lastError) {
                reject("Error while storing spotify_code in Chrome storage");
            } else {
                resolve("Spotify code stored in Chrome storage successfully");
            }
        });
    });
}

async function main() {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    console.log("Code récupéré depuis l'URL :", code);

    try {
        const result = await storeSpotifyCodeInChromeStorage(code);
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}

main();
