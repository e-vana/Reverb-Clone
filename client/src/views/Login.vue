<template>
  <div class="login-container">

      <b-form>
        <h3>Login</h3>
        <p>Sign in to see all the items and listings that you're following!</p>
        <b-form-group label="Username" description="Enter the username you signed up with.">
          <b-form-input required v-model="form.username"></b-form-input>
        </b-form-group>
        <b-form-group label="Password" description="Enter your password.">
          <b-form-input required v-model="form.password" type="password"></b-form-input>
        </b-form-group>
        <b-button @click="login" variant="primary">Login</b-button>
        <p>Haven't registered yet?</p>
      </b-form>

  </div>
</template>

<script>
export default {
  name: "Login",
  data(){ 
    return {
      form: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login: async function() {
      try{
      this.$store.dispatch("setLoading", true);
      this.$store.dispatch("setLoadingPercentage", 0);

      this.$store.dispatch("loginUser");
      this.$store.dispatch("setUser", {username: this.form.username})
      this.$store.dispatch("setLoadingPercentage", 50);

      


      this.$store.dispatch("setLoadingPercentage", 100);
      this.$store.dispatch("setLoading", false);
      this.$router.push('/');

      }catch(err) {
        console.log(err);
      }
    }
  }
}
</script>

<style>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
  max-width: 900px;
  margin: 0px auto;
}

.login-container h3 {
  font-size: 22px;
}
</style>