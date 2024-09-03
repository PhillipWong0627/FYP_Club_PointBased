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
                <!-- <div class="flex flex-col items-center justify-around cardContainer px-2 my-2">
                    <img style="width: 100%; height: 60%;" src="@/assets/navBar/appImage.png">
                    <span class="text-xl">Swimming</span>
                    <ButtonPress>Book Now</ButtonPress>
                </div>
                <div class="flex flex-col items-center justify-around cardContainer px-2 my-2">
                    <img style="width: 100%; height: 60%;" src="@/assets/navBar/appImage.png">
                    <span class="text-xl">Snooker</span>
                    <ButtonPress>Book Now</ButtonPress>
                </div>

                <div class="flex flex-col items-center justify-around cardContainer px-2 my-2">
                    <img style="width: 100%; height: 60%;" src="@/assets/navBar/appImage.png">
                    <span class="text-xl">Basketball</span>
                    <ButtonPress>Book Now</ButtonPress>
                </div>

                <div class="flex flex-col items-center justify-around cardContainer px-2 my-2">
                    <img style="width: 100%; height: 60%;" src="@/assets/navBar/appImage.png">
                    <span class="text-xl">Ping Pong</span>
                    <ButtonPress>Book Now</ButtonPress>
                </div> -->





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
                    facilityImage: require("@/assets/userMain/h.jpg").default
                },
                {
                    facilityID: 2,
                    facilityName: "Swimming",
                    facilityImage: require("@/assets/userMain/hero_1.jpg").default
                },
                {
                    facilityID: 3,
                    facilityName: "Snooker",
                    facilityImage: require("@/assets/userMain/h.jpg").default
                },
                {
                    facilityID: 4,
                    facilityName: "Basketball",
                    facilityImage: require("@/assets/userMain/hero.png").default
                },
                {
                    facilityID: 5,
                    facilityName: "PingPong",
                    facilityImage: require("@/assets/userMain/h.jpg").default
                },
                {
                    facilityID: 6,
                    facilityName: "Football",
                    facilityImage: require("@/assets/userMain/h.jpg").default
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
