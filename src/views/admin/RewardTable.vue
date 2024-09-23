<template>
  <div class="flex flex-wrap mt-4">
    <div class="w-full mb-12 px-4">
      <RewardsCardTable />
    </div>
  </div>
</template>
<script>
import RewardsCardTable from "@/components/Cards/RewardCardTable.vue";

export default {
  components: {
    RewardsCardTable,
  },
};
</script>
