import { useEffect, useState } from "react";
import * as Contacts from "expo-contacts";
import { Contact } from "expo-contacts";
import { postRequest } from "../utils";

interface IListItem {
  title: string;
  description: string;
}
// TODO: Get pictures from contacts
export const useContacts = (facebook_id, IP) => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    (async () => {
      const {status} = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const {data} = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers],
        });
        const tempContacts: IListItem[] = data.map((contact: Contact) => {
          const body = JSON.stringify({
            contact_id: contact.phoneNumbers?.[0]?.number,
            customer_id: facebook_id
          });
          console.log("send request")
          postRequest(body, `${IP}/api/v1/contacts/`);
          return {
            title: contact.name,
            description: contact.phoneNumbers?.[0]?.number || "No phone number",
          }
        });
        setContacts(tempContacts)
      }
    })();
  }, []);

  return contacts;
}
