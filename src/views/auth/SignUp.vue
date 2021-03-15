<template>
  <v-container>
    <div class="header">
      <p class="signup-header">Eatos Sign Up</p>
    </div>
    <v-card width="400" class="mx-auto">
      <div class="card">
        <p class="card-title-1">Let's Manage</p>
        <p class="card-title-2">Food</p>
        <v-form>
          <v-text-field
            class="ml-10 mr-10 rounded-lg"
            v-model="name"
            placeholder="Name"
            :error-messages="nameErrors"
            @input="$v.name.$touch()"
            @blur="$v.name.$touch()"
            outlined
            dense
          ></v-text-field>
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
          <v-select
            class="ml-10 mr-10 rounded-lg"
            v-model="gender"
            placeholder="Gender"
            :items="genderList"
            :error-messages="genderErrors"
            @change="$v.gender.$touch()"
            @blur="$v.gender.$touch()"
            outlined
            dense
          ></v-select>
          <v-text-field
            class="ml-10 mr-10 rounded-lg"
            v-model="phone"
            placeholder="Phone Number e.g; 3123456789"
            :error-messages="phoneErrors"
            @input="$v.phone.$touch()"
            @blur="$v.phone.$touch()"
            outlined
            dense
          ></v-text-field>
          <v-text-field
            class="ml-10 mr-10 rounded-lg"
            placeholder="Password"
            :error-messages="passwordErrors"
            @input="$v.password.$touch()"
            @blur="$v.password.$touch()"
            v-model="password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show1 ? 'text' : 'password'"
            @click:append="show1 = !show1"
            outlined
            dense
          ></v-text-field>
          <v-text-field
            class="ml-10 mr-10 rounded-lg"
            placeholder="Confirm Password"
            :error-messages="confirmPassErrors"
            @input="$v.confirmPassword.$touch()"
            @blur="$v.confirmPassword.$touch()"
            v-model="confirmPassword"
            :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show2 ? 'text' : 'password'"
            @click:append="show2 = !show2"
            outlined
            dense
            @keyup.enter="signup"
          ></v-text-field>
        </v-form>
      </div>
      <v-card-text v-if="errors" class="ml-6 red--text">{{
        errors
      }}</v-card-text>
      <div class="link">
        <a @click="$router.push('/signin').catch(err => {})"
          >Already have an account</a
        >
      </div>
      <div>
        <v-btn
          @click="signup"
          class="btn text-capitalize"
          color="primary"
          :disabled="$v.$invalid"
        >
          Sign Up
        </v-btn>
      </div>
    </v-card>
  </v-container>
</template>

<script>
import { validationMixin } from 'vuelidate';
import {
  required,
  email,
  minLength,
  numeric,
  maxLength,
  sameAs,
} from 'vuelidate/lib/validators';

export default {
  name: 'SignUp',
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
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.minLength &&
        errors.push('Name must be at least 10 characters long');
      !this.$v.name.required && errors.push('Name is required');
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push('E-mail must be valid');
      !this.$v.email.required && errors.push('E-mail is required');
      return errors;
    },
    genderErrors() {
      const errors = [];
      if (!this.$v.gender.$dirty) return errors;
      !this.$v.gender.required && errors.push('Gender is required');
      return errors;
    },
    phoneErrors() {
      const errors = [];
      if (!this.$v.phone.$dirty) return errors;
      !this.$v.phone.required && errors.push('Phone number is required');
      !this.$v.phone.numeric &&
        errors.push('Phone number must be valid e.g; 3123456789');
      !this.$v.phone.minLength &&
        errors.push('Phone number must be valid e.g; 3123456789');
      !this.$v.phone.maxLength &&
        errors.push('Phone number must be valid e.g; 3123456789');
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required && errors.push('Password is required');
      !this.$v.password.minLength &&
        errors.push('Password must be at least 8 characters long');
      return errors;
    },
    confirmPassErrors() {
      const errors = [];
      if (!this.$v.confirmPassword.$dirty) return errors;
      !this.$v.confirmPassword.required &&
        errors.push('Please confirm password');
      !this.$v.confirmPassword.sameAsPassword &&
        errors.push('Passwords do not match');
      return errors;
    },
  },
  validations: {
    name: { required, minLength: minLength(10) },
    email: { required, email },
    gender: { required },
    phone: {
      required,
      numeric,
      minLength: minLength(10),
      maxLength: maxLength(10),
    },
    password: {
      required,
      minLength: minLength(8),
    },
    confirmPassword: {
      required,
      sameAsPassword: sameAs('password'),
    },
  },
  data() {
    return {
      show1: false,
      show2: false,
      genderList: ['Male', 'Female'],
      name: '',
      email: '',
      gender: '',
      phone: '',
      password: '',
      confirmPassword: '',
      errors: '',
    };
  },
  methods: {
    async signup() {
      if (this.$v.$invalid) return;
      const user = {
        name: this.name,
        email: this.email,
        gender: this.gender,
        phone: `+92${this.phone}`,
        password: this.password,
      };
      const res = await this.$store.dispatch('signup', user);
      if (
        res.data.error &&
        res.data.error.keyPattern &&
        res.data.error.keyPattern.email === 1
      ) {
        this.errors = 'E-mail is already registered';
      } else if (res.data.error) {
        this.errors = 'Something went wrong';
      } else {
        this.$router.push('/edit-profile');
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
.signup-header {
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
