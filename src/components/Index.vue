<template>
  <div class="container index">
    <div class="card" v-for="smoothie in smoothies" :key="smoothie.id">
      <div class="card-content">
        <i class="material-icons delete" @click="smoothieDelete(smoothie.id)">delete</i>
        <h2 class="indigo-text">{{ smoothie.title}}</h2>
        <ul class="ingredents">
          <li v-for="(ing, index) in smoothie.ingredients" :key="index">
            <span classs="chip"> {{ ing }} </span>
          </li>
        </ul>
         <div class="field btn-area">
       <span class="btn-floating  btn-small halfway-fab pink">
        <router-link :to="{ name: 'EditSmoothie', params:{smoothie_slug:smoothie.slug}}">
          <i class="material-icons edit">edit</i>
        </router-link>
      </span>
       </div> 
      </div>
    
   </div>
  </div>
</template>
<script>
import db from '@/firebase/init'
export default {
  name: 'Index',
  data () {
    return {
      smoothies:[]
      // smoothies:[
      //   {title: 'Customer Favorite' , slug: 'customer-favorite', ingredients: ['juice', 'sushi', 'burger', 'pasta','drinks'], id: '1'},
      //   {title: 'Normal Breakfast' , slug: 'normal-breakfast', ingredients: ['burger', 'sandwich', 'coffee', 'tea','drinks'], id: '2'},
      //   {title: 'Morning Mood' , slug: 'morning-mood', ingredients: ['mango', 'lime', 'juice', 'tea','drinks'], id: '3'},
      //   {title: 'Lunch' , slug: 'lunch', ingredients: ['rice', 'pasta', 'pizza', 'sushi','drinks'], id: '4'},
      //   {title: 'Dinner' , slug: 'dinner', ingredients: ['bread', 'eggs', 'burger', 'sushi', 'sandwich', 'drinks'], id: '5'}
      // ]
    }
  },
  methods:{
    smoothieDelete(id){
      db.collection('smoothies').doc(id).delete()
      .then(() => {
          this.smoothies = this.smoothies.filter(smoothie => {
           return smoothie.id != id; 
        }) 
      })
    }
  },
  created(){
    //fetch data from db
    db.collection('smoothies').get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        //console.log(doc.data(), doc.id);
        let smoothie = doc.data()
        smoothie.id = doc.id
        this.smoothies.push(smoothie)
      });
    })
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.index{
  display:grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap:1rem;
  margin-top: 1rem;
}
h2{
  font-size: 1.5rem;
  padding: 0;
  margin: 0;
}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.ingredents li{
  text-transform: capitalize; 
  text-align: center;
}
.index  .delete{
  position: absolute;
  right: 10px;
  right: 10px;
  color: #444;
  font-size: 1.4rem;
  cursor: pointer;
}
.index .btn-area{
  position: absolute;
  right: 0;
}
 
</style>
