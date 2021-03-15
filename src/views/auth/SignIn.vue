<template>
  <v-container>
    <div class="header">
      <p class="signin-header">Eatos Sign In</p>
    </div>
    <v-card width="400" class="mx-auto">
      <div class="card">
        <p class="card-title-1">Let's Manage</p>
        <p class="card-title-2">Food</p>
        <v-form>
          <v-text-field
            class="ml-10 mr-10 rounded-lg"
            v-model="email"
            placeholder="Email"
            :error-messages="emailErrors"
            @input="$v.email.$touch()"
            @blur="$v.email.$touch()"
            outlined
            dense
          ></v-text-field>
          <v-text-field
            class="ml-10 mr-10 rounded-lg"
            v-model="password"
            placeholder="Password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :error-messages="passwordErrors"
            @input="$v.password.$touch()"
            @blur="$v.password.$touch()"
            :type="show1 ? 'text' : 'password'"
            @click:append="show1 = !show1"
            outlined
            dense
            @keyup.enter="signin"
          ></v-text-field>
        </v-form>
      </div>
      <v-card-text v-if="errors" class="ml-6 red--text">{{
        errors
      }}</v-card-text>
      <div class="link">
        <a @click="$router.push('/signup').catch(err => {})"
          >Don't have an account</a
        >
      </div>
      <div>
        <v-btn
          @click="signin"
          class="btn text-capitalize"
          color="primary"
          :disabled="$v.$invalid"
        >
          Sign In
        </v-btn>
      </div>
    </v-card>
  </v-container>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required, email } from 'vuelidate/lib/validators';
import config from '../../config';

export default {
  name: 'SignIn',
  mixins: [validationMixin],
  created() {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = JSON.parse(localStorage.getItem('token'));
    const expiresAt = JSON.parse(localStorage.getItem('expiresAt'));
    if (user && token && expiresAt && expiresAt > new Date().getTime()) {
      this.$router.push('/dashboard');
    }
  },
  computed: {
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push('E-mail must be valid');
      !this.$v.email.required && errors.push('E-mail is required');
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required && errors.push('Password is required');
      return errors;
    },
  },
  validations: {
    email: { required, email },
    password: {
      required,
    },
  },
  data() {
    return {
      show1: false,
      email: '',
      password: '',
      errors: '',
    };
  },
  methods: {
    async signin() {
      if (this.$v.$invalid) return;
      const user = {
        email: this.email,
        password: this.password,
      };
      const res = await this.$store.dispatch('signin', user);
      if (res.data.error) {
        this.errors = res.data.error;
      } else {
        if (config.env === 'production') {
          window.location.href = 'https://eatos.herokuapp.com/dashboard';
        } else {
          window.location.href = 'http://localhost:8080/dashboard';
        }
      }
    },
  },
};
</script>

<style scoped>
.header {
  position: relative;
  justify-items: center;
}
.signin-header {
  margin-top: 5%;
  color: #616161;
  text-align: center;
  font-size: 40px;
}
.card {
  position: relative;
  justify-items: center;
}
.card-title-1 {
  margin-bottom: 0px;
  padding-top: 10%;
  text-align: center;
  font-size: 20px;
}
.card-title-2 {
  text-align: center;
  font-size: 20px;
}
.link {
  text-align: center;
}
.btn {
  margin-top: 10px;
  margin-left: 25%;
  margin-right: 25%;
  margin-bottom: 30px;
  width: 50%;
}
</style>
