<template>
    <div>
        <Navnavbars></Navnavbars>
        <UserNavbar></UserNavbar>
        <main class="profile-page">
            <section class="relative py-16 bg-blueGray-200">
                <div class="container mx-auto">
                    <ProfileCard />
                </div>


            </section>

        </main>
        <!-- <div class="flex flex-wrap">
            <div class="w-full lg:w-8/12 px-4">
            </div>
        </div> -->

        <footer-component />

    </div>
</template>
<script>
import Navnavbars from "@/components/Navnavbars/navNavBar.vue";
import UserNavbar from '@/components/Navbars/UserNavbar.vue'

import FooterComponent from "@/components/Footers/Footer.vue";

import ProfileCard from "@/components/Cards/ProfileCard.vue";

export default {
    components: {
        ProfileCard,
        Navnavbars,
        UserNavbar,
        FooterComponent

    },
};
</script>