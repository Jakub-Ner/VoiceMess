import { useEffect, useState } from "react";

export default function useVocoders(ip, facebookId) {
  const [vocoders, setVocoders] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const url = `${ip}/api/v1/vocoder/list/${facebookId}/`;
    console.log(url)
    fetch(url, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(data => {
        setData(data)
        setVocoders(data?.map((vocoder) => vocoder.name))
      })
      .catch(error => console.error(error));
  }, []);

  return [vocoders, setVocoders, data, setData]
}
