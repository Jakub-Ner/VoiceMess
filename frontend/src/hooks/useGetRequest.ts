import { useEffect, useState } from "react";

export default function useGetRequest(url = 'http://192.168.1.15:8080/api/v1/contacts/') {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error(error));
  }, []);
  return data;

}
