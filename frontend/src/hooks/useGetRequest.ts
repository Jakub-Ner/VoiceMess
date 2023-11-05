
export default function useGetRequest(url = 'http://192.168.1.15:8080/api/v1/contacts/') {
    fetch(url)
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));
}

useGetRequest();
