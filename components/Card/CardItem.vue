<template>
  <div
    :class="[
      'item-task d-flex align-items-start border-bottom pt-3 pb-4',
      isGrid ? 'col-12 col-md-6 col-lg-4' : 'col-12',
    ]"
  >
    <input
      type="checkbox"
      name="status"
      id="task"
      class="me-2 mt-2"
      @change="updateChecked"
    />
    <div
      v-if="task.isDone"
      :class="['d-flex flex-column', task.isDone ? 'done' : '']"
    >
      <div class="title-task mb-1">
        {{ task.title }}
        <span class="badge bg-danger">{{ task.category }}</span>
      </div>
      <div class="description-task small text-muted">
        {{ task.description }}
      </div>
    </div>
    <div v-else :class="['d-flex flex-column']">
      <div class="title-task mb-1">
        {{ task.title }}
        <span class="badge bg-success">{{ task.category }}</span>
      </div>
      <div class="description-task small text-muted">
        {{ task.description }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    task: {
      type: Object,
      default: "Untitled",
    },
    isGrid: {
      type: Boolean,
      required: true,
      default: false,
    },
  },

  methods: {
    updateChecked() {
      console.log(this.task);
      if (!this.task.isDone) {
        this.$store.dispatch("tasks/updateChecked", this.task);
        this.task = {
          title: this.task.title,
          description: this.task.description,
          category: this.task.category,
          isDone: true,
        };
      } else {
        this.$store.dispatch("tasks/updateChecked", this.task);
        this.task = {
          title: this.task.title,
          description: this.task.description,
          category: this.task.category,
          isDone: false,
        };
        console.log(this.$store.state.tasks.tasks);
        return this.$store.state.tasks.tasks;
      }
    },
  },
};
</script>
<style>
.done {
  text-decoration: line-through;
  font-style: italic;
}
</style>
