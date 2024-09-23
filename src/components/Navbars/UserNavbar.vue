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

            </div>
            <div class="lg:flex flex-grow items-center" :class="[navbarOpen ? 'block' : 'hidden']"
                id="example-navbar-warning">
                <ul class="flex flex-col lg:flex-row list-none ">
                    <li class="flex items-center" v-for="link in Links" :key="link.link">
                        <!-- <router-link :to="link.link"
                            class="hover:text-blueGray-500 text-blueGray-700 px-3 py-2 flex items-center text-xs uppercase font-bold">{{
                                link.name }}
                        </router-link> -->
                        <a @click="navigateToPage(link.link)"
                            class="hover:text-blueGray-500 text-blueGray-700 px-3 py-2 flex items-center text-xs uppercase font-bold">
                            {{ link.name }}
                        </a>

                    </li>
                </ul>

                <ul v-if="!loggedIn" class="flex flex-col lg:flex-row list-none lg:ml-auto">
                    <div class="pt-2 pr-1">
                        <ButtonPress @click="linkToRegisterPage()" class="">Register as member</ButtonPress>
                    </div>


                </ul>
            </div>
            <ul class="flex-col md:flex-row list-none items-center hidden md:flex">
                <UserProfileDropdown />
            </ul>



        </div>
    </nav>
</template>

<script>
import ButtonPress from "@/components/ButtonPress.vue";
import UserProfileDropdown from "@/components/Dropdowns/UserProfileDropdown.vue";
import { ref } from 'vue';

export default {
    data() {
        return {
            loggedIn: ref(false),

            navbarOpen: false,
            Links: [
                { name: "main", link: "/" },
                { name: "reward", link: "/reward" },
                { name: "foods & beverage", link: "/foodandbeverage" },
                { name: "Facilities Booking", link: "/facilities" },
                { name: "events & promotion", link: "/eventandpromotion" },
            ],

        };
    },
    created() {
        // Check if the user is logged in based on localStorage data
        const memberID = localStorage.getItem('memberID');
        const memberName = localStorage.getItem('memberName');
        const email = localStorage.getItem('email');

        // Set loggedIn to true if any of the items exist in localStorage
        if (memberID && memberName && email) {
            this.loggedIn = true;
        }
    },
    methods: {
        setNavbarOpen: function () {
            this.navbarOpen = !this.navbarOpen;
        },
        linkToRegisterPage() {
            const routeData = this.$router.resolve({
                name: "userRegister",

            });
            window.location.href = routeData.href;

        },
        search() {
            console.log("Searching");
        },
        toggleDropdownProfile() {
            this.showDropdown = !this.showDropdown;
            this.isDropdownOpen = false;
            this.isDropdownOpenLanguage = false;
        },
        navigateToPage(link) {
            if (link === '/reward') {
                const isLoggedIn = localStorage.getItem('memberID'); // Assuming 'memberID' is stored when logged in
                if (!isLoggedIn) {
                    alert('Please login to access reward page');
                    return; // Prevent navigation if not logged in
                }
            }
            this.$router.push(link);
        },

    },
    components: {
        ButtonPress,
        UserProfileDropdown,

    },
};
</script>

<style scoped>
.modalProfile:hover {
    cursor: pointer;
}
</style>