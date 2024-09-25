<template>
    <div class="bg-blueGray-200">

        <Navnavbars></Navnavbars>
        <UserNavbar></UserNavbar>

        <div class="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen-75">
            <div class="absolute top-0 w-full h-full bg-center bg-cover main-section">
                <span id="blackOverlay" class="w-full h-full absolute opacity-75 bg-black"></span>
            </div>
            <div class="container relative mx-auto">
                <div class="items-center flex flex-wrap">
                    <div class="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
                        <div class="flex site-hero-inner justify-center items-center ">
                            <div class=" text-center">
                                <h1 class="heading" data-aos="fade-up">Welcome to <em>Villa</em> club</h1>
                                <p class="sub-heading mb-5" data-aos="fade-up" data-aos-delay="100">Discover our
                                    world-class
                                    service &amp; restaurant.</p>
                                <!-- <p data-aos="fade-up" data-aos-delay="100"><a href="/admin"
                                        class="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">Explore
                                        The
                                        Beauty</a>
                                    <a href="#" @click="toAdminPage()"
                                        class="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
                                        Download
                                    </a>
                                </p> -->

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
                style="transform: translateZ(0);">
                <svg class="absolute bottom-0 overflow-hidden" xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="none" version="1.1" viewBox="0 0 2560 100" x="0" y="0">
                    <polygon class="text-blueGray-200 fill-current" points="2560 0 2560 100 0 100"></polygon>
                </svg>
            </div>
        </div>


        <div class="container mx-auto px-4 bg-blueGray-200 pt-6">

            <div class="items-center flex flex-wrap">
                <div class="w-full md:w-6/12 ml-auto mr-auto px-4">
                    <img alt="..." class="max-w-full rounded-lg shadow-lg" src="@/assets/userMain/golfImage.jpg" />
                </div>
                <div class="w-full md:w-5/12 ml-auto mr-auto px-4">
                    <div class="md:pr-12 ">

                        <h3 class="text-3xl font-semibold">THE LAKES & THE HILLS</h3>
                        <p class="mt-4 text-lg leading-relaxed text-blueGray-500 text-justify">
                            Welcome to our exclusive Club Management System, where we believe in creating an enriching
                            experience for all our members. Our club is not just a place to enjoy top-notch facilities
                            and events, but a thriving community where every interaction brings value.

                            We are dedicated to providing a seamless and rewarding experience for all our members.
                            Whether you are booking a facility, joining exciting club events, or enjoying exclusive
                            rewards, our system is designed to offer convenience and enhance your club experience.

                        </p>
                        <!-- <p class="pt-2 text-justify text-lg leading-relaxed text-blueGray-500">
                            Overall, KRPM is a top-notch golf destination that offers an unforgettable experience in
                            Malaysia.
                        </p> -->
                        <div class="pt-6">
                            <ButtonPress @click="scrollToUserMemberPlan()" class="text-sm">Become Members</ButtonPress>
                        </div>
                    </div>
                </div>
            </div>
        </div>



        <div class="container mx-auto flex flex-wrap items-center mt-32 bg-blueGray-200">
            <div class="w-full md:w-5/12 px-4 mr-auto ml-auto">
                <h3 class="text-3xl mb-2 font-semibold leading-normal">BANQUET, EVENT & CONFERENCE</h3>
                <p class="text-4xl font-normal leading-normal text-gray-600">FOOD & BEVERAGES</p>

                <p class="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600">
                    Indulge in an unforgettable culinary experience at our restaurant, where our menu takes you on a
                    tantalizing journey that will awaken your taste buds. Come and savor the flavors that make us stand
                    out from the rest at:
                </p>
                <div class="pl-1 pt-2 font-light">
                    <div v-for="i in foodList" :key="i.foodList">
                        <i class="fas fa-caret-right"></i>
                        <span class="pl-3">{{ i.name }}</span>
                    </div>
                </div>
                <div class="pt-6">
                    <ButtonPress @click="toFoodBeveragePage()" class="text-sm">Discover More</ButtonPress>
                </div>
            </div>

            <div class="w-full md:w-4/12 px-4 mr-auto ml-auto">
                <div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-emerald-300">
                    <img alt="..." src="@/assets/userMain/mixed_lounge.jpg" class="w-full align-middle rounded-t-lg" />
                    <blockquote class="relative p-8 mb-4">
                        <svg preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 583 95"
                            class="absolute left-0 w-full block h-95-px -top-94-px">
                            <polygon points="-30,95 583,95 583,65" class="text-emerald-300 fill-current"></polygon>
                        </svg>
                        <h4 class="text-xl font-bold text-white">
                            Top Clubs Services
                        </h4>
                        <p class="text-md font-light mt-2 text-white">
                            Multi National Food is all availabe here,
                            japanese foods with Michelin star, not only that,
                            malaysian foods are the most appeal diat at here

                        </p>
                    </blockquote>
                </div>
            </div>
        </div>
        <div ref="userMemberPlan" class="">
            <UserMemberPlan></UserMemberPlan>
        </div>
        <FooterComp class="" />



    </div>
</template>

<script>
import Navnavbars from "@/components/Navnavbars/navNavBar.vue";
import ButtonPress from "@/components/ButtonPress.vue";
import FooterComp from "@/components/Footers/Footer.vue";
import UserNavbar from '@/components/Navbars/UserNavbar.vue'
import UserMemberPlan from "@/components/UserMainPage/MemberPlanComp.vue";

export default {
    components: {
        Navnavbars,
        ButtonPress,
        FooterComp,
        UserNavbar,
        UserMemberPlan,
    },
    methods: {
        scrollToUserMemberPlan() {
            const section = this.$refs.userMemberPlan;
            section.scrollIntoView({ behavior: 'smooth' });
        },


        toAdminPage() {
            console.log("Going to Admin Page");
            const routeData = this.$router.resolve({
                name: "adminDashboard"
            });

            window.location.href = routeData.href;
        },
        toFoodBeveragePage() {
            const routeData = this.$router.resolve({
                name: "food&beverage",

            });
            window.location.href = routeData.href;

        },
    },
    data() {
        return {
            foodList: [
                { name: "The Golfers Terrace" },
                { name: "The Putra Cafe" },
                { name: "The Mixed Lounge" },
                { name: "Japanese Food Restaurant & Many More" }
            ],

        }
    }
}


</script>


<style scoped>
.main-section {
    background-image: url('@/assets/userMain/hero_1.jpg');
    background-size: cover;
    background-position: center;


}


.food-section {
    position: relative;
    background-image: url('@/assets/userMain/golfImage.jpg');
    background-size: cover;
    background-position: center;
    height: 500px;
    display: flex;
    padding-right: 100px;
    align-items: center;
    justify-content: flex-end;
    margin-bottom: 200px;

}

.site-hero {
    background-size: cover;
    height: 100vh;
    min-height: 700px;
    width: 100%;
}

.site-hero .scroll-down {
    position: absolute;
    bottom: 20px;
    left: 50%;
    -webkit-transform: translateX(-50%);
    -ms-transform: translateX(-50%);
    transform: translateX(-50%);
    color: #fff;
}

.site-hero.overlay:before {
    background: rgba(0, 0, 0, 0.45);
    content: "";
    position: absolute;
    height: 100vh;
    min-height: 500px;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
}

.overlay {
    background: rgba(0, 0, 0, 0.45);
    content: "";
    position: absolute;
    height: 100vh;
    min-height: 800px;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
}

.site-hero-inner .heading {
    font-size: 60px;
    font-family: "Playfair+Display", times, serif;
    color: #fff;
    line-height: 1;
    font-weight: bold;
}

@media (max-width: 991.98px) {
    .site-hero-inner .heading {
        font-size: 40px;
    }
}

.site-hero-inner .sub-heading {
    font-size: 30px;
    font-weight: 200;
    color: #fff;
    line-height: 1.5;
}

@media (max-width: 991.98px) {
    .site-hero-inner .sub-heading {
        font-size: 18px;
    }
}

.page-inside .site-hero-inner,
.page-inside {
    height: 70vh;
    min-height: 500px;
}
</style>
