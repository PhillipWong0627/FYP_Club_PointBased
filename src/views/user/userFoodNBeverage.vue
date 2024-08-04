<template>
    <div>
        <Navnavbars></Navnavbars>
        <UserNavbar></UserNavbar>

        <swiper :pagination="true" :keyboard="true" :modules="modules" class="mySwiper">
            <swiper-slide v-for="i in advertisementData" :key="i.advertisementData">
                <img :src="i.advImage" />
            </swiper-slide>
        </swiper>



        <FooterComp style="margin-top: 1000px;" class="mt-12"></FooterComp>
    </div>


</template>

<script>
import Navnavbars from "@/components/Navnavbars/navNavBar.vue";
import FooterComp from "@/components/Footers/Footer.vue";
import UserNavbar from '@/components/Navbars/UserNavbar.vue'

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';

import 'swiper/css/navigation';
import 'swiper/css/pagination';

// import './style.css';

// import required modules
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';

export default {
    components: {
        Navnavbars,
        FooterComp,
        UserNavbar,

        Swiper,
        SwiperSlide,
    },
    setup() {
        return {
            modules: [Navigation, Pagination, Mousewheel, Keyboard],
            advertisementData: [
                {
                    advImage: require("@/assets/userMain/h.jpg").default
                },
                {
                    advImage: require("@/assets/userMain/h.jpg").default
                },
                {
                    advImage: require("@/assets/userMain/h.jpg").default
                },
                {
                    advImage: require("@/assets/userMain/h.jpg").default
                },
                {
                    advImage: require("@/assets/userMain/h.jpg").default
                },
                {
                    advImage: require("@/assets/userMain/h.jpg").default
                },
            ]
        };
    },
};
</script>

<style>
.swiper {
    width: 100%;
    height: 100%;
}

.swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #fff;

    /* Center slide text vertically */
    display: flex;
    justify-content: center;
    align-items: center;
}

.swiper-slide img {
    display: block;
    width: 900px;
    height: 350px;
    object-fit: cover;
}
</style>