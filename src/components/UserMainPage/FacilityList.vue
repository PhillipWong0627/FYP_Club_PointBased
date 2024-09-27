<template>

    <div class="flex flex-col items-center">
        <p class="flex justify-center font-semibold text-3xl uppercase mt-6">Facilities</p>

        <!-- <span class="text-3xl font-semibold uppercase py-4">Facilities</span> -->
        <div class="flex flex-wrap justify-evenly  wrapper container ">
            <!-- Components for all the facilities -->
            <div @click="toFacilityBooking(i.facilityID)" v-for="i in facilityData" :key="i.facilityData"
                class="flex flex-col items-center justify-around cardContainer   bg-blueGray-100 px-2 my-2 rounded-sm">
                <img style="width: 100%; height: 60%;" :src="i.facilityImage" class="rounded-md">
                <!-- <img style="width: 100%; height: 60%;" src="@/assets/facility/badmintonCourt.jpg" class="rounded-md"> -->
                <span class="text-xl">{{ i.facilityName }}</span>
                <span class="text-sm"> Total Courts: {{ i.totalCourt }}</span>
                <span class="text-sm"> Location: {{ i.location }}</span>
                <ButtonPress>Book Now</ButtonPress>
            </div>
        </div>
    </div>
</template>

<script>
import ButtonPress from "@/components/ButtonPress.vue";

//API
import { getFacility } from '@/service/apiProvider.js';

export default {
    mounted() {
        this.getFacilityInfo();
    },
    components: {
        ButtonPress
    },
    methods: {
        toFacilityBooking(facilityID) {
            const routeData = this.$router.resolve({
                name: "Scheduler",
                query: {
                    FacilityID: facilityID,
                },

            });
            window.location.href = routeData.href;
        },

        async getFacilityInfo() {
            try {
                const result = await getFacility();
                // console.log("CALLING RESULT API");
                // console.log(result);

                this.facilityData = result;

            } catch (error) {
                console.error(error);
            }
        },
    },
    data() {
        return {
            facilityData: [
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

.wrapper {
    width: 100%;
    max-width: 1500px;
    margin: 0px auto;
}
</style>
