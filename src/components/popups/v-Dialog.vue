<template>
<div class="v-Dialog popup" v-if="dialogStatus">
  <div class="popup__background">
  </div>
  <div class="popup__buttons">
    <div class="popup__title"><slot></slot></div>
    <div>
      <button class="button__accent" @click="deleteCard" >Да</button>
      <button class="button__delete" @click="closePopup">Нет</button>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "v-Dialog",
  props: {
    dialogStatus: {
    type: Boolean,
    required: true
    }
  },
  methods: {
    closePopup() {
      this.$emit('closeDialog')
    },
    deleteCard() {
      this.$emit('deleteCard')
    }
  }
}
</script>

<style scoped>
</style>