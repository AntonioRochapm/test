export default class Contact {
  /**
   * Create a contact object to be used inside the client application
   *
   * @param {*} id
   * @param {*} name
   * @param {*} phone_number
   */
  constructor(id, name, phone_number){
    this.id = id
    this.name = name
    this.phone_number = phone_number
  }
}
