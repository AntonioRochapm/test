<template>            
    <base-card style="width:20rem;" >        
        <div class="card-flex" > 
            <div class="card-img">
                <img src="https://randomuser.me/api/portraits/lego/6.jpg" alt="Card image cap">
            </div>            
            <div class="card-description">
                <slot name="details"></slot>                                                             
            </div>  
        </div>             
    </base-card> 
</template>

<script>
import BaseCard from '../UI/BaseCard.vue'

export default {
    name:"individual-contact",
    components:{
       'base-card': BaseCard,     
   },
    data(){
        return {
            animatedBlock: false,
            inputIsInvalid: false,
        }
    },
    props:{
       phoneNumber: {
           type: String,
           required: true
       },
       name: {
           type: String,
           required: true
       },      
       id:{
           type: String,
           required: true
       }
   }    
}
</script>

<style scoped>
img{
    width: 100px;     
}
.card-description, .card-img{
    display: flex;
    justify-content: center;
}
.card-flex{   
    display: flex;
    flex-direction: column;
    text-align: center;    
}

</style>