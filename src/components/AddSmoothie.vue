<template>

  <div class="add-smoothie container">
      <h2 class="center-align indigo-text">Add New Food Item</h2>

      <form  @submit.prevent="AddSmoothie">

          <div class="field title">
              <label for="title">Food Title:</label>
              <input  placeholder="Type Food Title"  type="text" name="title" class="input-field" v-model="title">
          </div>

          <div class="field" v-for="(ing, index ) in indredients"  :key="index">               
                <i class="material-icons delete  right" @click="deleteIng(ing)">delete</i>               
                <input  placeholder="Edit Ingredient" type="text" name="ingredient" class="input-ingredient input-field" v-model="indredients[index]">
              
          </div>

          <div class="clear"></div>

          <div class="field add-ingredient">
            <label for="add-ingredient">Add an Ingredient:</label>
            <input   placeholder="Type Ingredient and press tab to add more"  type="text" name="add-ingredient  input-field" @keydown.tab.prevent="addIng" v-model="another">
            
         </div>

         <div class="field center-align">
           <p v-if="feedback" class="red-text">{{ feedback }}</p>
           <button class="btn pink">Save</button>
        </div>
 
 
      </form>
 
  </div>


</template>

<script>
import db from '@/firebase/init'
import slugify from 'slugify'
export default {
  name: 'AddSmoothie',
  data () {
    return {
      title: null,
      another: null,
      indredients: [],
      feedback:null,
      slug:null
    }
  },
  methods:{
     AddSmoothie(){
      // console.log(this.title, this.indredients);
      if(this.title){
         
          this.feedback = null,
          this.slug = slugify(this.title, {
            replacement:'-',
            remove: /[$#%^&*():'";,><:@]/g,
            lower:true
          })       

          console.log( this.indredients);
         
         db.collection('smoothies').add({
            title: this.title,
            ingredients: this.indredients,
            slug:this.slug
          }).then(()=>{
            this.$router.push({name: 'Index'})
          }).catch(err=>{
            console.log(err);
          })
        
      }else{
        this.feedback = 'You must enter a smoothie title'
      }
     },
     addIng(){
       if(this.another){
         this.indredients.push(this.another)
          this.another = null;
          this.feedback = null;
       }else{ 
         this.feedback = 'You must enter a value to add ingredient'
       }
     },
     deleteIng(ing){

       console.log(ing);
          this.indredients = this.indredients.filter(indredient => {
           return indredient != ing; 
          })
        
     }
  },
  created(){
    //fetch data from db
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
 
 .add-smoothie{
   margin-top: 10px;
   padding: 10px;
   max-width: 500px;
 }

 .add-smoothie h2{
   font-size: 2rem;
   margin: 5px auto;
 }
 
 .add-smoothie .field{ 
   margin: 10px auto;
   position: relative;
 }
 .add-smoothie .delete{ 
  right: 0;
  position: absolute;
  bottom: 16px;
  color: #aaa;
  font-size: 1.4rem;
  cursor: pointer;
  z-index: 9;
} 
</style>
