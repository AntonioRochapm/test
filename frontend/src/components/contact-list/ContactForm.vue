<template>
    <section>
        <base-card>
            <div v-if="disabled&&!contactIsUpdated">
                <h1>Show Contact</h1>
            </div> 
            <div v-else-if="!disabled&&contactIsUpdated">
                <h1>Update Contact</h1>
            </div>             
            <div v-else>
                <h1>Add Contact</h1>
            </div>            
            <form >
                <input type="hidden" ref="id">
                <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="name" :disabled="disabled == 1" v-model="name"/>
                    <label for="name">Name</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="phoneNumber" name="phoneNumber" :disabled="disabled == 1" v-model="phoneNumber" />
                    <label for="phoneNumber">Phone Number</label>
                </div>                     
                <div>
                    <button v-if="!disabled&&!contactIsUpdated&&formIsInvalid" type="submit" @click.prevent="submitData" class="btn btn-primary">Submit</button>
                    <div v-else-if="!disabled&&contactIsUpdated">
                        <button type="button" @click.prevent="submitUpdated" class="btn btn-success">Submit</button>
                        <button type="button" @click.prevent="clearFields" class="btn btn-warning">Clear</button>
                    </div>            
                    <button type="button" v-else-if="disabled&&!contactIsUpdated" @click.prevent="clearFields" class="btn btn-warning">Clear</button>
                </div>
            </form>        
        </base-card>
    </section>
</template>

<script>
import { getContactbyId,updateContact } from '../../services/contact';
import BaseCard from '../UI/BaseCard.vue'


export default {
    components:{
        'base-card': BaseCard,     
    },
    data(){
    return {
        inputIsInvalid: false,
        disabled: false,
        contactIsActive: false,
        contactIsUpdated: false,
        updatedContactId: null,
        name: '',
        phoneNumber:  ''
    }
    },
    computed:{
        formIsInvalid(){
            if(
                this.name.trim() === '' ||
                this.phoneNumber.trim() === '' ||
                this.phoneNumber.length > 9
            ){
                return false;
            }
            return true;
        }
    },
    created(){
         window.Event.$on('send-data-show', (contact) =>{
            this.contactIsUpdated = false;

            this.name           = contact.name;
            this.phoneNumber    = contact.phone_number;       
                        
            this.disabled = true;
            this.contactIsActive = true;
        })
        window.Event.$on('send-data-update', (contact) => {      
                 
            this.disabled = false;            
            this.updatedContactId = contact._id;            
            this.name             = contact.name;
            this.phoneNumber      = contact.phone_number;           
            
            this.contactIsUpdated = true;
        }) 
    },
    methods:{
        submitData(){
            const enteredName = this.name;
            const enteredPhone = this.phoneNumber;

            window.Event.$emit('new-contact',enteredName,enteredPhone);
        },
        clearFields(){
            this.name         = '';
            this.phoneNumber  = '';           

            this.disabled = false;
            this.contactIsUpdated = false;            
        },
        async submitUpdated(){
            const contact = await getContactbyId(this.updatedContactId);
            console.log(contact)            
            contact.name         = this.name;
            contact.phone_number = this.phoneNumber;

            await updateContact(contact);

            this.clearFields();
            this.contactIsUpdated = false;
            this.updatedContactId = null;

            window.Event.$emit('updated-contact-list');
        }
    }   
}
</script>

<style scoped>


</style>