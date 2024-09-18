<template>
  <div class="flex flex-wrap mt-4">
    <div class="w-full mb-12 px-4">
      <EventCardTable />
    </div>
  </div>
</template>
<script>
import EventCardTable from "@/components/Cards/EventCardTable.vue";

export default {
  components: {
    EventCardTable,
  },
};
</script>
