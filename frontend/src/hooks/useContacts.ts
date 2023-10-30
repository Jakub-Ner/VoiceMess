import { useEffect, useState } from "react";
import * as Contacts from "expo-contacts";

interface IListItem {
  title: string;
  description: string;
}
export const useContacts = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    (async () => {
      const {status} = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const {data} = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Emails],
        });

        const tempContacts: IListItem[] = data.map((contact) => {
          return {
            title: contact.name,
            description: contact.lookupKey,
          }
        });
        setContacts(tempContacts)
      }
    })();
  }, []);

  return contacts;
}
