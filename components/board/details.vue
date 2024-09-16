<script setup lang="ts">
import TextArea from "primevue/textarea";
import TextLong from "vue-material-design-icons/TextLong.vue";
import PriorityHigh from "vue-material-design-icons/PriorityHigh.vue";
import Close from "vue-material-design-icons/Close.vue";
import AccountMultipleCheck from "vue-material-design-icons/AccountMultipleCheck.vue";
import Account from "vue-material-design-icons/Account.vue";

import {EPriority} from "~/types/Enums";
import {priorityColors, mockUsers} from "~/utils/variables";

interface IPriorityItem {
  label: string;
  value: EPriority;
  color: string;
}

const props = defineProps<{
  showDetails: boolean,
  detailsItem: IEditItem | null,
}>()

const emit = defineEmits<{
  closeDetails: () => void;
  updateItem: (item: IEditItem) => void;
}>();

const isTextAreaFocused = ref(false);
const description = ref(props?.detailsItem?.item.description || '');
const selectedPriority = ref<IPriorityItem | null>(null);
const selectedAuthor = ref<IUser | null>(props.detailsItem.item?.author || null);
const selectedPerformers = ref<IUser[] | null>(props.detailsItem.item?.performers || []);
const priorities = ref<IPriorityItem[]>([
  { label: 'Low', value: EPriority.low, color: priorityColors[EPriority.low] },
  { label: 'Middle', value: EPriority.middle, color: priorityColors[EPriority.middle] },
  { label: 'High', value: EPriority.high, color: priorityColors[EPriority.high] },
]);

const updateItemField = (field: keyof IEditItem['item'], value: never) => {
  const updatedItem = {
    ...props.detailsItem,
  };
  updatedItem.item[field] = value;
  emit('updateItem', updatedItem);
};

const cancelUpdateDescription = () => {
  description.value = props.detailsItem?.item?.description;
}

const handleClose = () => {
  description.value = '';
  selectedPriority.value = null;
  selectedAuthor.value = null;
  selectedPerformers.value = null;
  emit('closeDetails')
}

const handleShowControls = (status: boolean) => {
  setTimeout(() => {
    isTextAreaFocused.value = status;
  }, 300)
}

onMounted(() => {
  if (props.detailsItem?.item.priority) {
    const value = priorities.value.find(item => item.value === props.detailsItem?.item.priority);

    if(value) selectedPriority.value = value;
  }
})
</script>

<template>
  <Dialog
      visible
      close-on-escape
      :closable="false"
      :draggable="false"
      modal
      header="Edit Profile"
      @hide="handleClose"
  >
    <template #header>
      <div class="details-dialog-header-wrapper">
        <h2>{{detailsItem.item.name}}</h2>
        <Close @click.stop="handleClose" />
      </div>
    </template>
    <div class="details-dialog">
      <div class="details-dialog-section-wrapper">
        <Account :size="16" />
        <h3>Author</h3>
      </div>
      <Select
          v-model="selectedAuthor"
          class="details-dialog-form"
          :options="mockUsers"
          option-label="name"
          placeholder="Select an Author"
          @change="() => updateItemField('author', selectedAuthor)"
      />
      <div class="details-dialog-section-wrapper">
        <AccountMultipleCheck :size="16" />
        <h3>Performers</h3>
      </div>
      <MultiSelect
          v-model="selectedPerformers"
          class="details-dialog-form"
          :options="mockUsers"
          option-label="name"
          display="chip"
          fluid
          filter
          placeholder="Select performers"
          @change="updateItemField('performers', selectedPerformers)"
      />
      <div class="details-dialog-section-wrapper">
        <PriorityHigh :size="16" />
        <h3>Priority</h3>
      </div>
      <Select
        v-model="selectedPriority"
        :options="priorities"
        option-label="label"
        placeholder="Priority"
        class="details-dialog-form"
        @change="() => updateItemField('priority', selectedPriority.value)"
      >
        <template #option="slotProps">
          <div class="details-dialog-form-priority-item">
            <div>{{ slotProps.option.label }}</div>
            <div class="details-dialog-form-priority-item-color" :style="{ backgroundColor: slotProps.option.color }"/>
          </div>
        </template>
      </Select>
      <div class="details-dialog-section-wrapper">
        <TextLong :size="16" />
        <h3>Description</h3>
      </div>
      <TextArea
        ref="textAreaRef"
        v-model="description"
        fluid
        placeholder="Enter new name of the card..."
        rows="3"
        @focus="() => handleShowControls(true)"
        @blur="() => handleShowControls(false)"
      />
      <Transition name="fade-in-up">
        <div v-if="isTextAreaFocused">
          <Button
              class="details-dialog-submit-btn"
              label="Secondary"
              severity="info"
              @click="() => updateItemField('description', description)"
          >
            Save
          </Button>
          <Button label="Secondary" severity="secondary" @click="cancelUpdateDescription">
          Cancel
        </Button>
        </div>
      </Transition>
    </div>
    <template #footer/>
  </Dialog>
</template>

<style scoped lang="scss">
  $dialog-width: 350px;

  :global(.p-dialog-content) {
    overflow-y: hidden !important;
  }

  .details-dialog-header-wrapper {
    max-width: $dialog-width;
    display: flex;
    align-items: center;

    span {
      cursor: pointer;
    }

    h2 {
      width: $dialog-width;
      overflow: hidden;
      display: inline-block;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  .details-dialog {
    max-width: $dialog-width;

    &-form {
      width: 100%;
      margin-bottom: 8px;

      &-priority-item {
        display: flex;
        align-items: center;

        &-color {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          margin-left: 8px;
        }
      }
    }

    textarea {
      margin-bottom: 8px;
    }

    &-submit-btn {
      margin-right: 8px;
    }

    &-section-wrapper {
      width: 350px;
      display: flex;
      margin-bottom: 8px;
      align-items: center;

      h3 {
        margin-left: 8px;
      }
    }
  }
</style>
