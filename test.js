async function storeSpotifyCodeInIndexedDB(code) {
    return new Promise(function(resolve, reject) {
        var request = indexedDB.open('spotify_database', 1);
        var db;

        request.onerror = function(event) {
            reject("Error opening IndexedDB database");
        };

        request.onsuccess = function(event) {
            db = event.target.result;
            var transaction = db.transaction(['spotify_data'], 'readwrite');
            var objectStore = transaction.objectStore('spotify_data');
            var putRequest = objectStore.put({ id: 1, spotify_code: code });

            putRequest.onsuccess = function(event) {
                resolve("Spotify code stored in IndexedDB successfully");
            };

            putRequest.onerror = function(event) {
                reject("Error while storing spotify_code in IndexedDB");
            };
        };

        request.onupgradeneeded = function(event) {
            var db = event.target.result;
            var objectStore = db.createObjectStore('spotify_data', { keyPath: 'id' });
            objectStore.createIndex('spotify_code', 'spotify_code', { unique: false });
        };
    });
}

async function main() {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    console.log("Code récupéré depuis l'URL :", code);

    try {
        const result = await storeSpotifyCodeInIndexedDB(code);
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}

main();
