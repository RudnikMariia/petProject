<template>
  <div class="todoItem">
    <div class="item">
      <input class="item__check" :checked="item.completed" @change="completedItem" type="checkbox" id="check1" >
      <label class="item__text" :class="{'item__completed':this.item.completed}" for="check1" >{{ item.value }}</label>
    </div>
    <div v-if="showButton">
      <button class="button button__accent" @click="openPopup">Изменить</button>
      <button class="button button__delete" @click="openDialog" >Х</button>
    </div>
    <VDialog class="dialog"
             :dialogStatus="dialogStatus"
             @deleteCard="deleteItem"
             @closeDialog="closeDialog"
    > Хотите удалить задание "{{item.value}}" ?
    </VDialog>
    <PopUp class="dialog"
           :valueInput="item.value"
           :popupStatus="popupStatus"
           :trueValue="item.value"
           @closePopup="closePopup"
           @submitPopup="submitPopup"
    >Изменить заметку
    </PopUp>
  </div>
</template>

<script>
import VDialog from "@/components/popups/v-Dialog";
import PopUp from "@/components/popups/v-PopUp";

export default {
  name: "TodoItem",
  components: {PopUp, VDialog},
  data() {
    return {
      popupStatus: false,
      dialogStatus: false
    }
  },
  props: {
    item: {
      type: Object,
      required: true
    },
    showButton: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    completedItem() {
       this.$emit('completedItem', this.item)
    },
    submitPopup(str) {
      this.$emit("editItem", str, this.item)
      this.popupStatus = false
    },
    closePopup() {
      this.popupStatus = false
    },
    openPopup() {
      this.popupStatus = true
    },
    closeDialog() {
      this.dialogStatus = false
    },
    openDialog() {
      this.dialogStatus = true
    },
    async deleteItem() {
      this.$emit('deleteItem', this.item)
    }
  }
}
</script>

<style scoped>
.item__check {
  margin-right: 10px;
}

.todoItem {
  display: flex;
  width: fit-content;
  justify-content: space-between;
}

.item {
  border-radius: 10px;
  border: 2px solid #FBAF01;
  padding: 12px 20px;
  width: 310px;
  background: rgba(255, 255, 255, 0.4);
  margin-bottom: 30px;
}

.item__text {
  padding: 1px 0;
  font-size: 20px;
  font-weight: 500;
}

.item__completed {
  text-decoration: line-through;
}

</style>