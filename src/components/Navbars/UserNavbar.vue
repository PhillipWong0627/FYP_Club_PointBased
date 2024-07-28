<template>
    <nav
        class="top-0  z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-white shadow">
        <div class="container px-4 mx-auto flex flex-wrap items-center justify-between">
            <div class="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
                <div class="flex">
                    <a href="/"><img class="mr-2" alt="App logo" src="@/assets/navBar/appImage.png" /></a>
                    <router-link to="/">
                        <a class="text-blueGray-700 text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
                            href="#pablo">
                            Panda Sport
                        </a>
                    </router-link>
                    <button
                        class="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
                        type="button" v-on:click="setNavbarOpen">
                        <i class="fas fa-bars"></i>
                    </button>
                </div>
                <!-- <ul style="z-index: 1000" :class="openNav ? 'block' : 'hidden'"
                    class="md:block items-center md:pr-0 pr-2 md:pl-5 pl-5 md:static absolute bg-navColor md:w-auto w-auto md:left-0 -left-[90px] md:top-14 top-14">
                    <li class="md:inline-flex flex-col ml-4 my-2.5" v-for="link in Links" :key="link.link">

                        <router-link :to="link.link"
                            class="flex nav-button md:text-base text-sm font-normal hover:text-gray-200 text-white">{{
                                link.name }}
                        </router-link>
                    </li>
                </ul> -->
            </div>
            <div class="lg:flex flex-grow items-center" :class="[navbarOpen ? 'block' : 'hidden']"
                id="example-navbar-warning">
                <!-- <ul class="flex flex-col lg:flex-row list-none mr-auto">
            <li class="flex items-center">
              <a class="hover:text-blueGray-500 text-blueGray-700 px-3 py-2 flex items-center text-xs uppercase font-bold"
                href="https://www.creative-tim.com/learning-lab/tailwind/vue/overview/notus?ref=vn-index-navbar">
                <i class="text-blueGray-400 far fa-file-alt text-lg leading-lg mr-2" />
                Docs
              </a>
            </li>
          </ul> -->
                <ul class="flex flex-col lg:flex-row list-none lg:ml-auto">
                    <li class="flex items-center" v-for="link in Links" :key="link.link">
                        <router-link :to="link.link"
                            class="hover:text-blueGray-500 text-blueGray-700 px-3 py-2 flex items-center text-xs uppercase font-bold">{{
                                link.name }}
                        </router-link>
                    </li>
                </ul>

                <ul class="flex flex-col lg:flex-row list-none lg:ml-auto">
                    <div class="pt-2 pr-1">
                        <ButtonPress @click="testButton()" class="">Register as member</ButtonPress>
                    </div>
                    <div class="lg:block hidden pt-2 pl-1">
                        <input type="text" placeholder="Search event/team" maxlength="20" @keyup.enter="search"
                            class="pl-10 rounded-3xl border-2 text-xs font-bold bg-opacity-10 text-blueGray-700 " />
                    </div>

                    <!-- 
                    <li class="flex items-center">
                        <a class="hover:text-blueGray-500 text-blueGray-700 px-3 py-2 flex items-center text-xs uppercase font-bold"
                            href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdemos.creative-tim.com%2Fvue-notus%2F%23%2F"
                            target="_blank">
                            <i class="text-blueGray-400 fab fa-facebook text-lg leading-lg" />
                            <span class="lg:hidden inline-block ml-2">Share</span>
                        </a>
                    </li>

                    <li class="flex items-center">
                        <a class="hover:text-blueGray-500 text-blueGray-700 px-3 py-2 flex items-center text-xs uppercase font-bold"
                            href="https://twitter.com/intent/tweet?url=https%3A%2F%2Fdemos.creative-tim.com%2Fvue-notus%2F%23%2F&text=Start%20your%20development%20with%20a%20Free%20Tailwind%20CSS%20and%20VueJS%20UI%20Kit%20and%20Admin.%20Let%20Vue%20Notus%20amaze%20you%20with%20its%20cool%20features%20and%20build%20tools%20and%20get%20your%20project%20to%20a%20whole%20new%20level.%20"
                            target="_blank">
                            <i class="text-blueGray-400 fab fa-twitter text-lg leading-lg" />
                            <span class="lg:hidden inline-block ml-2">Tweet</span>
                        </a>
                    </li>

                    <li class="flex items-center">
                        <a class="hover:text-blueGray-500 text-blueGray-700 px-3 py-2 flex items-center text-xs uppercase font-bold"
                            href="https://github.com/creativetimofficial/vue-notus?ref=vn-index-navbar" target="_blank">
                            <i class="text-blueGray-400 fab fa-github text-lg leading-lg" />
                            <span class="lg:hidden inline-block ml-2">Star</span>
                        </a>
                    </li>

                    <li class="flex items-center">
                        <button
                            class="bg-emerald-500 text-white active:bg-emerald-600 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
                            type="button">
                            <i class="fas fa-arrow-alt-circle-down"></i> Download
                        </button>
                    </li> -->

                </ul>
            </div>
            <div>
                <div @click="toggleDropdownProfile" class="modalProfile">
                    <img src="@/assets/navBar/appImage.png"
                        class="max-w-40-px w-40-px h-40-px max-h-40-px lg:static absolute top-65-px rounded-full border-2 border-white"
                        style="object-fit: cover; " />


                    <div style="z-index: 1000" v-show="showDropdown"
                        class="md:absolute absolute md:right-0 -right-4 md:top-12 -top-6 bg-blueGray-800 mt-1 p-1 py-3">
                        <div class="pr-1 pt-1 pb-2 flex flex-col w-[80px]">
                            <button v-if="!loggedIn" class="px-1" @click="showRegisterModal">
                                Register
                            </button>
                            <button v-if="!loggedIn" class="px-1" @click="showLoginModal">
                                Login
                            </button>
                            <button v-if="loggedIn" class="px-1" @click="showMyPageModal">
                                MyPage
                            </button>
                            <button v-if="loggedIn" @click="logout" class="block text-white">
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    </nav>
</template>

<script>
// import IndexDropdown from "@/components/Dropdowns/IndexDropdown.vue";
import ButtonPress from "@/components/ButtonPress.vue";
import { ref } from 'vue';
export default {
    data() {
        return {
            navbarOpen: false,
            Links: [
                { name: "main", link: "/" },
                { name: "about", link: "/about" },
                { name: "foods & beverage", link: "/foodandbeverage" },
                { name: "Facilities Booking", link: "/facilities" },
                { name: "events & promotion", link: "/eventandpromotion" },
            ],
            showDropdown: ref(false),

        };
    },
    methods: {
        setNavbarOpen: function () {
            this.navbarOpen = !this.navbarOpen;
        },
        testButton() {
            console.log("HALO");
            const routeData = this.$router.resolve({
                name: "index",

            });
            window.location.href = routeData.href;

        },
        search(){
            console.log("Searching");
        }
    },
    components: {
        // IndexDropdown,
        ButtonPress,

    },
};
</script>