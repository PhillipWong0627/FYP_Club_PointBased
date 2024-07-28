<template>
    <div class="bg-navColor text-white py-1 px-10 shadow md:flex justify-between items-center ">
        <div class="md:pt-1 pt-2 flex items-center cursor-pointer">
            <a href="/"><img class="mr-2" alt="App logo" src="@/assets/navBar/appImage.png" /></a>

            <div class="items-center md:block hidden">
                <a class="md:text-lg text-base font-semibold md:relative" style="color: #33ba53" href="/">
                    PandaSport</a>
            </div>
            <div class="md:static relative ">
                <ul style="z-index: 1000" :class="openNav ? 'block' : 'hidden'"
                    class="md:block items-center md:pr-0 pr-2 md:pl-5 pl-5 md:static absolute bg-navColor md:w-auto w-auto md:left-0 -left-[90px] md:top-14 top-14">
                    <li class="md:inline-flex flex-col ml-4 my-2.5" v-for="link in Links" :key="link.link">

                        <router-link :to="link.link"
                            class="flex nav-button md:text-base text-sm font-normal hover:text-gray-200 text-white">{{
                                link.name }}
                        </router-link>
                    </li>
                </ul>
            </div>

        </div>
        <div>
            <!-- Link to Register Member Page -->
            <ButtonPress @click="testButton()" class="">Register as member</ButtonPress>
        </div>
        <div class="md:flex relative">
            <div class="md:block hidden pt-2.5">
                <input type="text" placeholder="Search event/team" maxlength="20"
                    class="pl-10 lg:w-50 md:w-38 h-10 rounded-3xl border-gray-300 text-xs font-normal bg-opacity-10 text-white bg-slate-50" />
            </div>
        </div>
        <div class="md:flex relative items-center pl-1">
            <div @click="toggleDropdownProfile" class="modalProfile">
                <!-- <img :src="avatar"
                    class="max-w-40-px w-40-px h-40-px max-h-40-px md:static absolute md:right-0 -right-4 md:top-0 -top-[72px] rounded-full border-2 border-white"
                    style="object-fit: cover" /> -->
                <img src="@/assets/navBar/appImage.png"
                    class="max-w-40-px w-40-px h-40-px max-h-40-px md:static absolute md:right-0 -right-4 md:top-0 -top-[72px] rounded-full border-2 border-white"
                    style="object-fit: cover" />

                <div style="z-index: 1000" v-show="showDropdown"
                    class="md:absolute absolute md:right-0 -right-4 md:top-12 -top-6 bg-blueGray-800 mt-1 p-1 py-3">
                    <div class="pr-1 pt-1 pb-2 flex flex-col w-[80px]">
                        <!-- <button to="/register" class="px-1 hover:text-green-500 text-white">注册</button>
              <button to="/login" class="px-1 hover:text-green-500 text-white">登入</button> -->
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
</template>

<script>
import { ref } from "vue";
import ButtonPress from "@/components/ButtonPress.vue";

export default {
    components: {
        ButtonPress,
    },

    data() {
        return {
            searchQuery: "",

            Links: [
                { name: "main", link: "/" },
                { name: "about", link: "/about" },
                { name: "foodandbeverage", link: "/foodandbeverage" },
                { name: "Facilities Booking", link: "/facilities" },
                { name: "eventandpromotion", link: "/eventandpromotion" },
                // { name: "annoucements", link: "/annoucements" },
            ],
            openNav: ref(false),
            isDropdownOpen: ref(false),
            showDropdown: ref(false),
            loggedIn: ref(false ),


            isDropdownOpenLanguage: ref(false),


        };
    },

    methods: {
        testButton() {
            console.log("HALO");
            const routeData = this.$router.resolve({
                name: "index",

            });
            window.location.href = routeData.href;

        },
        //     search() {
        //       const searchPages = "1";

        //       if (this.searchQuery === "") {
        //         console.log("Empty search");
        //   } else {
        //         this.routeData = this.$router.resolve({
        //           name: "ResultPage",
        //           query: { searchQuery: this.searchQuery, searchPages: searchPages },
        //         });
        //         window.open(this.routeData.href, "_blank");
        //       }
        //     },
        //     MenuOpen() {
        //       this.openNav = !this.openNav;
        //       this.isDropdownOpen = false;
        //       this.showDropdown = false;
        //       this.isDropdownOpenLanguage = false;
        //     },
        //     toggleDropdown() {
        //       this.isDropdownOpen = !this.isDropdownOpen;
        //       this.showDropdown = false;
        //       this.isDropdownOpenLanguage = false;
        //     },
        //     selectOption(image) {
        //       this.img = image;
        //       this.isDropdownOpen = false;
        //       this.showDropdown = false;
        //       this.isDropdownOpenLanguage = false;
        //     },
        toggleDropdownProfile() {
            this.showDropdown = !this.showDropdown;
            this.isDropdownOpen = false;
            this.isDropdownOpenLanguage = false;
        },
        //     logout() {
        //       // this.$router.push("/");
        //       // this.loggedIn = false;
        //       // window.location.reload();

        //       if (this.$route.path === "/") {
        //         this.loggedIn = false;
        //         window.location.reload();
        //       } else {
        //         this.loggedIn = false;
        //         this.$router.push("/");
        //       }
        //     },


        toggleDropdownLanguage() {
            this.isDropdownOpenLanguage = !this.isDropdownOpenLanguage;
            this.isDropdownOpen = false;
            this.showDropdown = false;
        },

        languageChange(locale) {
            this.isDropdownOpenLanguage = false;
            this.$i18n.locale = locale;

            // Save the selected language to localStorage
            localStorage.setItem("locale", locale);

        },
    }


};
</script>

<style scoped>
.modalProfile:hover {
    cursor: pointer;
}

@media (min-width: 300px) {
    .menu-list {
        display: static;
        position: absolute;
    }
}

@media (min-width: 500px) {
    .menu-list {
        display: static;
    }
}

@media (min-width: 640px) {
    .menu-list {
        display: block;
        position: absolute;
    }
}

@media (min-width: 760px) {
    .menu-list {
        display: block;
        position: static;
    }
}

@media (min-width: 1024px) {
    .menu-list {
        display: static;
    }
}

.nav-button {
    width: auto;
    height: auto;
    padding-left: 13px;
    padding-right: 13px;
    padding-top: 3px;
    padding-bottom: 3px;
    background-color: #4c6b94;
    border-radius: 6px;
    justify-content: center;
    align-items: center;
}

.dropdown-button {
    background: none;
    border: none;
    cursor: pointer;
    width: 55px;
}

.dropdown-button {
    background: none;
    border: none;
    cursor: pointer;
    width: 55px;
}

.dropdown-content {
    display: none;
    position: absolute;
    --tw-bg-opacity: 1;
    background-color: rgb(17 24 39 / var(--tw-bg-opacity));
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    width: 40px;
    z-index: 1px;
}

.dropdown-content .dropdown-button {
    display: block;
    padding: 8px;
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.dropdown-content .dropdown-button {
    display: block;
    padding: 8px;
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.dropdown-content .dropdown-button:hover {
    background-color: #ddd;
    width: 40px;
}

.show-dropdown {
    display: block !important;
}

a {
    font-weight: normal;
    color: white;
}

a.router-link-exact-active {
    /* color: #42b983; */
    background-color: #33ba53;
}

/* language switching drop down button */
.language-toggle {
    background: none;
    border: none;
    cursor: pointer;
}

.language-options {
    position: absolute;
    /* top: 100%; */
    z-index: 1000;
    display: flex;
    flex-direction: column;
    background-color: rgb(17 24 39 / var(--tw-bg-opacity));
    border: 1px solid rgb(17 24 39 / var(--tw-bg-opacity));
    border-radius: 4px;
    padding: 5px;
}

.languages:hover {
    color: #33ba53;
}

.language-toggle:hover {
    color: #33ba53;
}
</style>
