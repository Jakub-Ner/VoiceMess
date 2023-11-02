
export default function useGetRequest(url = 'http://127.0.0.1:8080/') {
    fetch(url)
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));
}

useGetRequest();
