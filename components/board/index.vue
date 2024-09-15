<script setup lang="ts">
  import Card from 'primevue/card';
  import { VueDraggableNext as Draggable } from "vue-draggable-next";
  import Pencil from "vue-material-design-icons/Pencil.vue";

  import { Status } from "~/types/Enums";

  // todo create proper interface
  const board = reactive({
    [Status.todo]: {
      title: 'Todo',
      items: [
        { name: 'John', id: 1, status: Status.todo },
        { name: 'Joao', id: 2, status: Status.todo },
        { name: 'Jean', id: 3, status: Status.todo },
        { name: 'Gerard', id: 4, status: Status.todo },
      ]
    },
    [Status.inProgress]: {
      title: 'In Progress',
      items: [
        { name: 'Juan', id: 5, status: Status.inProgress },
        { name: 'Edgard', id: 6, status: Status.inProgress },
        { name: 'Johnson', id: 7, status: Status.inProgress },
      ],
    },
    [Status.done]: {
      title: 'Done',
      items: [],
    }
  });
  // I made here computed property with idea that maybe if have time, add board create functionality, not just default one
  const boardItems = computed(() => Object.keys(board));
  const editItem = ref<null | EditItem>(null);
  const detailsItem = ref<null | EditItem>(null);
  const showDetails = ref(false);

  const handleUpdateStatus = (event, boardItem: Status) => {
    if (event.added) {
      board[boardItem].items[event.added.newIndex].status = boardItem
    }
  };

  const handleNewItem = (field: Status, newItemName: string) => {
    board[field].items.push({
      status: field,
      name: newItemName,
      id: Date.now() // workaround to generate unique id
    });
  }

  const handleUpdateItem = ({item, key, index}: EditItem) => {
    board[key].items[index] = item;
  }

  const handleDeleteItem = ({key, index}: EditItem) => {
    board[key].items.splice(index, 1);
  }
  const handleDetails = (item: EditItem) => {
    console.log(item);
    detailsItem.value = item;
    showDetails.value = true;
  }
  const handleCloseDetails = () => {
    detailsItem.value = null;
    showDetails.value = false;
  }
</script>

<template>
  <div class="board-container">
    <Card v-for="boardItem in boardItems" :key="boardItem" class="board-container-card">
      <template #title>{{ board[boardItem].title }}</template>
      <template #content>
<!--        todo add animations-->
        <Draggable
            group="items"
            item-key="name"
            :list="board[boardItem].items"
            class="board-container-drag-area"
            @change="(event) => handleUpdateStatus(event, boardItem)"
        >
          <div
              v-for="(element, index) in board[boardItem].items"
              :key="element.name"
              class="board-container-item"
              @click="() => handleDetails({item: element, key: boardItem, index})"
          >
            {{ element.name }}
            <Button
                    label="Secondary"
                    rounded
                    class="board-container-item-button"
                    severity="secondary"
                    @click.stop="editItem = {item: element, key: boardItem, index}"
            >
              <Pencil :size="12" />
            </Button>
            <BoardEdit
                v-if="editItem?.item.id === element.id"
                :edit-item="editItem"
                @close="editItem = null"
                @details-item="handleDetails"
                @delete-item="handleDeleteItem"
                @update-item="handleUpdateItem"
            />
          </div>
        </Draggable>
      </template>
      <template #footer>
        <BoardCreate :field-name="boardItem" @add-new-item="handleNewItem" />
      </template>
    </Card>
    <BoardDetails :show-details="showDetails" :active-item="detailsItem" @close-details="handleCloseDetails" />
  </div>
</template>

<style scoped lang="scss">
$item-height: 36px;

.h-100 {
  height: 100%;
}

.board-container {
  padding: 12px;
  display: flex;
  align-items: flex-start;
  gap: 12px;

  &-card {
    margin-bottom: 12px;
    width: 100%;
    box-sizing: border-box;
    background-color: #f1f2f4;

    :global(.p-card-body) {
      height: 100%;
    }

    :global(.p-card-footer) {
      margin-top: auto;
    }
  }

  &-drag-area {
    display: flex;
    flex-direction: column;
    row-gap: 8px;
  }

  &-item {
    position: relative;
    display: flex;
    justify-content: space-between;
    min-height: $item-height;
    border-radius: 8px;
    padding: 8px 12px 4px;
    background-color: #ffffff;
    box-shadow: var(--ds-shadow-raised, 0px 1px 1px #091e4240, 0px 0px 1px #091e424f);
    color: var(--dynamic-text);
    cursor: pointer;
    scroll-margin: 8px;

    &-button {
      display: none;
      position: absolute;
      right: 10px;
      top: 6px;
      width: 25px;
      height: 25px;
    }

    &:hover {
      border: 1px solid var(--hover-border);
      box-shadow: none;

      button {
        display: flex;
      }
    }
  }
}
</style>
