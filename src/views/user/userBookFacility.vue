<template>
    <div>
        <Navnavbars></Navnavbars>
        <UserNavbar></UserNavbar>

        <div class="flex flex-col items-center">
            <span class="text-3xl font-semibold uppercase py-4">Facilities</span>
            <div class="flex flex-wrap justify-evenly border-2 border-red-500 facilityContainer bg-emerald-200">
                <!-- Components for all the facilities -->
                <div class="flex flex-col items-center justify-around cardContainer px-2 my-2 border-2 border-red-500">
                    <img style="width: 100%; height: 60%;" src="@/assets/navBar/appImage.png">
                    <span class="text-xl">Badminton Rubber Flooring</span>
                    <ButtonPress>Book Now</ButtonPress>
                </div>
                <div class="flex flex-col items-center justify-around cardContainer px-2 my-2 border-2 border-red-500">
                    <img style="width: 100%; height: 60%;" src="@/assets/navBar/appImage.png">
                    <span class="text-xl">Swimming</span>
                    <ButtonPress>Book Now</ButtonPress>
                </div>
                <div class="flex flex-col items-center justify-around cardContainer px-2 my-2 border-2 border-red-500">
                    <img style="width: 100%; height: 60%;" src="@/assets/navBar/appImage.png">
                    <span class="text-xl">Snooker</span>
                    <ButtonPress>Book Now</ButtonPress>
                </div>

                <div class="flex flex-col items-center justify-around cardContainer px-2 my-2 border-2 border-red-500">
                    <img style="width: 100%; height: 60%;" src="@/assets/navBar/appImage.png">
                    <span class="text-xl">Basketball</span>
                    <ButtonPress>Book Now</ButtonPress>
                </div>

                <div class="flex flex-col items-center justify-around cardContainer px-2 my-2 border-2 border-red-500">
                    <img style="width: 100%; height: 60%;" src="@/assets/navBar/appImage.png">
                    <span class="text-xl">Ping Pong</span>
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

    },
    data() {
        return {


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
    background: white;
}
</style>
