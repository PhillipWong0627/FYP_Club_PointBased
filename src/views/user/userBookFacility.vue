<template>
    <div>
        <Navnavbars></Navnavbars>
        <UserNavbar></UserNavbar>
        <FacilityList></FacilityList>
        <!-- <div class="flex flex-col items-center">
            <p class="flex justify-center font-semibold text-3xl uppercase mt-6">Facilities</p>

            <div class="flex flex-wrap justify-evenly facilityContainer  container">
                <div @click="toFacilityBooking(i.facilityID)" v-for="i in facilityData" :key="i.facilityData"
                    class="flex flex-col items-center justify-around cardContainer   bg-blueGray-100 px-2 my-2 rounded-sm">
                    <img style="width: 100%; height: 60%;" :src="i.facilityImage" class="rounded-md">
                    <span class="text-xl">{{ i.facilityName }}</span>
                    <span class="text-sm"> Total Courts: {{ i.totalCourt }}</span>
                    <span class="text-sm"> Total Courts: {{ i.location }}</span>
                    <ButtonPress>Book Now</ButtonPress>
                </div>
            </div>
        </div> -->
        <FooterComp class="mt-12"></FooterComp>
    </div>
</template>

<script>
import Navnavbars from "@/components/Navnavbars/navNavBar.vue";
import FooterComp from "@/components/Footers/Footer.vue";
import UserNavbar from '@/components/Navbars/UserNavbar.vue'
// import ButtonPress from "@/components/ButtonPress.vue";
import FacilityList from "@/components/UserMainPage/FacilityList.vue";

// //API
// import { getFacility } from '@/service/apiProvider.js';

export default {
    // mounted() {
    //     this.getFacilityInfo();
    // },
    components: {
        Navnavbars,
        FooterComp,
        UserNavbar,
        // ButtonPress,
        FacilityList,
    },
    methods: {
        // toFacilityBooking(facilityID) {
        //     const routeData = this.$router.resolve({
        //         name: "Scheduler",
        //         query: {
        //             FacilityID: facilityID,
        //         },

        //     });
        //     window.location.href = routeData.href;
        // },

        // async getFacilityInfo() {
        //     try {
        //         const result = await getFacility();
        //         console.log("CALLING RESULT API");
        //         console.log(result);

        //         this.facilityData = result;

        //     } catch (error) {
        //         console.error(error);
        //     }
        // },
    },
    data() {
        return {
            facilityData: [
                // {
                //     facilityID: 1,
                //     facilityName: "Badminton Rubber Flooring",
                //     facilityImage: require("@/assets/facility/badmintonCourt.jpg").default
                // },

                // {
                //     facilityID: 2,
                //     facilityName: "PingPong",
                //     facilityImage: require("@/assets/facility/badmintonCourt.jpg").default
                // },
                // {
                //     facilityID: 3,
                //     facilityName: "Football",
                //     facilityImage: require("@/assets/facility/badmintonCourt.jpg").default
                // },
            ]

        }
    }
}


</script>

<style scoped>
.facilityContainer {
    width: 1500px;
}

.cardContainer {

    width: 300px;
    height: 393px;
    /* background: white; */
}
</style>
