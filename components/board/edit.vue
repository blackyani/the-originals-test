<script setup lang="ts">
import Menu from 'primevue/menu';
import TextArea from 'primevue/textarea';
import OpenInNew from "vue-material-design-icons/OpenInNew.vue";
import TrashCanOutline from "vue-material-design-icons/TrashCanOutline.vue";
import { onClickOutside } from '@vueuse/core'

const props = defineProps<{
  editItem: IEditItem | null,
}>()

const emit = defineEmits<{
  updateItem: (item: IEditItem) => void;
  deleteItem: (item: IEditItem) => void;
  detailsItem: (item: IEditItem) => void;
  close: () => void;
}>();

const handleDelete = () => {
  emit('deleteItem', props.editItem);
  emit('close');
}

const handleOpen = () => {
  emit('close');
  emit('detailsItem', props.editItem);
}

const itemName = ref(props.editItem.item.name as string);
const textAreaRef = ref<HTMLTextAreaElement | null>(null);
const menuRef = ref<HTMLTextAreaElement | null>(null);
const menuItems = ref([
  { label: 'Open Card', action: handleOpen, icon: OpenInNew },
  { label: 'Delete', action: handleDelete, icon: TrashCanOutline }
]);
onClickOutside(menuRef, () => emit('close'));

const handleUpdateItem = () => {
  const updatedItem = {
    ...props.editItem,
    item: {
      ...props.editItem.item,
      name: itemName.value
    }
  }
  emit('updateItem', updatedItem);
  emit('close');
}

onMounted(async () => {
  if (textAreaRef.value) textAreaRef.value.$el.focus();
});
</script>

<template>
    <Teleport to="body">
      <div class="modal-mask" />
    </Teleport>
    <div ref="menuRef" class="edit-container">
      <Menu :model="menuItems" class="edit-container-menu">
        <template #item="{ item }">
          <span class="edit-container-item" @click.stop="item.action">
            <component :is="item.icon" v-bind="{ size: 16 }" class="edit-container-item-icon" />
            {{ item.label }}</span>
        </template>
      </Menu>
      <div class="edit-container-text-area-wrapper">
        <TextArea
            ref="textAreaRef"
            v-model="itemName"
            fluid
            placeholder="Enter new name of the card..."
            rows="3"
            @click.stop
        />
        <Button label="Secondary" severity="info" @click.stop="handleUpdateItem">
          Save
        </Button>
      </div>
    </div>

</template>

<style lang="scss">
$menu-width: 200px;

.modal-mask {
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.edit-container {
  position: absolute;
  top: 0;
  right: -$menu-width;
  z-index: 2;
  display: flex;
  flex-direction: row-reverse;
  width: calc(100% + $menu-width);

  &-menu {
    height: fit-content;
  }

  &-text-area-wrapper {
    width: 100%;
  }

  &-item {
    height: 30px;
    display: flex;
    align-items: center;
    padding: 8px 4px;

    &-icon {
      margin-right: 8px;
      display: flex;
    }
  }
}
</style>
