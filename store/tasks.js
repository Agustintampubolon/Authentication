export const state = () => ({
  tasks: [
    {
      id: 1,
      title: "Lemper",
      description: "Lemper Enak",
      isDone: false,
      category: "Makanan",
      selected: "",
    },
    {
      id: 2,
      title: "Teh Bohai",
      description: "Teh Bohai Seger",
      isDone: false,
      category: "Minuman",
      selected: "",
    },
    {
      id: 3,
      title: "Mintz",
      description: "Mintz Seger",
      isDone: false,
      category: "Permen",
      selected: "",
    },
    {
      id: 4,
      title: "Jagung",
      description: "Jagung Di Bakar",
      isDone: false,
      category: "Makanan",
    },
    {
      id: 5,
      title: "Cincau",
      description: "Cincau Bikin Lengket",
      isDone: false,
      category: "Minuman",
    },
    {
      id: 6,
      title: "Kopiko",
      description: "Kopiko Adem",
      isDone: false,
      category: "Permen",
    },
  ],
});

export const mutations = {
  ADD_TASK(state, task) {
    state.tasks.push(task);
  },

  addCheckedTask(state, task) {
    state.tasks.id = !task.isDone;
  },
};

export const actions = {
  addTask(context, task) {
    context.commit("ADD_TASK", task);
  },

  updateChecked(context, task) {
    context.commit("addCheckedTask", { id: task.id });
  },
};
