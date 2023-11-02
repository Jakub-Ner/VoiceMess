
export default function useGetRequest(url = 'http://192.168.14.225:8080') {
    fetch(url)
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));
}

useGetRequest();
