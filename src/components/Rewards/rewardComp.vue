<template>
  <div class="flex flex-col pt-10 ">
    <div class=" container mx-auto flex justify-between">
      <span class="text-3xl font-semibold uppercase py-4 ">Rewards</span>
      <button class="uppercase font-bold text-lg pr-4">View All</button>
    </div>
    <div class="flex flex-wrap justify-evenly mx-auto container  ">
      <!-- Components for all the facilities -->
      <div v-for="i in product" :key="i.product"
        class="flex flex-col items-center justify-around cardContainer shadow-2xl bg-blueGray-100 px-2 my-2 rounded-sm cursor-pointer ">
        <img style="width: 200px; height: 180px;" class="w-full rounded-3xl" :src="i.image" />
        <div class="flex flex-col items-center mt-4">
          <div class="uppercase border-2 border-red-500 rounded-full px-2 text-lg">
            <span>{{ i.point }} pts</span>

          </div>
          <div class="uppercase text-sm">
            {{ i.name }}

          </div>
        </div>

        <!-- <div class="items-center pl-1 border-2 border-red-500">
          <div @click="toProduct(i.product_id)" class="cursor-pointer pr-2 border-2 border-red-500">

            <div class="flex items-center justify-center border-2 border-red-500" style="height: 70px">
              <div class="flex flex-col h-[70px] pl-1 items-start pt-0.5 w-full">
                <div class="flex">
                  <div class="font-medium text-grayText text-[16px] w-full text-themcolor whitespace-nowrap">
                    {{ i.point }}
                  </div>

                </div>

                <div
                  class="text-black font-semibold text-16px w-[240px] font-poppins text-start whitespace-nowrap overflow-hidden text-ellipsis">
                  {{ i.name }}
                </div>

              </div>
            </div>
          </div>
        </div> -->
      </div>
      <!-- <div class="flex flex-col items-center justify-around cardContainer px-2 my-2">
                    <img style="width: 100%; height: 60%;" src="@/assets/navBar/appImage.png">
                    <span class="text-xl">Swimming</span>
                    <ButtonPress>Book Now</ButtonPress>
                </div>
                <div class="flex flex-col items-center justify-around cardContainer px-2 my-2">
                    <img style="width: 100%; height: 60%;" src="@/assets/navBar/appImage.png">
                    <span class="text-xl">Snooker</span>
                    <ButtonPress>Book Now</ButtonPress>
                </div>

                <div class="flex flex-col items-center justify-around cardContainer px-2 my-2">
                    <img style="width: 100%; height: 60%;" src="@/assets/navBar/appImage.png">
                    <span class="text-xl">Basketball</span>
                    <ButtonPress>Book Now</ButtonPress>
                </div>

                <div class="flex flex-col items-center justify-around cardContainer px-2 my-2">
                    <img style="width: 100%; height: 60%;" src="@/assets/navBar/appImage.png">
                    <span class="text-xl">Ping Pong</span>
                    <ButtonPress>Book Now</ButtonPress>
                </div> -->
    </div>
  </div>
</template>

<script>

export default {

  components: {
  },


  data() {

    return {

      product: [
        {
          image: require("@/assets/userMain/h.jpg").default,
          name: "HAVIT HV-G92 Gamepad",
          point: "120",
          price: "160",
          favorite: true,
          discount_percent: "-20%",
        },
        {
          image: require("@/assets/userMain/h.jpg").default,
          name: "AK-900 Wired Keyboard",
          point: "140",
          price: "180",
          favorite: true,
          discount_percent: "-40%",
        },
        {
          image: require("@/assets/userMain/h.jpg").default,
          name: "IPS LCD Gaming Monitor",
          point: "160",
          price: "220",
          favorite: true,
          discount_percent: "-40%",
        },
        {
          image: require("@/assets/userMain/h.jpg").default,
          name: "IPS LCD Gaming Monitor",
          point: "160",
          price: "220",
          favorite: true,
          discount_percent: "-40%",
        },
        {
          image: require("@/assets/userMain/h.jpg").default,
          name: "IPS LCD Gaming Monitor",
          point: "160",
          price: "220",
          favorite: true,
          discount_percent: "-40%",
        },
        {
          image: require("@/assets/userMain/h.jpg").default,
          name: "IPS LCD Gaming Monitor",
          point: "160",
          price: "220",
          favorite: true,
          discount_percent: "-40%",
        },
        {
          image: require("@/assets/userMain/h.jpg").default,
          name: "IPS LCD Gaming Monitor",
          point: "160",
          price: "220",
          favorite: true,
          discount_percent: "-40%",
        },
      ],


    };
  },

  methods: {



    toProduct(inventoryID) {
      if (this.isMobile) {
        this.routeName = 'Mobile Product';
      } else {
        this.routeName = 'product';
      }
      this.$router.push({
        name: this.routeName,
        query: {
          product: inventoryID,
        },
      });
    },
  },
}
</script>

<style scoped>
.cardContainer {
  width: 200px;
  height: 293px;
  margin-left: 10px;
  margin-right: 10px;
  /* background: white; */
}

@media (max-width: 768px) {
  .productImg {
    background: linear-gradient(0deg, rgba(238, 238, 238, 1) 0%, rgba(255, 255, 255, 1) 70%);
    border-radius: 0.375rem;
  }
}

@media (min-width: 300px) {

  .soldoutimg {
    width: 50px;
    height: 50px;
  }

}

@media (min-width: 500px) {
  .soldoutimg {
    width: 90px;
    height: 90px;
  }


}

@media (min-width: 640px) {
  .soldoutimg {
    width: 150px;
    height: 150px;
  }

}
</style>
