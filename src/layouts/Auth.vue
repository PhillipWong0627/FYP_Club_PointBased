<template>
  <div>
    <Navnavbars/>
    <UserNavbar/>
    <main>
      <section class="relative w-full h-full py-40 min-h-screen">
        <div
          class="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full"
          :style="`background-image: url('${registerBg2}');`"
        ></div>
        <router-view />
      </section>
    </main>
  </div>
</template>
<script>
import UserNavbar from "@/components/Navbars/UserNavbar.vue";
import Navnavbars from "@/components/Navnavbars/navNavBar.vue";


import registerBg2 from "@/assets/img/register_bg_2.png";

export default {
  data() {
    return {
      registerBg2,
    };
  },
  components: {
    UserNavbar,
    Navnavbars
  },
};
</script>
