<template>
  <v-container>
    <div class="header">
      <p class="edit-header">Account Set Up</p>
    </div>
    <v-card width="400" class="mx-auto">
      <div class="card">
        <p class="card-title-1">Let's Manage</p>
        <p class="card-title-2">Food</p>
        <v-form v-model="isValid">
          <image-input class="image-picker" v-model="avatar">
            <div slot="activator">
              <v-avatar size="150" v-ripple v-if="!avatar" class="avatar">
                <span><v-icon x-large>mdi-camera</v-icon></span>
              </v-avatar>
              <v-avatar size="150px" v-ripple v-else class="avatar">
                <img :src="avatar.imageURL" alt="avatar" />
              </v-avatar>
            </div>
          </image-input>
          <v-text-field
            class="ml-10 mr-10 rounded-lg"
            placeholder="Full Name"
            v-model="name"
            outlined
            dense
          ></v-text-field>
          <v-select
            class="ml-10 mr-10 rounded-lg"
            v-model="gender"
            :items="genders"
            small-chips
            placeholder="Gender"
            outlined
            dense
          ></v-select>
          <v-text-field
            class="ml-10 mr-10 rounded-lg"
            v-model="mobile"
            placeholder="Phone Number"
            required
            outlined
            dense
          ></v-text-field>
          <div class="d-flex justify-end number-example ml-10 mr-10">
            <p>e.g; 923XXXXXXXXX</p>
          </div>
        </v-form>
      </div>
      <v-card-text v-if="errors" class="ml-6 red--text">{{
        errors
      }}</v-card-text>
      <div>
        <v-btn
          @click="updateUser"
          class="btn text-capitalize"
          color="primary"
          :disabled="!isValid"
        >
          Save
        </v-btn>
      </div>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
import ImageInput from '../../components/ImageInput';

export default {
  name: 'SignUp',
  components: {
    ImageInput,
  },
  computed: {
    ...mapGetters(['user']),
  },
  created() {
    if (this.user.name) {
      this.$router.push('/dashboard').catch(() => {});
    }
  },
  data() {
    return {
      isValid: true,
      hasImage: false,
      image: null,
      name: '',
      gender: '',
      mobile: '',
      genders: ['Male', 'Female', 'Prefer not to say'],
      errors: '',
      avatar: null,
      saving: false,
      saved: false,
    };
  },
  methods: {
    uploadImage() {
      this.saving = true;
      setTimeout(() => this.savedAvatar(), 1000);
    },
    savedAvatar() {
      this.saving = false;
      this.saved = true;
    },
    checkValidName(name) {
      if (!/^[a-zA-Z)]*$/.test(name)) return 'Name must be valid';
      if (name.length < 4) return 'Name must be valid';
      return true;
    },
    checkValidNumber(number) {
      if (!/^[0-9)]*$/.test(number)) return 'Phone number must be valid';
      if (number.length !== 12) return 'Phone number must be valid';
      if (number[0] !== '9' || number[1] !== '2' || number[2] !== '3') {
        return 'Phone number must be valid';
      }
      return true;
    },
    async updateUser() {
      console.log(this.avatar.formData.image);
      if (!this.isValid) return;
      var gender = 0;
      if (this.gender === 'Male') gender = 0;
      else if (this.gender === 'Female') gender = 1;
      else if (this.gender === 'Prefer not to say') gender = 2;
      const user = {
        name: this.name,
        gender,
        mobile: this.mobile,
        image: this.avatar,
      };
      const res = await this.$store.dispatch('updateUser', user);
      if (res.data.error) {
        this.errors = res.data.error;
      } else {
        this.$router.push('/dashboard');
      }
    },
  },
  watch: {
    avatar: {
      handler: function() {
        this.saved = false;
      },
      deep: true,
    },
  },
};
</script>

<style scoped>
.header {
  position: relative;
  justify-items: center;
}
.edit-header {
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
.btn {
  margin-top: 10px;
  margin-left: 25%;
  margin-right: 25%;
  margin-bottom: 30px;
  width: 50%;
}
.number-example {
  margin-top: 0;
  margin-bottom: 0;
  padding-top: 0;
  padding-bottom: 0;
  line-height: 0;
  font-size: 12px;
  color: grey;
}
.image-picker {
  margin-left: 125px;
  cursor: pointer;
  margin-bottom: 20px;
}
.avatar {
  border-width: 3px;
  border-style: solid;
  border-radius: 50%;
  border-color: #f5f5f5;
}
</style>
