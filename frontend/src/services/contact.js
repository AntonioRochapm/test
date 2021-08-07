import Contact from '../models/contact.js'

const baseurl = 'http://localhost:5501/contacts/'
const resquestHeaders = {
    "Content-type": "application/json; charset=UTF-8"
  }

  //Get all contacts
export async function getAllContacts(){
  try {
    const res = await fetch(baseurl)
    const data = await res.json()
    const contacts_list = []
    data.forEach(APIContact => {
      contacts_list.push(new Contact(APIContact._id, APIContact.name, APIContact.phone_number))
    });
    return contacts_list
  } catch (error) {
    console.error(error)
  }
}

//Get contact by Id
// export async function getContactById(contact_id){

//   try {
//     const res = await fetch(baseurl + contact_id)
//     const data = await res.json()

//     const contacts_list = []
//     data.forEach(APIContact => {
//       contacts_list.push(new Contact(APIContact._id, APIContact.name, APIContact.phone_number))
//     });

//     return data
//   } catch (error) {
//     console.error(error)
//   }
// }
export async function getContactbyId(id){
  try {
      const response = await fetch(baseurl + id)
      const data = await response.json()
      //console.log(data)
  
      return data
  } catch (error) {
      console.error(error)
  }  
  }


export async function saveContact(contact){
  try {
  const res = await fetch(baseurl, {
      method: 'POST',
      headers:{
      'Content-Type': 'application/json'
      },
      body: JSON.stringify(contact)
  })
  const data = await res.json()
  console.log(data)
  return data
  } catch (error) {
  console.log(error);
  }
  }

  export async function updateContact(contact){
    try {
      const res = await fetch(baseurl + contact._id, {
        method: 'PUT',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(contact)
      })
      console.log(res)
    } catch (error) {
      console.log(error);
    }
  }
// export async function saveContact(contact){
//   console.log(contact.id?baseurl + contact.id:baseurl)
//   try {
//     const res = await fetch(contact.id?baseurl + contact.id:baseurl, {
//       method: contact.id?"PUT":"POST",
//       body: JSON.stringify(contact),
//       headers: resquestHeaders
//     })

//     const data = await res.json()
//     const {_id, name, phone_number} = data

//     return new Contact(_id, name, phone_number)
//   } catch (error) {
//     console.error(error)
//   }
// }

export async function deleteContact(contactId){
  try {
    const res = await fetch(baseurl + contactId, {
      method: "DELETE",
      headers: resquestHeaders
    })
    const data = await res.json()
    return data
  } catch (error) {
    console.error(error)
  }
}