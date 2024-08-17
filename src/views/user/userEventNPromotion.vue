<template>
    <div class="">
        <Navnavbars></Navnavbars>
        <UserNavbar></UserNavbar>
        <p class="flex justify-center font-semibold text-3xl uppercase mt-6">Event Promotion</p>
        <!-- <div style="width: 900px; height: 220px;" class="flex justify-center mx-auto rounded-full">
            <img class="w-full rounded-3xl" src="@/assets/userMain/golfImage.jpg">
        </div> -->
        <swiper :pagination="true" :keyboard="true" :modules="modules" class="mySwiper mt-4">

            <swiper-slide v-for="i in advertisementData" :key="i.advertisementData" class="">
                <img class="w-full rounded-3xl" :src="i.advImage" />
            </swiper-slide>
        </swiper>

        <main class="wrapper pt-6 pb-12 ">
            <div class="card-container flex justify-evenly w-full">
                <div class="card h-44 py-2 px-1 relative md:w-1/2 lg: w-1/3 xl:w-1/4 " v-for="livedata in liveData"
                    :key="livedata.liveData">
                    <div class="card-body relative">
                        <!-- <div @click="toLiveStream(livedata.liveID, livedata.streamerID)" class="card-body relative"> -->
                        <div class="w-full h-full">
                            <img style="" class="" :src="livedata.image" alt="Image" />
                        </div>
                        <div class="gradient_bottom w-full flex titleBox relative bottom-[50px] items-center p-1 pb-2">
                            <div class="pr-1 pl-1 z-10 w-full contentImage  md:pb-1.5">

                                <img id="circle" style="width: 25px" class="rounded-full" :src="livedata.image"
                                    alt="Image" />
                            </div>
                            <div class="flex flex-col pl-1 items-start z-10 w-52">
                                <div class="text-start text-white font-normal text-sm  w-210-px multiline-ellipsis">
                                    <span> {{ livedata.liveTitle }}</span>
                                </div>
                                <div class="text-xs text-white font-bold opacity-60 text-start multiline-ellipsis">
                                    {{ livedata.streamerName }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
        <!-- <div>
            <ul>
                <li v-for="i in liveData" :key="i.liveData">
                    {{ i.liveID }}
                </li>
            </ul>
        </div> -->

        <FooterComp class=""></FooterComp>
    </div>
</template>

<script>
import Navnavbars from "@/components/Navnavbars/navNavBar.vue";
import FooterComp from "@/components/Footers/Footer.vue";
import UserNavbar from '@/components/Navbars/UserNavbar.vue'
import team1 from "@/assets/img/team-1-800x800.jpg";
import appImage from "@/assets/navBar/location.png";

import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';

import 'swiper/css/navigation';
import 'swiper/css/pagination';

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
    methods: {

    },
    data() {
        return {
            modules: [Navigation, Pagination, Mousewheel, Keyboard],

            team1,
            appImage,

            liveData: [
                {
                    liveID: "1",
                    streamerID: "1",
                    image: "https://images-cdn.ubuy.co.in/65fd32d17317ea26e17dd8e3-pack-of-4-3-inch-stickers-hello-kitty.jpg",
                    liveTitle: "Live Stream 1Live Stream 1Live Stream 1Live Stream 1Live Stream 1Live Stream 1Live Stream 1Live Stream 1Live Stream 1",
                    streamerIcon: this.appImage,
                    streamerName: "Live Stream 1Live Stream 1Live Stream 1Live Stream 1Live Stream 1"
                },
                {
                    liveID: "2",
                    streamerID: "2",
                    image: "https://images-cdn.ubuy.co.in/65fd32d17317ea26e17dd8e3-pack-of-4-3-inch-stickers-hello-kitty.jpg",
                    liveTitle: "Live Stream 2",
                    streamerIcon: this.team,
                    streamerName: "Streamer 2"
                },
                {
                    liveID: "2",
                    streamerID: "2",
                    image: "https://images-cdn.ubuy.co.in/65fd32d17317ea26e17dd8e3-pack-of-4-3-inch-stickers-hello-kitty.jpg",
                    liveTitle: "Live Stream 2",
                    streamerIcon: this.team,
                    streamerName: "Streamer 2"
                },

                {
                    liveID: "2",
                    streamerID: "2",
                    image: "https://images-cdn.ubuy.co.in/65fd32d17317ea26e17dd8e3-pack-of-4-3-inch-stickers-hello-kitty.jpg",
                    liveTitle: "Live Stream 2",
                    streamerIcon: this.team,
                    streamerName: "Streamer 2"
                },

                {
                    liveID: "2",
                    streamerID: "2",
                    image: require("@/assets/userMain/h.jpg").default,
                    liveTitle: "Live Stream 2",
                    streamerIcon: this.team,
                    streamerName: "Streamer 2"
                },
                {
                    liveID: "2",
                    streamerID: "2",
                    image: require("@/assets/userMain/h.jpg").default,
                    liveTitle: "Live Stream 2",
                    streamerIcon: this.team,
                    streamerName: "Streamer 2"
                },
                {
                    liveID: "2",
                    streamerID: "2",
                    image: require("@/assets/userMain/h.jpg").default,
                    liveTitle: "Live Stream 2",
                    streamerIcon: this.team,
                    streamerName: "Streamer 2"
                },
                {
                    liveID: "2",
                    streamerID: "2",
                    image: require("@/assets/userMain/h.jpg").default,
                    liveTitle: "Live Stream 2",
                    streamerIcon: this.team,
                    streamerName: "Streamer 2"
                },
                {
                    liveID: "2",
                    streamerID: "2",
                    image: require("@/assets/userMain/h.jpg").default,
                    liveTitle: "Live Stream 2",
                    streamerIcon: this.team,
                    streamerName: "Streamer 2"
                },
                {
                    liveID: "2",
                    streamerID: "2",
                    image: require("@/assets/userMain/h.jpg").default,
                    liveTitle: "Live Stream 2",
                    streamerIcon: this.team,
                    streamerName: "Streamer 2"
                },
                {
                    liveID: "2",
                    streamerID: "2",
                    image: require("@/assets/userMain/h.jpg").default,
                    liveTitle: "Live Stream 2",
                    streamerIcon: this.team,
                    streamerName: "Streamer 2"
                },
                {
                    liveID: "2",
                    streamerID: "2",
                    image: require("@/assets/userMain/h.jpg").default,
                    liveTitle: "Live Stream 2",
                    streamerIcon: this.team,
                    streamerName: "Streamer 2"
                },
                {
                    liveID: "2",
                    streamerID: "2",
                    image: require("@/assets/userMain/h.jpg").default,
                    liveTitle: "Live Stream 2",
                    streamerIcon: this.team,
                    streamerName: "Streamer 2"
                },
                {
                    liveID: "2",
                    streamerID: "2",
                    image: require("@/assets/userMain/h.jpg").default,
                    liveTitle: "Live Stream 2",
                    streamerIcon: this.team,
                    streamerName: "Streamer 2"
                },


            ],

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
        }
    }
}


</script>

<style scoped>
@media (min-width: 300px) {
    .card {
        display: inline-block;
        width: 175px;
        height: 162px;
    }

    .titleBox {
        position: absolute;
        bottom: 0;
    }

    .contentImage {
        display: block;
        width: 30px;
    }

    .gradient_bottom::before {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        z-index: 1;
        background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%);
        background-size: cover;
        /* border-radius: 8px; */
    }
}

@media (min-width: 500px) {
    .card {
        display: inline-block;
        width: 230px;
        height: 162px;
    }

    .titleBox {
        position: absolute;
        bottom: 0;
    }

    .contentImage {
        display: block;
        width: 35px;
    }

    .gradient_bottom::before {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        bottom: 1;
        z-index: 1;
        background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%);
        background-size: cover;
        border-radius: 8px;
    }
}

@media (min-width: 640px) {
    .card {
        display: inline-block;
        width: 237px;
        height: 162px;
    }

    .titleBox {
        position: absolute;
        bottom: 0;
    }

    .contentImage {
        display: block;
        width: 38px;
    }

    .gradient_bottom::before {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        z-index: 1;
        background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%);
        background-size: cover;
        border-radius: 8px;
    }
}

.wrapper {
    width: 100%;
    max-width: 892px;
    margin: 0px auto;
}

.card-container {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    row-gap: 15px;
    border: 10px solid gren;
}

.card-body {
    text-align: center;
    height: 161px;
    width: 100%;
    cursor: pointer;
    position: relative;
}

.card-body img {
    width: 100%;
    height: 100%;
    border-radius: 8px;
}

#circle {
    width: 30px;
    height: 30px;
    border-radius: 50%;
}

.gradient_bottom::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    bottom: 0;
    z-index: 1;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%);
    background-size: cover;
}

.multiline-ellipsis {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.multiline-ellipsis::after {
    content: "...";
}

.swiper {
    width: 100%;
    height: 100%;
}

.swiper-slide {
    text-align: center;
    font-size: 18px;
    background-color: #E2E8F0;
        /* #bfdbfe */
    ;

    /* Center slide text vertically */
    display: flex;
    justify-content: center;
    align-items: center;
}

.swiper-slide img {
    display: block;
    width: 900px;
    height: 300px;
    object-fit: cover;
}
</style>
