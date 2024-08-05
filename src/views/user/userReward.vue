<template>
    <div>
        <Navnavbars></Navnavbars>
        <UserNavbar></UserNavbar>

        <p class="flex justify-center text-3xl uppercase mt-6">Rewards</p>


        <div style=" height: 500px;" class="border-2 border-red-500 flex justify-center">
            <div class="border-2 border-red-500 bg-white flex justify-center" style="width: 500px;">
                <div class="flex flex-col bg-emerald-200">
                    <div>
                        RIGHT ICON
                    </div>
                    <div class="border-2 border-red-500 bg-white flex flex-col items-center py-2" style="width: 250px;">
                        <qrcode-vue :value="value" :size="size" level="H" />
                        <span class="flex justify-center text-sm">M 259 99</span>
                    </div>
                    <div>
                        WORDS
                    </div>

                </div>

            </div>


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

//QR Code
import QrcodeVue from 'qrcode.vue'

export default {
    components: {
        Navnavbars,
        FooterComp,
        UserNavbar,

        //QR Code
        QrcodeVue
    },
    methods: {

    },
    data() {
        return {
            value: 'https://www.linkedin.com/in/wong-liang-jian-602176230/',
            size: 225,


        }
    }
}


</script>
