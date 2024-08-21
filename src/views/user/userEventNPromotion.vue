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
            <span class="flex justify-center uppercase font-bold text-3xl pb-2">News</span>
            <div class="card-container flex justify-evenly w-full">
                <div class="card h-44 py-2 px-1 relative md:w-1/2 lg: w-1/3 xl:w-1/4 " v-for="event in eventData"
                    :key="event.eventData" @click="toEventLink(event)">
                    <div class="card-body relative">
                        <!-- <div @click="toLiveStream(event.eventID, event.streamerID)" class="card-body relative"> -->
                        <div class="w-full h-full">
                            <img style="" class="" :src="event.image" alt="Image" />
                        </div>
                        <div class="gradient_bottom w-full flex titleBox relative bottom-[50px] items-center p-1 pb-2">
                            <div class="flex flex-col pl-1 items-start z-10 w-52">
                                <div class="text-start text-white font-normal text-sm  w-210-px multiline-ellipsis">
                                    <span> {{ event.eventTitle }}</span>
                                </div>
                                <div class="text-xs text-white font-bold opacity-60 text-start multiline-ellipsis">
                                    {{ event.dateTime }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
        <!-- Include the EventModal component -->
        <EventModal :isVisible="isModalVisible" :eventTitle="selectedEvent?.eventTitle"
            :eventDescription="selectedEvent?.dateTime" :eventImage="selectedEvent?.image" @close="isModalVisible = false" />

        <FooterComp class=""></FooterComp>
    </div>
</template>

<script>
import Navnavbars from "@/components/Navnavbars/navNavBar.vue";
import FooterComp from "@/components/Footers/Footer.vue";
import UserNavbar from '@/components/Navbars/UserNavbar.vue'
import team1 from "@/assets/img/team-1-800x800.jpg";
import appImage from "@/assets/navBar/location.png";
import EventModal from "@/components/Modals/EventModal.vue";

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

        EventModal,

    },
    methods: {
        toEventLink(event) {
            console.log(event);
            this.selectedEvent = event;
            this.isModalVisible = true; // Show modal

        }

    },
    data() {
        return {
            modules: [Navigation, Pagination, Mousewheel, Keyboard],

            team1,
            appImage,
            isModalVisible: false, // Control modal visibility
            selectedEvent: null, // Store selected event data

            eventData: [
                {
                    eventID: "1",
                    streamerID: "1",
                    image: "https://images-cdn.ubuy.co.in/65fd32d17317ea26e17dd8e3-pack-of-4-3-inch-stickers-hello-kitty.jpg",
                    eventTitle: "Live Stream 1Live Stream 1Live Stream 1Live Stream 1Live Stream 1Live Stream 1Live Stream 1Live Stream 1Live Stream 1",
                    streamerIcon: this.appImage,
                    dateTime: "Live Stream 1Live Stream 1Live Stream 1Live Stream 1Live Stream 1"
                },
                {
                    eventID: "2",
                    streamerID: "2",
                    image: "https://images-cdn.ubuy.co.in/65fd32d17317ea26e17dd8e3-pack-of-4-3-inch-stickers-hello-kitty.jpg",
                    eventTitle: "Live Stream 2",
                    streamerIcon: this.team,
                    dateTime: "Streamer 2"
                },
                {
                    eventID: "3",
                    streamerID: "2",
                    image: "https://images-cdn.ubuy.co.in/65fd32d17317ea26e17dd8e3-pack-of-4-3-inch-stickers-hello-kitty.jpg",
                    eventTitle: "Live Stream 2",
                    streamerIcon: this.team,
                    dateTime: "Streamer 2"
                },

                {
                    eventID: "4",
                    streamerID: "2",
                    image: "https://images-cdn.ubuy.co.in/65fd32d17317ea26e17dd8e3-pack-of-4-3-inch-stickers-hello-kitty.jpg",
                    eventTitle: "Live Stream 2",
                    streamerIcon: this.team,
                    dateTime: "Streamer 2"
                },

                {
                    eventID: "5",
                    streamerID: "2",
                    image: require("@/assets/userMain/h.jpg").default,
                    eventTitle: "Live Stream 2",
                    streamerIcon: this.team,
                    dateTime: "Streamer 2"
                },
                {
                    eventID: "6",
                    streamerID: "2",
                    image: require("@/assets/userMain/h.jpg").default,
                    eventTitle: "Live Stream 2",
                    streamerIcon: this.team,
                    dateTime: "Streamer 2"
                },
                {
                    eventID: "2",
                    streamerID: "2",
                    image: require("@/assets/userMain/h.jpg").default,
                    eventTitle: "Live Stream 2",
                    streamerIcon: this.team,
                    dateTime: "Streamer 2"
                },
                {
                    eventID: "2",
                    streamerID: "2",
                    image: require("@/assets/userMain/h.jpg").default,
                    eventTitle: "Live Stream 2",
                    streamerIcon: this.team,
                    dateTime: "Streamer 2"
                },
                {
                    eventID: "2",
                    streamerID: "2",
                    image: require("@/assets/userMain/h.jpg").default,
                    eventTitle: "Live Stream 2",
                    streamerIcon: this.team,
                    dateTime: "Streamer 2"
                },
                {
                    eventID: "2",
                    streamerID: "2",
                    image: require("@/assets/userMain/h.jpg").default,
                    eventTitle: "Live Stream 2",
                    streamerIcon: this.team,
                    dateTime: "Streamer 2"
                },
                {
                    eventID: "2",
                    streamerID: "2",
                    image: require("@/assets/userMain/h.jpg").default,
                    eventTitle: "Live Stream 2",
                    streamerIcon: this.team,
                    dateTime: "Streamer 2"
                },
                {
                    eventID: "2",
                    streamerID: "2",
                    image: require("@/assets/userMain/h.jpg").default,
                    eventTitle: "Live Stream 2",
                    streamerIcon: this.team,
                    dateTime: "Streamer 2"
                },
                {
                    eventID: "2",
                    streamerID: "2",
                    image: require("@/assets/userMain/h.jpg").default,
                    eventTitle: "Live Stream 2",
                    streamerIcon: this.team,
                    dateTime: "Streamer 2"
                },
                {
                    eventID: "2",
                    streamerID: "2",
                    image: require("@/assets/userMain/h.jpg").default,
                    eventTitle: "Live Stream 2",
                    streamerIcon: this.team,
                    dateTime: "Streamer 2"
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
