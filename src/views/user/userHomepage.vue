<template>
    <div>
        <Navnavbars></Navnavbars>
        <UserNavbar></UserNavbar>
        <!-- Put Svg -->
        <!-- <div class=" flex justify-center">
            <img class="w-full h-500-px" src="@/assets/img/team-1-800x800.jpg">
        </div> -->
        <section class="site-hero main-section ">
            <div class="">
                <div class="flex site-hero-inner justify-center items-center ">
                    <div class=" text-center">
                        <!-- <h1 class="heading" data-aos="fade-up">Welcome to <em>Villa</em> resort</h1>
                        <p class="sub-heading mb-5" data-aos="fade-up" data-aos-delay="100">Discover our world-class
                            hotel &amp; restaurant resort.</p>
                        <p data-aos="fade-up" data-aos-delay="100"><a href="#"
                                class="btn uppercase btn-primary mr-md-2 mr-0 mb-3 d-sm-inline d-block">Explore The
                                Beauty</a> <a href="#"
                                class="btn uppercase btn-outline-light d-sm-inline d-block">Download</a></p> -->
                    </div>
                </div>
            </div>
        </section>
        <div class="flex justify-center mt-24 mb-24">
            <div class="container flex flex-col items-center ">
                <div class="">
                    <span>Since 1987</span>
                </div>
                <div class="">
                    <span>KELAB RAHMAN PUTRA MALAYSIA</span>
                </div>
                <div class="flex flex-col">
                    <span class="text-center px-10">Kelab Rahman Putra Malaysia (KRPM) is a premier golfing destination
                        that offers members access
                        to
                        two challenging 18-hole par 72 golf courses. The Lakes Course and The Hills Course are both
                        designed
                        to provide golfers with a unique and challenging experience, and are considered among the best
                        golf
                        courses in the country.
                    </span>
                    <span class="mt-5 text-center px-10">our world-class golf courses, KRPM also offers a spacious Club
                        House that is full of amenities
                        for
                        members, family, and guests. Our Club House is equipped with a variety of facilities, including
                        a
                        swimming pool, fitness center, sauna, and steam room. We also have a restaurant and bar that
                        serves
                        delicious food and refreshing drinks, making it the perfect place to relax and socialize after a
                        round of golf.
                    </span>
                </div>
            </div>
        </div>
        <div class="golf-section">
            <div class="overlayy">
                <span class="text-3xl font-normal leading-normal text-emerald-200">GOLF</span>
                <p class="text-4xl font-normal leading-normal text-gray-600">THE LAKES & THE HILLS</p>
                <p class="pt-2 pl-1 text-justify">
                    Kelab R5hman Putra Malaysia (KRPM) offers two world-class golf courses, the Lakes and the Hills,
                    both designed to offer golfers a unique & challenging experience. The courses are set against a
                    stunning backdrop of lakes & lush greenery, & challenging water hazards, bunkers, & undulating
                    greens test golfers' precision & skill.
                </p>
                <p class="pt-2 pl-1 text-justify">
                    Overall, KRPM is a top-notch golf destination that offers an unforgettable experience in Malaysia.
                </p>
                <div class="pt-12">
                    <!-- Link to Register Member Page -->
                    <ButtonPress @click="testButton()" class="">Become Members</ButtonPress>
                </div>
            </div>
        </div>

        <div class="flex flex-wrap items-center mt-32 ">
            <div class="w-full md:w-5/12 px-4 mr-auto ml-auto">
                <h3 class="text-3xl mb-2 font-semibold leading-normal">
                    BANQUET, EVENT & CONFERENCE
                </h3>
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
                    <!-- Link to Register Member Page -->
                    <ButtonPress @click="testButton()" class="">Discover More</ButtonPress>
                </div>
            </div>

            <div class="w-full md:w-4/12 px-4 mr-auto ml-auto">
                <div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-emerald-500">
                    <img alt="..." src="@/assets/userMain/golfImage.jpg" class="w-full align-middle rounded-t-lg" />
                    <blockquote class="relative p-8 mb-4">
                        <svg preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 583 95"
                            class="absolute left-0 w-full block h-95-px -top-94-px">
                            <polygon points="-30,95 583,95 583,65" class="text-emerald-500 fill-current"></polygon>
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

        <FooterComp />



    </div>
</template>

<script>
import Navnavbars from "@/components/Navnavbars/navNavBar.vue";
import ButtonPress from "@/components/ButtonPress.vue";
import FooterComp from "@/components/Footers/Footer.vue";
import UserNavbar from '@/components/Navbars/UserNavbar.vue'

export default {
    components: {
        Navnavbars,
        ButtonPress,
        FooterComp,
        UserNavbar,
    },
    methods: {
        testButton() {
            console.log("HALO");
            const routeData = this.$router.resolve({
                name: "index",

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
            ]

        }
    }
}


</script>


<style scoped>
.main-section {
    background-image: url('@/assets/userMain/hero.png');
    background-size: cover;
    background-position: center;
    height: 500px;
    

}

.golf-section {
    position: relative;
    background-image: url('@/assets/userMain/golfImage.jpg');
    background-size: cover;
    background-position: center;
    height: 500px;
    display: flex;
    padding-left: 100px;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 200px;
}

.overlayy {
    background: rgba(255, 255, 255, 0.8);
    /* White background with transparency */
    padding: 50px;
    max-width: 600px;
    text-align: left;
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

.overlay{
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

.site-hero-inner {
    height: 100vh;
    min-height: 700px;
}

.site-hero-inner .heading {
    font-size: 80px;
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
