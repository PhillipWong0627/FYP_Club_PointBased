<template>
    <div>
        <Navnavbars></Navnavbars>
        <UserNavbar></UserNavbar>

        <div class="flex flex-col items-center">
            <span class="text-3xl font-semibold">Facility</span>
            <div>
                <!-- Components for all the facilities -->
                Card

            </div>
        </div>
        <FooterComp class="mt-12"></FooterComp>
    </div>
</template>

<script>
import Navnavbars from "@/components/Navnavbars/navNavBar.vue";
import FooterComp from "@/components/Footers/Footer.vue";
import UserNavbar from '@/components/Navbars/UserNavbar.vue'

export default {
    components: {
        Navnavbars,
        FooterComp,
        UserNavbar,
    },
    methods: {

    },
    data() {
        return {


        }
    }
}


</script>
