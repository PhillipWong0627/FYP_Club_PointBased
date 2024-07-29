<template>
    <div>
        <Navnavbars></Navnavbars>
        <UserNavbar></UserNavbar>
        Rewards

        <div style="width: 500px; height: 500px;" class="border-2 border-red-500">
            QR CODE
        </div>

        <div class="flex flex-col">
            <div class="flex">
                <span>Rewards</span>
                <button>view all</button>
            </div>
            <div>
                Cards..........
            </div>
            
        </div>
        <div class="flex flex-col">
            <span>Deals</span>
            <div class="">
                List of Type ...
            </div>
            <div>
                Cards..........
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

