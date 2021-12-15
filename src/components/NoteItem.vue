<template>
  <div>
    <div class="card">
      <div class="title">{{ note.name }}</div>
      <div class="card__overflow"></div>
      <div class="card__items">
        <TodoItem
            v-for="item of note.items"
            :key="item.id"
            :item="item"
            :show-button="false"
            @deleteCard="deleteCard"
        />
      </div>
      <div class="card__buttons">
        <button class="button button__accent" @click="toTodo">Изменить</button>
        <button @click="deleteNote" class="button button__delete">Удалить</button>
      </div>
    </div>
    <VDialog class="dialog"
             @deleteCard="deleteCard"
             :dialogStatus="dialogStatus"
             @closeDialog="closeDialog"
    >Хотите удалить список "{{ note.name }}" ?</VDialog>
  </div>
</template>

<script>
import TodoItem from "@/components/TodoItem";
import VDialog from "@/components/popups/v-Dialog";

export default {
  name: "Cards",
  components: {VDialog, TodoItem},
  data() {
    return {
      dialogStatus: false,
    }
  },
  props: {
    note: {
      type: Object,
      required: true,
    }
  },
  methods: {
    closeDialog() {
      this.dialogStatus = false
    },
    async deleteCard() {
      this.$emit('deleteCard', this.note.id)
    },
    deleteNote() {
      this.dialogStatus = true
    },
    toTodo() {
      this.$router.push({path: '/note', query: {id: this.note.id}});
    }
  }
}
</script>

<style scoped>
.card__items {
  left: 25px;
  top: 75px;
  display: flex;
  flex-direction: column;
  position: absolute;
  height: 280px;
  overflow: hidden;
}

.card__overflow {
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 2;
  background: rgba(229, 241, 239, 0.6);
  overflow: hidden;
}

.card {
  position: relative;
  background: rgba(255, 255, 255, 0.4);
  height: 400px;
  width: 370px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
  padding: 20px 15px;
  margin: 50px;
  border-radius: 10px;
}

.card__buttons {
  display: flex;
  justify-content: center;
}
</style>