let db;
const request = indexedDB.open('budget_tracker', 1)

// When database version changes, an objectStore called new_budget is created
request.onupgradeneeded = function(event) {
    const db = event.target.result;
    db.createObjectStore('new_budget', { autoIncrement: true })
}

// Executes uploadBudget function on a successful request(while online)
request.onsuccess = function(event) {
    db = event.target.result;
    if (navigator.onLine) {
        uploadBudget();
    }
}

// Throws error
request.onerror = function(event) {
    console.log(event.target.errorCode);
}

// Function to save record locally while offline
function saveRecord(record) {
    const transaction = db.transaction(['new_budget', 'readwrite']);
    const store = transaction.objectStore('new_budget')
    store.add(record)
}

// Function to upload record when back online
function uploadBudget() {
    const transaction = db.transaction(['new_budget', 'readwrite']);
    const store = transaction.objectStore("new_budget");
    const getAll = store.getAll();

    getAll.onsuccess = function () {
        if (getAll.result.length > 0) {
            fetch("/api/transaction/bulk", {
                method: "POST",
                body: JSON.stringify(getAll.result),
                headers: {
                    Accept: 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(serverResponse => {
                    if (serverResponse.message) {
                        throw new Error(serverResponse)
                    }
                    const transaction = db.transaction(['new_budget', 'readwrite']);
                    const store = transaction.objectStore('new_budget')
                    store.clear();
                })
                .catch(err => console.log(err))
        }
    }
}

// Upload budget when 'online' event occurs
window.addEventListener('online', uploadBudget);