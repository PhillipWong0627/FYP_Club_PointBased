<template>
  <div class="flex flex-wrap mt-4">
    <div class="w-full mb-12 px-4">
      <FacilityCardTable />
    </div>
  </div>
</template>
<script>
import FacilityCardTable from "@/components/Cards/FacilityCardTable.vue";

export default {
  components: {
    FacilityCardTable,
  },
};
</script>
