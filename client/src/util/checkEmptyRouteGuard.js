import {http} from '../util/axiosHttp.js';

function noListingsCheck() {
  beforeRouteEnter((to, from, next) => {
    try {
      var listings = await http().get(`${process.env.VUE_APP_API_URL}/api/listings/c/${this.$route.params.category}`);
      if(!listings){
        next('/');
      } else{
        next();
      }
    }catch(err){
      console.log(err)
    }
  })
}
