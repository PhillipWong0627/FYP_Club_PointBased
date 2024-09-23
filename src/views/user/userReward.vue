<template>
    <div>
        <Navnavbars></Navnavbars>
        <UserNavbar></UserNavbar>


        <p class="flex justify-center font-semibold text-3xl uppercase mt-6">Rewards</p>

        <div class="container mx-auto flex justify-between  mt-6">
            <span class=""></span>
            <span class="font-medium text-xl uppercase text-emerald-500 hover:text-black cursor-pointer">Available
                Points: <span class="font-extrabold text-2xl">{{ memberData.points }}</span> points</span>
        </div>

        <RewardPage></RewardPage>
        <!-- <DealsPage></DealsPage> -->

        <FooterComp class="mt-20"></FooterComp>
    </div>
</template>

<script>
import Navnavbars from "@/components/Navnavbars/navNavBar.vue";
import FooterComp from "@/components/Footers/Footer.vue";
import UserNavbar from '@/components/Navbars/UserNavbar.vue'
import RewardPage from "@/components/Rewards/rewardComp.vue";
// import DealsPage from "@/components/Rewards/DealComp.vue";

import axios from 'axios';


//QR Code
// import QrcodeVue from 'qrcode.vue'

export default {
    mounted() {
        this.fetchMemberData(); // Fetch member data when the component is mounted

    },
    components: {
        Navnavbars,
        FooterComp,
        UserNavbar,
        RewardPage,
        // DealsPage,

        //QR Code
        // QrcodeVue
    },
    data() {
        return {
            memberId: localStorage.getItem('memberID'),
            value: 'https://www.linkedin.com/in/wong-liang-jian-602176230/',
            size: 225,
            memberData: {
                memberName: "",
                address: "",
                contact: "",
                description: "",
                points: '',

            }, // to store the fetched member data


        }
    },
    methods: {
        async fetchMemberData() {
            const memberId = localStorage.getItem('memberID');
            if (memberId) {
                try {
                    const response = await axios.get(`/api/v1/user/getById/${memberId}`);
                    console.log(response)
                    this.memberData = response.data.data; // assuming the API returns member data in the "data" field
                } catch (error) {
                    console.error('Failed to fetch member data:', error);
                }
            } else {
                alert('Member ID found. Please log in.');
            }
        },
    },

}


</script>
