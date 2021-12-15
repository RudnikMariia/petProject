<template>
  <div class="popup v-Popup" v-if="popupStatus">
    <div class="popup__background">
    </div>
    <form class="popup__buttons" @submit.prevent="submitPopup" action="#" >
      <div class="popup__title"><slot></slot></div>
      <div>
        <input v-model="value" type="text" autofocus>
        <button class="button__accent" type="submit" >OK</button>
        <button class="button__delete" @click="closePopup">X</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "PopUp",
  data() {
    return {
      value: ''
    }
  },
  props: {
    valueInput: {
      type: String,
      default: ''
    },
    popupStatus: {
      type: Boolean,
      required: true
    },
    trueValue: {
      type: String,
      default: ''
    }
  },
  methods: {
    closePopup() {
      this.$emit('closePopup')
      this.value = this.trueValue
    },
    submitPopup() {
      this.$emit('submitPopup', this.value)
      this.value = ''
    }
  },
  watch: {
    valueInput() {
      this.value = this.valueInput
    }
  },
  mounted() {
    if(this.valueInput){
      this.value = this.valueInput
    }
  }
}
</script>

<style scoped>
</style>