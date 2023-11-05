import { useEffect, useState } from "react";

export default function usePostRequest(body, url) {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,

    })
      .then((response) => response.json())
      .then((data) => {
          setData(data)
        console.log("Success:", data);
        }
      )
      .catch((error) => {
        setData(error)
        console.error("Error:", error);
      });
  }, []);

  return data;
}
