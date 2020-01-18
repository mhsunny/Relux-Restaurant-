<template>

  <div v-if="smoothie" class="edit-smoothie container">
       
        <h2  class="center-align indigo-text">Edit {{ smoothie.title }} </h2>

      <form  @submit.prevent="EditSmoothie">

          <div class="field title">
              <label for="title">Food Title:</label>
              <input type="text" name="title" class="input-field" v-model="smoothie.title">
          </div>

          <div class="field" v-for="(ing, index ) in smoothie.ingredients"  :key="index">               
                <i class="material-icons delete  right" @click="deleteIng(ing)">delete</i>               
                <input type="text" name="ingredient" class="input-ingredient input-field" v-model="smoothie.ingredients[index]">
          </div> 
         
          <div class="clear"></div>
          <div class="field add-ingredient">
            <label for="add-ingredient">Add an Ingredient:</label>
            <input   placeholder="Type Ingredient and press tab to add more"  type="text" name="add-ingredient  input-field" @keydown.tab.prevent="addIng" v-model="another">
            
         </div>

         <div class="field center-align">
           <p v-if="feedback" class="red-text">{{ feedback }}</p>
           <button class="btn pink">Update</button>
        </div>
 
 
      </form>
 
  </div>


</template>

<script>
import db from '@/firebase/init'
import slugify from 'slugify'
export default {
  name: 'EditSmoothie',
  data () {
    return {
      smoothie : null,  
      another: null, 
      feedback:null, 
    }
  },
    methods:{
     EditSmoothie(){
       console.log(this.smoothie.title, this.smoothie.ingredients);
       
      if(this.smoothie.title){
         
          this.feedback = null,
          this.smoothie.slug = slugify(this.smoothie.title, {
            replacement:'-',
            remove: /[$#%^&*():'";,><:@]/g,
            lower:true
          })       

         // console.log( this.smoothie.ingredients);
         
         db.collection('smoothies').doc( this.smoothie.id).update({
            title: this.smoothie.title,
            ingredients: this.smoothie.ingredients,
            slug:this.smoothie.slug
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
         this.smoothie.ingredients.push(this.another)
          this.another = null;
          this.feedback = null;
       }else{ 
         this.feedback = 'You must enter a value to add ingredient'
       }
     },
     deleteIng(ing){

       console.log(ing);
          this.smoothie.ingredients = this.smoothie.ingredients.filter(ingredient => {
           return ingredient != ing; 
          })
        
     }
  },
 created(){
    let ref = db.collection('smoothies').where('slug', '==', this.$route.params.smoothie_slug)
    ref.get().then(snapshot => {
      snapshot.forEach(doc => {
        
         this.smoothie = doc.data()
         //console.log(this.smoothie.ingredients)
         this.smoothie.id = doc.id
      })
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

 
 .edit-smoothie{
   margin-top: 10px;
   padding: 10px;
   max-width: 500px;
 }

 .edit-smoothie h2{
   font-size: 2rem;
   margin: 5px auto;
 }
 
 .edit-smoothie .field{ 
   margin: 10px auto;
   position: relative;
 }
 
 .edit-smoothie .delete{ 
  right: 0;
  position: absolute;
  bottom: 16px;
  color: #aaa;
  font-size: 1.4rem;
  cursor: pointer;
  z-index: 9;
} 
</style>
