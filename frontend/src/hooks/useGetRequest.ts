import { useEffect, useState } from "react";

export default function useGetRequest(url = 'http://192.168.14.225:8080') {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error(error));
  }, []);
  return data;

}
