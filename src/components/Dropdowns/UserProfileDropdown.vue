<template>
    <div>
        <a class="text-blueGray-500 block" href="#pablo" ref="btnDropdownRef" v-on:click="toggleDropdown($event)">
            <div class="items-center flex">
                <span
                    class="w-12 h-12 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full">
                    <img alt="..." class="w-full rounded-full align-middle border-none shadow-lg"
                        :src="memberData.avatar ? memberData.avatar : defaultAvatar" />
                </span>
            </div>
        </a>


        <div ref="popoverDropdownRef"
            class="bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48" v-bind:class="{
                hidden: !dropdownPopoverShow,
                block: dropdownPopoverShow,
            }">
            <router-link to="/auth/register" v-if="!loggedIn"
                class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700">
                Register as Member
            </router-link>
            <router-link to="/auth/login" v-if="!loggedIn"
                class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700">
                Login as Member
            </router-link>


            <router-link to="/myprofile" v-if="loggedIn"
                class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700">
                MyPage
            </router-link>
            <router-link to="/bookingHistory" v-if="loggedIn"
                class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700">
                Bookings
            </router-link>



            <a v-if="loggedIn" @click="logout()" href="javascript:void(0);"
                class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700">
                Logout
            </a>


        </div>
    </div>
</template>

<script>
import { createPopper } from "@popperjs/core";

import image from "@/assets/img/team-1-800x800.jpg";
import { ref } from 'vue';
import axios from 'axios';

export default {
    mounted() {
        this.fetchMemberData(); // Fetch member data when the component is mounted
    },

    data() {
        return {
            dropdownPopoverShow: false,
            image: image,
            loggedIn: ref(false),

            // Default avatar image
            defaultAvatar: require('@/assets/profile_coach.jpg').default, // Path to your default avatar image

            memberData: {
                memberName: "",
                address: "",
                contact: "",
                description: "",
                avatar: "",

            }, // to store the fetched member data


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
        async fetchMemberData() {
            const memberId = localStorage.getItem('memberID');
            if (memberId) {
                try {
                    const response = await axios.get(`/api/v1/user/getById/${memberId}`);
                    console.log(response)
                    this.memberData = response.data.data; // assuming the API returns member data in the "data" field
                } catch (error) {
                    console.error('Failed to fetch member data:', error);
                }
            }
        },
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
        logout() {

            console.log("CLEAR LOCAL STORAGE")
            // Remove data from local storage
            localStorage.removeItem('memberID');
            localStorage.removeItem('memberName');
            localStorage.removeItem('email');

            const routeData = this.$router.resolve({
                name: "main",

            });
            window.location.href = routeData.href;

            alert("Logout Succesfully~");

        }

    },
};
</script>