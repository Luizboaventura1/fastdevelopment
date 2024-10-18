## Dashboard 🚀

Summary
 - [workspace.vue](#workspacevue)

## workspace.vue

The workspace carries several important data so that the application works correctly, it will show important parts of the code that make our system flow perfectly.

Piece of code where firebase data is loaded that will be used throughout the project, without it nothing works:
```js
onMounted(async () => {
  await useWorkspace()
    .workspace()
    .then((data) => {
      workspace.value = data;
      userEmail.value = data.email;
      userId.value = data.id;

      if (frames.value.length === 0) {
        frames.value.push(...data.frames);
        addModalStateToCards();
      }
    });
});
```

Assigns modal status to lists and cards:
```js
const addModalStateToCards = () => {
  frames.value.forEach((frame) => {
    frame.lists.forEach((list) => {
      list.stateModal = false; // add status to list
      list.cards.forEach((card) => {
        card.stateModal = false; // add status to card
      });
    });
  });
};
```