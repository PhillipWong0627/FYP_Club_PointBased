<template>
    <div>
        <Navnavbars></Navnavbars>
        <UserNavbar></UserNavbar>
        <p class="flex justify-center font-semibold text-3xl uppercase mt-6">Rewards</p>

        <!-- Outer Div.. -->
        <div style=" height: 360px;" class=" flex justify-center mt-6 ">
            <div class=" bg-white flex justify-center rounded-3xl shadow-2xl" style="width: 500px;">
                <div style="width: 98%; "
                    class="mt-1 mb-1 rounded-3xl flex flex-col relative  items-center bg-emerald-200">
                    <div class="absolute cursor-pointer" style="right: 12px; top: 10px;">
                        <!-- <i class="fas fa-info flex mt  -1 justify-center"></i> -->
                        <i class="fas fa-info-circle text-2xl"></i>

                        <!-- <img style="width: 30px; height: 30px;" src="@/assets/navBar/appImage.png" /> -->
                    </div>
                    <div class="shadow-xl bg-white flex flex-col mt-10 items-center py-2" style="width: 250px;">
                        <qrcode-vue :value="value" :size="size" level="H" />
                        <span class="flex justify-center text-sm uppercase font-semibold mt-1">M 259 99</span>
                    </div>
                    <div class="mt-1">
                        <span class="text-sm font-bold uppercase">Scan Code To Collect Point</span>
                    </div>
                    <div style="right: 10px; bottom: 10px;" class="absolute flex items-center">
                        <span class="pr-2 pb-1 uppercase font-bold"> {{ this.memberPoints }} pts</span>
                        <i class="fas fa-chevron-right cursor-pointer pr-2"></i>
                    </div>

                </div>

            </div>


        </div>


        <RewardPage></RewardPage>
        <DealsPage></DealsPage>

        <FooterComp class="mt-20"></FooterComp>
    </div>
</template>

<script>
import Navnavbars from "@/components/Navnavbars/navNavBar.vue";
import FooterComp from "@/components/Footers/Footer.vue";
import UserNavbar from '@/components/Navbars/UserNavbar.vue'
import RewardPage from "@/components/Rewards/rewardComp.vue";
import DealsPage from "@/components/Rewards/DealComp.vue";

//QR Code
import QrcodeVue from 'qrcode.vue'



export default {
    components: {
        Navnavbars,
        FooterComp,
        UserNavbar,
        RewardPage,
        DealsPage,

        //QR Code
        QrcodeVue
    },
    methods: {

    },
    data() {
        return {
            value: 'https://www.linkedin.com/in/wong-liang-jian-602176230/',
            size: 225,

            memberPoints: localStorage.getItem('points'),

        }
    }
}


</script>
