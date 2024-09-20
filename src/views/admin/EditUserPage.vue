<template>
    <div class="flex flex-wrap">
      <div class="w-full px-4">
        <AdminEditCard />
      </div>
    </div>
  </template>
  <script>
  import AdminEditCard from "@/components/Cards/AdminEditUserCard.vue";
  
  export default {
    components: {
      AdminEditCard,
    },
  };
  </script>
  