<template>
  <div class="noteList">
    <h1>Мои Заметки</h1>
    <button @click="openPopup">Создать заметку</button>
    <div class="cards">
      <NoteItem
          v-for="note of todos"
          :key="note.id"
          :note="note"
          @deleteCard="deleteCard"
      />
    </div>
    <PopUp
        :popupStatus="popupStatus"
        @closePopup="closePopup"
        @submitPopup="submitPopup"
    >Назови Заметку</PopUp>
  </div>
</template>

<script>
import NoteItem from "@/components/NoteItem";
import PopUp from "@/components/popups/v-PopUp";

export default {
  name: "NoteList",
  data() {
    return {
      popupStatus: false,
      url: 'http://localhost:3001/notes',
      todos: []
    }
  },
  components: {
    PopUp,
    NoteItem
  },
  methods: {
    closePopup() {
      this.popupStatus = false
    },
    openPopup() {
      this.popupStatus = true
    },
    async deleteCard(id) {
      await fetch(this.url + "/" + id, {
        method: 'Delete'
      })
      await this.getTodo()
    },
    async submitPopup(value) {
      if (value.trim()) {
        await fetch(this.url, {
          method: 'POST', // *GET,'POST' POST, PUT, DELETE, PATCH etc.
          mode: 'cors', // no-cors, *cors, same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin', // include, *same-origin, omit
          headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          redirect: 'follow', // manual, *follow, error
          referrerPolicy: 'no-referrer', // no-referrer, *client
          body: JSON.stringify({
            "id": Date.now(),
            "name": value,
            "items": []
          }) // body data type must match "Content-Type" header
        })
      }
      this.closePopup()
      await this.getTodo()
    },
    async getTodo() {
      this.todos = await fetch(this.url).then(res => res.json())
    },
  },
  async mounted() {
    await this.getTodo()
  }
}
</script>

<style scoped>
.noteList {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.cards {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
</style>