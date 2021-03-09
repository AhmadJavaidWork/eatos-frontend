<template>
  <div>
    <div @click="launchFilePicker()">
      <slot name="activator"></slot>
    </div>
    <input
      type="file"
      ref="file"
      :name="uploadFieldName"
      @change="onFileChange($event.target.name, $event.target.files)"
      style="display:none"
    />
    <v-dialog v-model="errorDialog" max-width="300">
      <v-card>
        <p class="errors">{{ errorText }}</p>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="errorDialog = false" depressed color="primary"
            >Got it!</v-btn
          >
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'image-input',
  data() {
    return {
      errorDialog: null,
      errorText: '',
      uploadFieldName: 'file',
      maxSize: 1024,
    };
  },
  props: ['value'],
  methods: {
    launchFilePicker() {
      this.$refs.file.click();
    },
    onFileChange(fieldName, file) {
      const { maxSize } = this;
      let imageFile = file[0];
      if (file.length > 0) {
        let size = imageFile.size / maxSize / maxSize;
        if (!imageFile.type.match('image.*')) {
          this.errorDialog = true;
          this.errorText = 'Please choose an image file';
        } else if (size > 1) {
          this.errorDialog = true;
          this.errorText =
            'Your file is too big! Please select an image under 1MB';
        } else {
          let formData = new FormData();
          let imageURL = URL.createObjectURL(imageFile);
          formData.append('image', imageFile);
          this.$emit('input', { formData, imageURL });
        }
      }
    },
  },
};
</script>

<style scoped>
.errors {
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 20px;
  text-align: center;
  background-color: white;
}
</style>
