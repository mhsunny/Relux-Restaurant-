<template>
  <div class="navbar">  
    <nav class="nav-extended indigo darken-2">
        <div class="nav-conent">
          <router-link :to="{ name: 'Index'}">
              <span class="nav-title">Telux Restaurant</span>
          </router-link>

           <router-link :to="{ name: 'AddSmoothie'}" class="btn-floating halfway-fab pink btn-large">
              <i class="material-icons">add</i>
          </router-link> 
 
        </div>
    </nav>
  
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  data () {
    return {
     
    }
  }
}
</script>

 <style> 

 .navbar  nav{
   padding:0 20px; 
 }
 nav .nav-title{
   padding: 0 10px;
 }
.navbar 
 .btn-floating.halfway-fab { 
    top: 10%;
    bottom: unset;
}

</style>
