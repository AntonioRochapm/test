<template>
    <section>        
        <individual-contact v-for="user in users" :key="user.id"      
        :id="user.id"   
        :name="user.name"
        :phone-number="user.phone_number"
        @delete-contact="removeContact"                     
        >
        <div slot="details">
            <h5>{{ user.name }}</h5>
            <p>Phone: {{ user.phone_number }}</p>            
            <button @click="showContact(user.id)" class="btn btn-info">Show</button>
            <button @click="editContact(user.id)" class="btn btn-primary">Update</button>                
            <button @click="removeContact(user.id)" class="btn btn-danger">Delete</button>     
        </div>
        </individual-contact>
    </section>  
</template>

<script>
import IndividualContact from './IndividualContact.vue'
import {saveContact,getAllContacts,getContactbyId,deleteContact} from '../../services/contact.js'
import Model from '../../models/contact.js'

export default {
    components:{
        'individual-contact': IndividualContact
    },
    data(){
        return{
            users:[],
            contactIsActive: false
        }
    },
    async mounted(){                
        this.users = await getAllContacts();
        console.log(this.users)      
    },
    async created(){
        window.Event.$on('new-contact', async (name, phone) => {
            console.log('aquii')
            const addContact = new Model(null,name,phone)

            await saveContact(addContact);

            this.users = await getAllContacts();
        })
        window.Event.$on('updated-contact-list', async () => {
            this.users = await getAllContacts();
        })
    },
    methods:{
        async removeContact(id){           
            
            await deleteContact(id);
            this.users = await getAllContacts();
        },
        async showContact(id){             
            const contact = await getContactbyId(id);           
            window.Event.$emit('send-data-show', contact);
        },
        async editContact(id){
            
            const contact = await getContactbyId(id); 
            
            window.Event.$emit('send-data-update', contact);           
        }
    }    
}
</script>

<style scoped>
h5 {
  font-size: 1.25rem;
  margin: 0rem 0;
}
p{
    font-size: 0.75rem;
    margin: 0.5rem 0;
}
section{
    display: grid;
    grid-template-columns: 1fr 1fr;
}

@media screen and (max-width: 700px) {
    section{
        grid-template-columns: 1fr;
    }
}

@media screen and (min-width: 992px) {
    section{
        grid-template-columns: 1fr 1fr 1fr;
    }
}
</style>
