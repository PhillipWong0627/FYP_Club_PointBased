<template>
  <div class="flex flex-col pt-10 border-2 border-red-500">
    <!-- <div class="flex flex-row items-center">
        <img
        src="@/assets/shopPage/today.png"
        alt="today"
        class="w-[20px] h-[40px]"
        />
        <h2
        class="font-poppins font-semibold text-[16px] text-themcolor pl-4"
        >
         Today's
        </h2>
    </div>

    <div class="flex flex-row items-center max-[767px]:justify-between">
        <h2 class="font-inter font-semibold text-[36px] max-[767px]:text-[22px]">"Flash Sales"</h2>

        <div class="flex flex-col px-20 max-[767px]:px-0 justify-between" v-show="false">
          <div class="flex flex-row jsutify-center">
            <div class="flex-col justify-center items-center gap-2 inline-flex">
                <div class="text-black text-xs font-medium font-['Poppins'] leading-[18px]">
                Days
                </div>
                <div class="text-black text-[32px] font-bold font-['Inter'] leading-[30px] tracking-wider max-[767px]:text-[22px]">
                  days 
                </div>
            </div>

            <div class="flex-col justify-end items-end gap-2 inline-flex px-2 pb-2">
                <div class="w-1 h-1 bg-themcolor rounded-full"></div>
                <div class="w-1 h-1 bg-themcolor rounded-full"></div>
            </div>

            <div class=" flex-col justify-center items-center gap-2 inline-flex">
                <div class="text-black text-xs font-medium font-['Poppins'] leading-[18px]">
                Hours
                </div>
                <div class="text-black text-[32px] font-bold font-['Inter'] leading-[30px] tracking-wider max-[767px]:text-[22px]">
                  hours
                </div>
            </div>

            <div class="flex-col justify-end items-end gap-2 inline-flex px-2 pb-2">
                <div class="w-1 h-1 bg-themcolor rounded-full"></div>
                <div class="w-1 h-1 bg-themcolor rounded-full"></div>
            </div>

            <div class="flex-col justify-center items-center gap-2 inline-flex">
                <div class="text-black text-xs font-medium font-['Poppins'] leading-[18px]">
                Minutes
                </div>
                <div class="text-black text-[32px] font-bold font-['Inter'] leading-[30px] tracking-wider max-[767px]:text-[22px]">
                  {{ minutes }}
                </div>
            </div>

            <div class="flex-col justify-end items-end gap-2 inline-flex px-2 pb-2">
                <div class="w-1 h-1 bg-themcolor rounded-full"></div>
                <div class="w-1 h-1 bg-themcolor rounded-full"></div>
            </div>

            <div class="flex-col justify-start items-start gap-2 inline-flex">
                <div class="text-black text-xs font-medium font-['Poppins'] leading-[18px]">
                Seconds
                </div>
                <div
                class="text-black text-[32px] font-bold font-['Inter'] leading-[30px] tracking-wider max-[767px]:text-[22px]"
                >
                seconds 
                </div>
            </div>

          </div>
        </div>
        
    </div> -->

    <div class="flex flex-wrap justify-start items-center w-[1500px] pt-5 max-[768px]:w-[115%]">
      <div class="w-[40px]">
        <button @click="prev" class="w-8 h-full md:block hidden" style="height: 142px">
          <!-- <img src="@/assets/shopPage/toright.png" /> -->
        </button>
      </div>

      <div class="w-[94.5%] ">
        <Carousel class="liveList" v-bind="settings" :breakpoints="breakpoints" ref="carousel" v-model="currentSlide">
          <Slide class="" v-for="product in product" :key="product.product">
            <div class="items-center pl-1">
              <div @click="toProduct(product.product_id)" class="cursor-pointer pr-2">
                <div @click="test" class="">
                  <div
                    class="w-[55px]  h-[26px] px-3 py-1 absolute left-5 top-3 bg-orange-400 rounded justify-center items-center gap-2.5 inline-flex"
                    v-show="false">
                    <div class="text-neutral-50 text-xs font-normal font-['Poppins'] leading-[18px]">
                      {{ product.discount_percent }}
                    </div>
                  </div>

                  <!-- <div>
                      <img
                      class="w-full border-2 border-zinc-100 bg-[#F5F5F5] productImg"
                      :src="product.image"
                      alt="Image"
                      style="height: 250px; z-index: 1;"
                      />

                      <img
                      v-show="product.soldout"
                      class="flex items-center justify-center soldoutimg"
                      src="@/assets/soldout.png"
                      alt="Image"
                      style="height: 150px; width: 150px; z-index: 2; position: absolute; top:45px; left: 60px;"
                      />
                    </div> -->

                  <!-- <button
                    @click.stop="toggleFavorite(product)"
                    class="absolute top-3 right-5"
                    v-show="false"
                    >
                    <img
                        v-if="!product.favorite"
                        src="@/assets/shopPage/saved.png"
                        alt="Unfavourite"
                        class="h-[34px] w-[34px]"
                    />
                    <img
                        v-else
                        src="@/assets/shopPage/unsaved.png"
                        alt="Favourite"
                        class="h-[34px] w-[34px]"
                    />
                    </button> -->

                  <div class="flex items-center" style="height: 70px">
                    <div class="flex flex-col h-[70px] pl-1 items-start pt-0.5 w-full">
                      <div
                        class="text-black font-semibold text-16px w-[240px] font-poppins text-start whitespace-nowrap overflow-hidden text-ellipsis">
                        {{ product.name }}
                      </div>

                      <div class="flex flex-row">
                        <div class="font-medium text-grayText text-[16px] w-full text-themcolor whitespace-nowrap">
                          {{ product.discount_price }}
                        </div>

                        <div class="font-medium text-grayText text-[16px] pl-3 w-full whitespace-nowrap">
                          <s>{{ product.price }}</s>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Slide>
        </Carousel>
      </div>
      <div class="w-[40px]">
        <button @click="next" class="w-8 h-full md:block hidden" style="height: 142px">
          <!-- <img src="@/assets/shopPage/toleft.png" /> -->
        </button>
      </div>
    </div>

  </div>
</template>

<script>

// import { Carousel, Slide } from "vue3-carousel";
// import "vue3-carousel/dist/carousel.css";

// api
// import { getInventoriesFlashSales } from "@/service/apiProviderInventory.js";

export default {
  mounted() {
    this.generateCategoryList()
    this.isMobile = this.$route.path.toLowerCase().includes("/mobile")

    this.timerInterval = setInterval(() => {
      this.updateTimer();
    }, 1000);

  },

  components: {
    // Carousel,
    // Slide,
  },

  data() {
    return {
      product: [
        {
          image: require("@/assets/userMain/h.jpg").default,
          name: "HAVIT HV-G92 Gamepad",
          discount_price: "$120",
          price: "$160",
          favorite: true,
          discount_percent: "-20%",
        },
        {
          image: require("@/assets/userMain/h.jpg").default,
          name: "AK-900 Wired Keyboard",
          discount_price: "$140",
          price: "$180",
          favorite: true,
          discount_percent: "-40%",
        },
        {
          image: require("@/assets/userMain/h.jpg").default,
          name: "IPS LCD Gaming Monitor",
          discount_price: "$160",
          price: "$220",
          favorite: true,
          discount_percent: "-40%",
        },
      ],
      routeName: '',
      isMobile: false,
      currentSlide: 0,
      settings: {
        itemsToShow: 1,
        snapAlign: "center",
      },

      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      endTime: new Date("2024-02-09T00:00:00"), // Set your desired end time

      breakpoints: {
        300: {
          itemsToShow: 1.5,
          snapAlign: "start",
        },
        500: {
          itemsToShow: 2.5,
          snapAlign: "none",
        },
        700: {
          itemsToShow: 3.5,
          snapAlign: "center",
        },
        1024: {
          itemsToShow: 5,
          snapAlign: "start",
        },
      },
    };
  },

  methods: {
    // async generateCategoryList() {
    //     this.getListFlashSales = await getInventoriesFlashSales();

    //     for (let i = 0; i < this.getListFlashSales.length; i++) {
    //         this.product.push({
    //           image: this.getListFlashSales[i]["images"]["desc"][i],
    //           name: this.getListFlashSales[i]["title"],
    //           discount_price: "RM" + this.getListFlashSales[i]["priceMin"],
    //           product_id: this.getListFlashSales[i]["inventoryId"],
    //           soldout: this.getListFlashSales[i]["hasSoldOut"]
    //         });
    //       }
    // },

    updateTimer() {
      const now = new Date();
      const timeDifference = this.endTime - now;

      this.days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      this.hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      this.minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
      this.seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

      if (timeDifference <= 0) {
        clearInterval(this.timerInterval);
        // Handle timer expiration logic here
      }
    },

    next() {
      this.$refs.carousel.next();
    },

    prev() {
      this.$refs.carousel.prev();
    },

    toggleFavorite(product) {
      product.favorite = !product.favorite;
    },

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
