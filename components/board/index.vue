<script setup lang="ts">
  import Card from 'primevue/card';
  import { VueDraggableNext as Draggable } from "vue-draggable-next";
  import Pencil from "vue-material-design-icons/Pencil.vue";

  import type { EStatus } from "~/types/Enums";
  import {mockBoard, priorityColors} from "~/utils/variables";

  const board = reactive<IBoard>(mockBoard);
  // I made here computed property with idea that maybe if have time, add board create functionality, not just default one
  const boardItems = computed(() => Object.keys(board));
  const editItem = ref<null | IEditItem>(null);
  const detailsItem = ref<null | IEditItem>(null);
  const showDetails = ref(false);

  const handleUpdateStatus = (event, boardItem: EStatus) => {
    if (event.added) {
      board[boardItem].items[event.added.newIndex].status = boardItem
    }
  };

  const handleNewItem = (field: EStatus, newItemName: string) => {
    board[field].items.push({
      status: field,
      name: newItemName,
      description: '',
      priority: null,
      author: null,
      performers: [],
      id: Date.now() // workaround to generate unique id
    });
  }

  const handleUpdateItem = ({item, key, index}: IEditItem) => {
    board[key].items[index] = item;
  }

  const handleDeleteItem = ({key, index}: IEditItem) => {
    board[key].items.splice(index, 1);
  }
  const handleDetails = (item: IEditItem) => {
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
        <Draggable
            group="items"
            item-key="name"
            :animation="300"
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
            <div
                class="board-container-item-status"
                :style="{backgroundColor: element.priority ? priorityColors[element.priority] : 'transparent'}"
            />
            <div class="board-container-item-team">
              <Avatar v-if="element.author" v-tooltip.right="`Author: ${element.author.name}`" :label="element.author.name.charAt(0)" />

              <AvatarGroup v-if="element.performers.length">
                <Avatar
                    v-for="performer in element.performers"
                    :key="performer.id"
                    v-tooltip.right="`Performer: ${performer.name}`"
                    placeholder="Top"
                    shape="circle"
                    :label="performer.name.charAt(0)"
                />
              </AvatarGroup>
            </div>
          </div>
        </Draggable>
      </template>
      <template #footer>
        <BoardCreate :field-name="boardItem" @add-new-item="handleNewItem" />
      </template>
    </Card>
    <BoardDetails
        v-if="showDetails"
        :show-details="showDetails"
        :details-item="detailsItem"
        @close-details="handleCloseDetails"
        @update-item="handleUpdateItem"
    />
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
    flex-direction: column;
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
      right: 16px;
      top: 5px;
      width: 25px;
      height: 25px;
    }

    &-status {
      width: 10px;
      border-top-right-radius: 8px;
      border-bottom-right-radius: 8px;
      position: absolute;
      right: 0;
      top: 0;
      height: 100%;
    }

    &-team {
      margin-top: 8px;
      display: flex;
      justify-content: space-between;
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
