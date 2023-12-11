import { useEffect, useState } from "react";

export default function useRequest(url, method = 'GET') {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch(url, {
      method: method,
    })
        .then(response => response.json())
        .then(data => setData(data))
        .catch(error => console.error(error));
  }, []);
  return data;

}
