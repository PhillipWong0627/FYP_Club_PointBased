<template>
    <div class="bg-blueGray-200">
        <Navnavbars></Navnavbars>
        <UserNavbar></UserNavbar>
        <p class="flex justify-center font-semibold text-3xl uppercase mt-6">Foods & Beverages</p>
        <div class="container mx-auto p-14 bg-emerald-200 rounded-lg border-2  pt-6 mt-6">
            <!-- Category 1: Bread -->
            <div class="flex justify-between text-3xl mt-5 ">
                <div class="flex flex-col ">
                    <h3 class=" font-bold mb-2">The Golfers Terrace</h3>

                </div>
                <div class="flex  px-4">
                    <div class="flex flex-col px-4">
                        <h3 class=" font-bold mb-2">Member</h3>

                    </div>  
                    <div class="flex flex-col px-4">
                        <h3 class=" font-bold mb-2">Visotor</h3>

                    </div>
                </div>


            </div>
            <div v-for="item in breadList" :key="item.name" class="flex justify-between  text-xl font-medium pt-2">
                <div class="flex flex-col ">
                    <p>{{ item.name }} <span class="">{{ item.description }}</span></p>

                </div>
                <div class="flex items-center px-6 ">
                    <div class="flex flex-col px-4">
                        <p>{{ formatPrice(item.memberPrice) }}</p>

                    </div>
                    <div class="flex flex-col px-4">
                        <p>{{ formatPrice(item.visitorPrice) }}</p>

                    </div>
                </div>
            </div>


            <h3 class="text-3xl font-bold pt-10">The Putra Cafe</h3>
            <!-- Category 2: Protein -->
            <div v-for="item in proteinList" :key="item.name" class="flex justify-between  text-xl font-medium pt-2">
                <div class="flex flex-col ">
                    <p>{{ item.name }} <span class="">{{ item.description }}</span></p>

                </div>
                <div class="flex items-center px-6 ">
                    <div class="flex flex-col px-4">
                        <p>{{ formatPrice(item.memberPrice) }}</p>

                    </div>
                    <div class="flex flex-col px-4">
                        <p>{{ formatPrice(item.visitorPrice) }}</p>

                    </div>
                </div>
            </div>

            <h3 class="text-3xl font-bold pt-10">The Mixed Lounge</h3>
            <!-- Category 2: Protein -->
            <div v-for="item in proteinList" :key="item.name" class="flex justify-between  text-xl font-medium pt-2">
                <div class="flex flex-col ">
                    <p>{{ item.name }} <span class="">{{ item.description }}</span></p>

                </div>
                <div class="flex items-center px-6 ">
                    <div class="flex flex-col px-4">
                        <p>{{ formatPrice(item.memberPrice) }}</p>

                    </div>
                    <div class="flex flex-col px-4">
                        <p>{{ formatPrice(item.visitorPrice) }}</p>

                    </div>
                </div>
            </div>

            <h3 class="text-3xl font-bold pt-10">Japanese Food Restaurant & Many More</h3>
            <!-- Category 2: Protein -->
            <div v-for="item in proteinList" :key="item.name" class="flex justify-between  text-xl font-medium pt-2">
                <div class="flex flex-col ">
                    <p>{{ item.name }} <span class="">{{ item.description }}</span></p>

                </div>
                <div class="flex items-center px-6 ">
                    <div class="flex flex-col px-4">
                        <p>{{ formatPrice(item.memberPrice) }}</p>

                    </div>
                    <div class="flex flex-col px-4">
                        <p>{{ formatPrice(item.visitorPrice) }}</p>

                    </div>
                </div>
            </div>



            <!-- Member discount section -->
            <div class="p-4  rounded mt-6" v-if="isMember">
                <p class="text-red-500 text-lg font-semibold">
                    *As a member, you get exclusive discounts on all menu items!
                </p>
            </div>
        </div>


        <FooterComp class="mt-20" />

    </div>
</template>

<script>
import Navnavbars from "@/components/Navnavbars/navNavBar.vue";
import FooterComp from "@/components/Footers/Footer.vue";
import UserNavbar from '@/components/Navbars/UserNavbar.vue'

export default {
    components: {
        Navnavbars,
        FooterComp,
        UserNavbar,
    },
    data() {
        return {
            isMember: true, // Set this to true if the user is a member
            breadList: [
                { name: "Plain Toast", description: "(Butter and Jam or Kaya)", memberPrice: 5.00, visitorPrice: 6.00 },
                { name: "Monte Cristo", description: "(Cheese and Chicken Ham)", memberPrice: 13.20, visitorPrice: 15.90 },
                { name: "Three Layer Pancake", description: "(Maple Syrup or Honey and Butter)", memberPrice: 13.20, visitorPrice: 15.90 }
            ],
            proteinList: [
                { name: "Big Breakfast", description: "(Hash Brown, Sausage, Baked Bean, Chicken Ham)", memberPrice: 19.40, visitorPrice: 23.40 },
                { name: "Plain Omelette", description: "Add 2 items", memberPrice: 7.90, visitorPrice: 9.60 },
                { name: "Plain Omelette", description: "Add 3 items", memberPrice: 11.40, visitorPrice: 14.80 },
                { name: "Plain Omelette", description: "Add all items", memberPrice: 14.80, visitorPrice: 17.80 }
            ]

        };
    },
    methods: {
        formatPrice(price) {
            return `RM${price.toFixed(2)}`;
        }
    }
};
</script>
<style scoped></style>
