<script setup lang="ts">
import Plus from "vue-material-design-icons/Plus.vue";
import Close from "vue-material-design-icons/Close.vue";
import TextArea from 'primevue/textarea';

const props = defineProps<{
  fieldName: string;
}>();

const emit = defineEmits<{
  addNewItem: (field: string, newItemName: string) => void;
}>();

const isCreateMode = ref(false);
const itemName = ref('');

const handleAddItem = () => {
  if (itemName.value) {
    emit('addNewItem', props.fieldName, itemName.value);
  }
  isCreateMode.value = false;
  itemName.value = '';
}
</script>

<template>
  <div class="create-container">
    <template v-if="isCreateMode">
      <TextArea v-model="itemName" class="create-container-text-area" fluid placeholder="Enter name of the card..." rows="3" />
      <div class="create-container-controls">
        <Button label="Add card" severity="info" @click="handleAddItem" />
        <Button severity="secondary" class="create-container-close">
          <Close   @click="isCreateMode = false" />
        </Button>
      </div>
    </template>
    <div v-else class="create-container-actions">
      <Button label="Secondary" severity="secondary" class="create-container-button__add-action" @click="isCreateMode = true">
        <Plus />
        Add Card
      </Button>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .create-container {
    &-controls {
      display: flex;
      align-items: center;
      margin-top: 12px;
    }

    &-actions {
      display: flex;
      justify-content: space-between;
      height: 35px;
    }

    &-text-area {
      resize: none;
    }

    &-close {
      cursor: pointer;
      max-height: 35px;
      max-width: 35px;
      margin-left: 12px;

      span {
        width: 24px;
        height: 24px;
      }
    }

    &-button {
      padding: 6px 12px 6px 8px;

      &__add-action {
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: flex-start;
      }
    }
  }
</style>
