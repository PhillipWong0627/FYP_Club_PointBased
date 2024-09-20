<template>
  <div class="flex flex-wrap mt-4">
    <div class="w-full mb-12 px-4">
      <MemberTable />
    </div>
  </div>
</template>
<script>
import MemberTable from "@/components/Cards/MemberTable.vue";

export default {
  components: {
    MemberTable,
  },
};
</script>
