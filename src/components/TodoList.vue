<template>
  <div class="todoList">
    <h1>{{ todo.name }}</h1>
    <div class="todoList__buttons">
      <button class="button button__delete" @click="deleteNote" >Удалить</button>
      <button class="button button__mein button__mein--mini" @click="exitToMain" >Выйти</button>
    </div>
    <div class="todoList__add-todo">
      <form @submit.prevent="newTodoItem" action="#">
        <input class="input todoList__new-todo" v-model="newValue" type="text" >
        <button class="button button__accent" type="submit" >Добавить</button>
      </form>
    </div>
      <TodoItem
          v-for="item of this.todo.items"
          :key="item.id"
          :item="item"
          @deleteItem="deleteItem"
          @editItem="editItem"
          @completedItem="completedItem"
      />
    <VDialog class="dialog"
             @deleteCard="deleteCard"
             :dialogStatus="dialogStatus"
             @closeDialog="closeDialog">Хотите удалить список "{{todo.name}}" ?</VDialog>
  </div>
</template>

<script>
import TodoItem from "@/components/TodoItem";
import VDialog from "@/components/popups/v-Dialog";

export default {
  name: "TodoList",
  components: {VDialog, TodoItem},
  data() {
    return {
      dialogStatus: false,
      todo: {},
      id: null,
      newValue: '',
      url: ''
    }
  },
  methods: {
    completedItem(item) {
      let currentCompleted = item.completed
      this.todo.items.find(obj => obj === item).completed = !currentCompleted
      this.updateTodos()
    },
    exitToMain() {
      this.$router.push({path:"/"})
    },
   async deleteCard() {
     await fetch(this.url, {
       method: 'Delete'
     })
     await this.$router.push({path: '/'})
    },
    closeDialog() {
      this.dialogStatus = false
    },
    updateTodos() {
      fetch(this.url, {
        method: 'PUT', // *GET,'POST' POST, PUT, DELETE, PATCH etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *client
        body: JSON.stringify(this.todo) // body data type must match "Content-Type" header
      })
    },
    async editItem(str, item) {
      this.todo.items.find(obj => obj === item).value = str
     await this.updateTodos()
    },
    async deleteItem(i) {
      let item = this.todo.items.indexOf(i, 0)
      this.todo.items.splice(item, 1)
      await this.updateTodos()
    },
    async getTodo(id) {
      this.url = `http://localhost:3001/notes/${id}`
      this.todo = await fetch(this.url).then(res => res.json())

    },
    async newTodoItem() {
      if (this.newValue.trim()) {
        let item = {
          'id': Date.now(),
          'value': this.newValue,
          'completed': false
        }
        this.todo.items.push(item)
        await this.updateTodos()
      }
      this.newValue = ''
    },
    async deleteNote() {
      this.dialogStatus = true
    }
  },

  mounted() {
    this.getTodo(this.$route.query.id)
  }
}
</script>

<style scoped>
.todoList__buttons {
  margin-bottom: 50px;
}

.todoList__add-todo {
  margin-bottom: 50px;
}

.todoList__new-todo {
  background: none;
}

.todoList {
  min-height: 100vh;
  min-width: 100vw;
  background: #D3E7E4;
  font-family: "Montserrat", sans-serif;
  color: #023636;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}
</style>