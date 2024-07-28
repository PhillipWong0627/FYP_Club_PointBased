<template>
    <div>
        <Navnavbars></Navnavbars>
        <UserNavbar></UserNavbar>
        Event
        <FooterComp></FooterComp>
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

