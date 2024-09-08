<template>
    <div>
        <Navnavbars></Navnavbars>
        <UserNavbar></UserNavbar>

        <div class="flex flex-col items-center">
            <p class="flex justify-center font-semibold text-3xl uppercase mt-6">Facilities</p>

            <!-- <span class="text-3xl font-semibold uppercase py-4">Facilities</span> -->
            <div class="flex flex-wrap justify-evenly facilityContainer  container">
                <!-- Components for all the facilities -->
                <div @click="toFacilityBooking(i.facilityID)" v-for="i in facilityData" :key="i.facilityData"
                    class="flex flex-col items-center justify-around cardContainer   bg-blueGray-100 px-2 my-2 rounded-sm">
                    <img style="width: 100%; height: 60%;" :src="i.facilityImage" class="rounded-md">
                    <span class="text-xl">{{ i.facilityName }}</span>
                    <ButtonPress>Book Now</ButtonPress>
                </div>
            </div>
        </div>
        <FooterComp class="mt-12"></FooterComp>
    </div>
</template>

<script>
import Navnavbars from "@/components/Navnavbars/navNavBar.vue";
import FooterComp from "@/components/Footers/Footer.vue";
import UserNavbar from '@/components/Navbars/UserNavbar.vue'
import ButtonPress from "@/components/ButtonPress.vue";

export default {
    components: {
        Navnavbars,
        FooterComp,
        UserNavbar,
        ButtonPress
    },
    methods: {
        toFacilityBooking(facilityID) {
            const routeData = this.$router.resolve({
                name: "Scheduler",
                query:{
                    FacilityID: facilityID,
                },
                
            });
            window.location.href = routeData.href;
        }
    },
    data() {
        return {
            facilityData: [
                {
                    facilityID: 1,
                    facilityName: "Badminton Rubber Flooring",
                    facilityImage: require("@/assets/facility/badmintonCourt.jpg").default
                },

                {
                    facilityID: 2,
                    facilityName: "PingPong",
                    facilityImage: require("@/assets/facility/badmintonCourt.jpg").default
                },
                {
                    facilityID: 3,
                    facilityName: "Football",
                    facilityImage: require("@/assets/facility/badmintonCourt.jpg").default
                },
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
