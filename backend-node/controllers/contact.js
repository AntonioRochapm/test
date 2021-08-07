import {Contact} from '../models/contact.js'
import {validateContactInfo} from '../validator/contact.js'

//Get all
export async function getAllContacts(req, res){
  try {
    const contacts = await Contact.find()
    res.json(contacts)
  } catch (error) {
    res.status(500).json({message : error.message})
  }
}

//Get one
export function getContact(req, res){
  res.status(200).json(res.contact)
}

//Create
export async function createContact(req, res){
  try {
    //Object destructuring (descontruir um objecto em JS)
    const contact = new Contact({
      name: req.body.name,
      phone_number: req.body.phone_number
    })

    //Validate data (Validar os dados enviados pelo formulário)
    validateContactInfo(contact.name, contact.phone_number)

  
    const new_contact = await contact.save()
    res.status(201).json(new_contact)
  } catch (error) {    
    res.status(400).json({message : error.message})
  }
}

//Update
export async function updateContact(req, res){
  try {

    //Object destructuring (descontruir um objecto em JS)
    const contact = new Contact({
      name: req.body.name,
      phone_number: req.body.phone_number
    })

    //Validate data (Validar os dados enviados pelo formulário)
    validateContactInfo(contact.name, contact.phone_number)
    res.contact.name = contact.name
    res.contact.phone_number = contact.phone_number
    //Save on DB (Salvar na base de dados)
    const updated_contact = await res.contact.save()
    res.json(updated_contact)
  } catch (error) {
    res.status(400).json({message: error.message})
  }
}

//Delete
export async function deleteContact(req, res){
  try {
    await res.contact.remove()
    
    res.status(200).json({ message: 'Contact deleted succefully' })
  } catch (error) {
    res.status(500).json({message: error.message})
  }
}