<template>

    <div class="container mx-auto px-4 pb-32 pt-12">
        <div class="items-center flex flex-wrap">
            <div class="w-full md:w-5/12 ml-auto px-12 md:px-4">
                <div class="md:pr-12">
                    <h3 class="text-3xl font-semibold">
                        Set up pricing plans to sell services or content on your site
                    </h3>
                    <ul class="list-none mt-6">
                        <li class="py-2">
                            <div class="flex items-center">
                                <div>
                                    <span
                                        class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-blueGray-50 mr-3">
                                        <!-- <i class="fas fa-fingerprint"></i> -->
                                        <i class="fas fa-check"></i>
                                    </span>
                                </div>
                                <div>
                                    <h4 class="text-blueGray-500">
                                        Sell packages, memberships and subscriptions
                                    </h4>
                                </div>
                            </div>
                        </li>
                        <li class="py-2">
                            <div class="flex items-center">
                                <div>
                                    <span
                                        class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-blueGray-50 mr-3">
                                        <i class="fas fa-check"></i>
                                    </span>
                                </div>
                                <div>
                                    <h4 class="text-blueGray-500">
                                        Change one time or on a recurring basis
                                    </h4>
                                </div>
                            </div>
                        </li>
                        <li class="py-2">
                            <div class="flex items-center">
                                <div>
                                    <span
                                        class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-blueGray-50 mr-3">
                                        <i class="fas fa-check"></i>
                                    </span>
                                </div>
                                <div>
                                    <h4 class="text-blueGray-500">
                                        Customize your plans, add coupons and more
                                    </h4>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="w-full md:w-6/12 mr-auto px-4 pt-24 md:pt-0 flex justify-center ">
                <div class="membership-card relative bg-white rounded-lg shadow-lg p-6 max-w-sm ">
                    <img style="height: 130px; width: 300px;" src="@/assets/userMain/h.jpg" />
                    <div class="text-center mb-4 ">
                        <h4
                            class="text-sm font-semibold uppercase bg-blue-500 text-white inline-block px-2 py-1 rounded-full">
                            Best Deal
                        </h4>
                        <h3 class="text-2xl font-bold mt-2">Monthly Membership</h3>
                        <p class="text-4xl font-bold">RM 30</p>
                        <p class="text-sm text-gray-600">Every month</p>
                    </div>
                    <p class="text-center mb-4">Explore the basics with this introductory course</p>
                    <ButtonPress @click=userRegister() class="w-full">Register as Member     Now!</ButtonPress>
                    <hr class="my-6 border-blueGray-300" />

                </div>
            </div>
        </div>

    </div>
</template>
<script>
import ButtonPress from "@/components/ButtonPress.vue";

export default {
    components: {
        ButtonPress
    },
    methods: {
        userRegister() {
            //Navigate to regisrer page
            console.log("HALO");
            const routeData = this.$router.resolve({
                name: "userRegister",

            });
            window.location.href = routeData.href;



        }
    }
}


</script>
<style scoped>
.membership-card {
    background-color: #ffffff;
    border-radius: 0.5rem;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    padding: 1.5rem;
    max-width: 20rem;
    position: relative;
}

.discount-tag {
    background-color: #f3f4f6;
    /* Gray-200 from Tailwind */
    text-align: center;
    padding: 1rem;
    border-bottom-left-radius: 0.5rem;
    position: absolute;
    top: 0;
    right: 0;
}
</style>