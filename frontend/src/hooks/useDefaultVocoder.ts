import { useEffect, useState } from "react";
export const lackOfDefaultVocoder = 'Brak domyślnego vocodera';

export function useDefaultVocoder(ip: string, contactId: string) {
  const [defaulVocoder, _setDefaulVocoder] = useState(null)
  const url = `${ip}/api/v1/contacts/${contactId}/`

  useEffect(() => {
    fetch(url, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(data => {
        const vocoderId = data.vocoder_id || lackOfDefaultVocoder
        _setDefaulVocoder(vocoderId)
      })
      .catch(error => console.error(error));
  }, []);

  const setDefaultVocoder = (vocoderId: string) => {
    if (vocoderId === undefined){
      vocoderId = null;
    }
    fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        vocoder_id: vocoderId,
        contact_id: contactId,
        customer_id: 'faceborokId', // remove it
      })
    })
      .then(response => response.json())
      .then(data => {
        _setDefaulVocoder(data.vocoder_id)
      })
      .catch(error => console.error(error));
  }
  return [defaulVocoder, setDefaultVocoder]
}


export function useUserDefaultVocoder(ip: string, facebookId: string) {
  const [defaulVocoder, _setDefaulVocoder] = useState(null)
  const url = `${ip}/api/v1/customer/${facebookId}/`

  useEffect(() => {
    fetch(url, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(data => {
        const vocoderId = data.default_vocoder_id || lackOfDefaultVocoder
        _setDefaulVocoder(vocoderId)
      })
      .catch(error => console.error(error));
  }, []);

  const setUserDefaultVocoder = (vocoderId: string) => {
    if (vocoderId === undefined){
      vocoderId = null;
    }
    fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        default_vocoder_id: vocoderId,
        facebook_id: facebookId, // remove it
      })
    })
      .then(response => response.json())
      .then(data => {
        _setDefaulVocoder(data.default_vocoder_id)
      })
      .catch(error => console.error(error));
  }
  return [defaulVocoder, setUserDefaultVocoder]
}

export function getDefaultVocoderIndex(vocoders, data, defaultVocoder) {
  console.log(defaultVocoder)
  if (!vocoders || !defaultVocoder || !data) {
    return 0;
  }
  if (defaultVocoder === lackOfDefaultVocoder) {
    return 0;
  }
  const index = data.findIndex((vocoder) => vocoder.eleven_labs_id === defaultVocoder);
  return index === -1 ? 0 : index + 1;
}

export function getUserDefaultVocoderIndex(vocoders, data, defaultVocoder) {
  console.log(defaultVocoder)
  if (!vocoders || !defaultVocoder || !data) {
    return 0;
  }
  if (defaultVocoder === lackOfDefaultVocoder) {
    return 0;
  }
  const index = data.findIndex((vocoder) => vocoder.eleven_labs_id === defaultVocoder);
  return index === -1 ? 0 : index;
}
