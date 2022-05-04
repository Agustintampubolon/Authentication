<template>
  <div class="py-4">
    <div class="container">
      <div
        class="title border-bottom d-flex align-items-center justify-content-between py-2"
      >
        <h5>Task</h5>

        <div class="d-flex align-items-center ms-auto">
          <input
            type="text"
            class="form-control"
            placeholder="Search"
            v-model="searchQuery"
          />

          <div class="d-flex align-items-center">
            <button
              class="btn btn-outline-secondary py-1 px-3"
              @click="isGrid = !isGrid"
            >
              {{ isGrid ? "Grid" : "List" }}
            </button>
          </div>
        </div>
      </div>

      <div class="list-task row">
        <CardItem
          v-for="(task, i) in resultQuery"
          :key="i"
          :task="task"
          :isGrid="isGrid"
        />
      </div>
      <div class="action py-2">
        <a
          href="#"
          class="add-button"
          v-if="!isCreating"
          @click="isCreating = !isCreating"
          >Tambah Task</a
        >
        <div class="add-card" v-else>
          <h5>Form</h5>
          <div class="form">
            <form v-on:submit.prevent="submitForm">
              <div class="field-control">
                <label class="label">Judul :</label>
                <div class="control">
                  <input
                    name="title"
                    type="text"
                    class="input"
                    placeholder="Masukkan Judul"
                    v-model="tambah.title"
                  />
                </div>
              </div>
              <div class="field-control">
                <label class="label">Deskripsi :</label>
                <div class="control">
                  <textarea
                    name="desctiption"
                    cols="25"
                    rows="3"
                    class="textarea"
                    placeholder="Masukkan Deskripsi"
                    v-model="tambah.description"
                  ></textarea>
                </div>
              </div>
              <div class="field-control">
                <label class="label">Kategori :</label>
                <div class="control">
                  <select
                    name="category"
                    class="input"
                    v-model="tambah.category"
                  >
                    <option disabled value="null">Pilih Kategori</option>
                    <option
                      v-for="(option, i) in categoryOptions"
                      :key="i"
                      v-bind:value="option.option"
                    >
                      {{ option.option }}
                    </option>
                  </select>
                </div>
              </div>
              <br />
              <div class="field-control">
                <div class="control">
                  <button class="btn btn-success" type="submit">Simpan</button>
                  <button
                    class="btn btn-danger"
                    @click="isCreating = !isCreating"
                  >
                    Kembali
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CardItem from "@/components/Card/CardItem.vue";
import { mapGetters } from "vuex";

export default {
  middleware: "auth",
  components: {
    CardItem,
  },
  data() {
    return {
      tambah: {
        title: null,
        description: null,
        category: null,
      },

      searchQuery: "",

      isCreating: false,

      isGrid: false,

      arrayOfObjects: [],

      tasks: [],
      categoryOptions: [
        { option: "Makanan", value: "makanan" },
        { option: "Minuman", value: "minuman" },
        { option: "Permen", value: "permen" },
      ],
    };
  },

  mounted() {
    if (localStorage.title) {
      this.tambah.title = localStorage.title;
    }
    if (localStorage.description) {
      this.tambah.description = localStorage.description;
    }
    if (localStorage.category) {
      this.tambah.category = localStorage.category;
    }
  },

  // mounted() {
  //   if (localStorage.getItem("tasks")) {
  //     try {
  //       this.tasks = JSON.parse(localStorage.getItem("tasks"));
  //     } catch (e) {
  //       localStorage.removeItem("tasks");
  //     }
  //   }
  // },

  methods: {
    submitForm() {
      if (!this.tambah) {
        return;
      }

      this.$store.dispatch("tasks/addTask", this.tambah);

      localStorage.title = this.tambah.title;
      localStorage.description = this.tambah.description;
      localStorage.category = this.tambah.category;

      this.tambah = {
        title: "",
        description: "",
        category: "",
      };

      this.saveTasks();
    },

    saveTasks() {
      const parsed = JSON.stringify(this.$store.state.tasks.tasks);
      localStorage.setItem("tasks", parsed);
    },
  },

  computed: {
    ...mapGetters(["loggedInUser"]),
    resultQuery() {
      if (this.searchQuery) {
        return this.$store.state.tasks.tasks.filter((item) => {
          return this.searchQuery
            .toLowerCase()
            .split(" ")
            .every((v) => item.title.toLowerCase().includes(v));
        });
      } else {
        console.log(this.$store.state.tasks.tasks);
        return this.$store.state.tasks.tasks;
      }
    },
  },
};
</script>

<style>
.my-dropdown-toggle {
  border-radius: 5px;
}
#results {
  position: fixed;
  right: 60%;
  top: 60%;
}
</style>
