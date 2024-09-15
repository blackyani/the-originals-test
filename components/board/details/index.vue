<script setup lang="ts">
const props = defineProps<{
  showDetails: boolean,
  detailsItem: EditItem | null,
}>()

defineEmits<{
  closeDetails: () => void;
}>();

const visible = ref(false);

watch(() => props.showDetails, (newVal) => {
  console.log(props.showDetails);
  visible.value = newVal
})
</script>

<template>
  <Dialog
      v-model:visible="visible"
      close-on-escape
      closable
      modal
      header="Edit Profile"
      @hide="$emit('closeDetails')"
  >
    <span class="text-surface-500 dark:text-surface-400 block mb-8">Update your information.</span>
    <div class="flex items-center gap-4 mb-4">
      <label for="username" class="font-semibold w-24">Username</label>
      <InputText id="username" class="flex-auto" autocomplete="off" />
    </div>
    <div class="flex items-center gap-4 mb-8">
      <label for="email" class="font-semibold w-24">Email</label>
      <InputText id="email" class="flex-auto" autocomplete="off" />
    </div>
    <div class="flex justify-end gap-2">
      <Button type="button" label="Cancel" severity="secondary" @click="visible = false"/>
      <Button type="button" label="Save" @click="visible = false"/>
    </div>
  </Dialog>
</template>

<style scoped lang="scss">

</style>
