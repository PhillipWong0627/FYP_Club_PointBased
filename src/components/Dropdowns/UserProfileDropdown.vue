<template>
    <div>
        <a class="text-blueGray-500 block" href="#pablo" ref="btnDropdownRef" v-on:click="toggleDropdown($event)">
            <div class="items-center flex">
                <span
                    class="w-12 h-12 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full">
                    <img alt="..." class="w-full rounded-full align-middle border-none shadow-lg" :src="image" />
                </span>
            </div>
        </a>
        <!-- <div>
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
        </div> -->

        <div ref="popoverDropdownRef"
            class="bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48" v-bind:class="{
                hidden: !dropdownPopoverShow,
                block: dropdownPopoverShow,
            }">
            <!-- <a v-if="!loggedIn" href="javascript:void(0);"
                class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700">
                Register
            </a> -->
            <router-link to="/auth/register" v-if="!loggedIn"
                class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700">
                Register as Member
            </router-link>
            <router-link to="/auth/login" v-if="!loggedIn"
                class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700">
                Login as Member
            </router-link>


            <!-- <a v-if="!loggedIn" href="javascript:void(0);"
                class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700">
                Login
            </a> -->
            <router-link to="/myprofile" v-if="loggedIn"
                class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700">
                MyPage
            </router-link>

            <!-- <a v-if="loggedIn" href="javascript:void(0);"
                class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700">
                MyPage
            </a> -->

            <a v-if="loggedIn" href="javascript:void(0);"
                class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700">
                Logout
            </a>

            <!-- <div class="h-0 my-2 border border-solid border-blueGray-100" /> -->

        </div>
    </div>
</template>

<script>
import { createPopper } from "@popperjs/core";

import image from "@/assets/img/team-1-800x800.jpg";
import { ref } from 'vue';

export default {
    data() {
        return {
            dropdownPopoverShow: false,
            image: image,
            loggedIn: ref(false),


        };
    },
    methods: {
        toggleDropdown: function (event) {
            event.preventDefault();
            if (this.dropdownPopoverShow) {
                this.dropdownPopoverShow = false;
            } else {
                this.dropdownPopoverShow = true;
                createPopper(this.$refs.btnDropdownRef, this.$refs.popoverDropdownRef, {
                    placement: "bottom-start",
                });
            }
        },
    },
};
</script>