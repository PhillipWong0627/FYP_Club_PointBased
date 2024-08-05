<template>
  <div class="wrapper pt-10 p-1 pb-12">
    <div class="flex flex-row items-center">
        <img
        src="@/assets/shopPage/today.png"
        alt="today"
        class="w-[20px] h-[40px]"
        />
        <h2
        class="font-poppins font-semibold text-[16px] text-themcolor pl-4"
        >
          "Categories"
        </h2>
    </div>

    <div class="flex flex-row items-center pb-5">
        <h2 class="font-inter font-semibold text-[36px] max-[767px]:text-[22px]">"Browse By Category"</h2>
    </div>

    <div v-if="!isMobile" class="flex flex-wrap justify-start items-center w-[1500px] pt-10 max-[767px]:w-full max-[767px]:p-0">
        <div class="w-[40px]">
          <button
              @click="prev"
              class="w-8 h-full md:block hidden"
              style="height: 142px"
          >
              <img src="@/assets/shopPage/toright.png" />
          </button>
        </div>

        <div class="w-[94.5%] max-[767px]:w-full">
            <Carousel
              class="liveList"
              v-bind="settings"
              :breakpoints="breakpoints"
              ref="carousel"
              v-model="currentSlide"
              @beforeSlide="handleBeforeSlide"
              >
              <Slide class="max-[767px]:w-full h-full" v-for="(category, index) in categories" :key="category.category">
                  <div class="items-center pl-1 max-[767px]:w-full">
                  <div @click="showProduct(index, category.categoryid)" class="cursor-pointer pr-2">
                      <div :style="{ border: isSelected(index) ? '2px solid #F58033' : '2px solid #00000020' }">
                      <div class="h-[145px] w-[170px] flex justify-center items-center flex-col max-[767px]:w-full max-[767px]:h-full max-[767px]:py-3">
                          <img class="bg-transparent h-[46px] w-[46px] max-[767px]:w-[200px] max-[767px]:h-[100px]" :src="category.image" alt="Image" />
                          <span class="font-medium text-16px font-poppins pt-4">{{ category.name }}</span>
                      </div>
                      </div>
                  </div>
                  </div>
              </Slide>
            </Carousel>
        </div>
        <div class="w-[40px]">
        <button
            @click="next"
            class="w-8 h-full md:block hidden"
            style="height: 142px"
        >
            <img src="@/assets/shopPage/toleft.png" />
        </button>
        </div>
    </div>

    <div v-else class="w-[full] flex justify-start items-start gap-5 pl-10 pt-5 text-base l font-poppins text-[16px] max-[767px]">
      <button 
      v-for="(item, index) in categories" 
      :key="index"
      @click="catButtonClick(index, item.categoryid)"
      >
        {{ item.name }}
        <div class="w-[full] h-[3px] bg-orange-400 rounded-sm" v-if="selectedCatIndex === index"></div>
      </button>
    </div>

    <div class="w-[full] flex justify-start items-start gap-5 md:pl-10 pt-5 text-base l font-poppins text-[16px] max-[767px] pl-3">
        <button
        v-for="(item, index) in items"
        :key="index"
        class="text-center text-black text-base text-[16px] font-poppins leading-normal font-medium"
        @click="handleButtonClick(index, item.subCategoryId)"
        >
        {{ item.name }}
        <div
            class="w-[full] h-[3px] bg-orange-400 rounded-sm"
            v-if="selectedItemIndex === index"
        ></div>
        </button>
    </div>

    <div class="card-container flex justify-start w-full ml-[40px] pt-5 max-[768px]:ml-0">
      <div
        class="card py-2 px-1 relative md:w-1/2 lg: w-1/3 xl:w-1/4"
        v-for="product in product"
        :key="product.product"
      >
        <div
          @click="toProduct(product.product_id)"
          class="card-body relative"
        >
          <div
            class="w-[55px] h-[26px] px-3 py-1 absolute left-5 top-3 bg-orange-400 rounded justify-center items-center gap-2.5 inline-flex"
            v-show="false"
          >
            <div
              class="text-neutral-50 text-xs font-normal font-['Poppins'] leading-[18px]"
            >
              {{ product.discount_percent }}
            </div>
          </div>

          <!-- <img
            class="w-full h-[250px] bg-[#F5F5F5] p-11 max-[768px]:p-3 max-[768px]:h-auto"
            :src="product.image"
            alt="Image"
          /> -->

          <div class="relative">
            <img
            class="w-full bg-[#F5F5F5] max-[768px]:h-auto md:h-[250px] h-[190px]"
            :src="product.image"
            alt="Image"
            style="z-index: 1;"
            />
            <img
            v-show="product.soldout"
            class="flex items-center justify-center soldoutimg md:top-[50px] md:left-[50px] top-[25px] left-[25px] absolute"
            src="@/assets/soldout.png"
            alt="Image"
            />
            <!-- style="z-index: 2; position: absolute; top:45px; left: 60px;" -->

          </div>

          <button
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
          </button>

          <div class="flex items-center" style="height: 70px">
            <div class="flex flex-col h-[42px] pl-1 items-start pt-0.5 w-full">
              <div
                class="text-black font-semibold text-16px font-poppins w-full text-start"
              >
                {{ product.name }}
              </div>

              <div class="flex flex-row">
                <div
                  class="font-medium text-grayText text-[16px] w-full text-themcolor whitespace-nowrap"
                >
                  {{ product.discount_price }}
                </div>

                <div
                  class="font-medium text-grayText text-[16px] pl-3 w-full whitespace-nowrap"
                >
                  <s>{{ product.price }}</s>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { Carousel, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
import { ref } from 'vue'

// api
import { getListCategory, getListSubCategory, getSubHomeInventoryListByCategory } from "@/service/apiProviderInventory.js";

export default {
    mounted() {
      this.generateCategoryList()
      this.generateSubCategoryList("1")
      this.generateProductList("1")
      this.isMobile = this.$route.path.toLowerCase().includes("/mobile")
    },

    components: {
        Carousel,
        Slide,
    },

    data() {
        return {
          routeName:'',
          isMobile: false,
            items: [
                // "All",
                // "Foundation",
                // "Face cream",
                // "Sunscreen",
                // "Toner",
                // "All",
                // "Foundation",
                // "Face cream",
                // "Sunscreen",
                // "Toner",
            ],
            selectedItemIndex: ref(0),
            selectedCatIndex: ref(0),

            categories: [
              // {
              // image: require("@/assets/shopPage/category1.png"),
              // name: "Beauty",
              // },
              // {
              // image: require("@/assets/shopPage/category2.png"),
              // name: "Beauty",
              // },
          ],
        currentSlide: 0,
        settings: {
            itemsToShow: 1,
            snapAlign: "center",
        },
        breakpoints: {
            300: { itemsToShow: 2, snapAlign: "start" },
            500: { itemsToShow: 2.5, snapAlign: "none" },
            700: { itemsToShow: 3.5, snapAlign: "center" },
            1024: { itemsToShow: 8, snapAlign: "start" },
        },
            

        product: [
            // {
            // image: require("@/assets/shopPage/pic1.png"),
            // name: "HAVIT HV-G92 Gamepad",
            // discount_price: "$120",
            // price: "$160",
            // favorite: true,
            // discount_percent: "-20%",
            // },
            // {
            // image: require("@/assets/shopPage/pic2.png"),
            // name: "AK-900 Wired Keyboard",
            // discount_price: "$140",
            // price: "$180",
            // favorite: true,
            // discount_percent: "-40%",
            // },
            // {
            // image: require("@/assets/shopPage/pic3.png"),
            // name: "IPS LCD Gaming Monitor",
            // discount_price: "$160",
            // price: "$220",
            // favorite: true,
            // discount_percent: "-40%",
            // },
            // {
            // image: require("@/assets/shopPage/pic4.png"),
            // name: "S-Series Comfort Chair ",
            // discount_price: "$180",
            // price: "$280",
            // favorite: true,
            // discount_percent: "-40%",
            // },
            // {
            // image: require("@/assets/shopPage/pic4.png"),
            // name: "S-Series Comfort Chair ",
            // discount_price: "$220",
            // price: "$320",
            // favorite: true,
            // discount_percent: "-40%",
            // },
        ],
        };
    },

    methods: {
        async generateCategoryList() {
          this.getListCategory = await getListCategory();
          for (let i = 0; i < this.getListCategory.length; i++) {
            this.categories.push({
              categoryid: this.getListCategory[i]["categoryId"],
              image: this.getListCategory[i]["categoryImg"],
              name: this.getListCategory[i]["name"],
            });
          }
        },

        async generateSubCategoryList(categoryid) {
          this.items = [];
          this.getListCategory = await getListSubCategory(categoryid);
          if (this.getListCategory.length > 0) {
            const firstSubCategoryId = this.getListCategory[0]["subCategoryId"];
            this.generateProductList(firstSubCategoryId);
          }
          for (let i = 0; i < this.getListCategory.length; i++) {
              this.items.push({
                subCategoryId: this.getListCategory[i]["subCategoryId"],
                name:  this.getListCategory[i]["name"]
              });
          }
        },

        async generateProductList(subCategoryId) {
          this.getListProduct = await getSubHomeInventoryListByCategory(subCategoryId);
          this.product = [];
          for (let i = 0; i < this.getListProduct.length; i++) {
              this.product.push({
                image: this.getListProduct[i]["images"]["cover"],
                name: this.getListProduct[i]["title"],
                discount_price: "RM" + this.getListProduct[i]["priceMin"],
                product_id: this.getListProduct[i]["inventoryId"],
                soldout: this.getListProduct[i]["hasSoldOut"]
              });
            }
        },

        toProduct(inventoryID) {
          this.$router.push({
            name: "product",
            query: {
              product: "1",
            },
          });
          if(this.isMobile){ 
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

        showProduct(index, categoryid) {
          this.currentSlide = index;
          
          this.items = []
          this.generateSubCategoryList(categoryid)
        },
        
        isSelected(index) {
          return this.currentSlide === index;
        },

        handleBeforeSlide(newIndex, oldIndex) {
          // Prevent automatic sliding when the user clicks on a category
          if (oldIndex !== null) {
              return false;
          }
        },

        handleButtonClick(index, subCategoryId) {
            this.selectedItemIndex = index;
            this.generateProductList(subCategoryId);
        },
        catButtonClick(index, catId){
          this.selectedCatIndex = index;
          this.generateSubCategoryList(catId);
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
    },
};
</script>

<style scoped>
/* @media (min-width: 300px) {
  .card {
    display: inline-block;
    width: 175px;
    height: 162px;
  }

  .titleBox {
    position: absolute;
    bottom: 0;
  }

  .contentImage {
    display: block;
    width: 30px;
  }

  .gradient_bottom::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    z-index: 1;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%);
    background-size: cover;
  }
}

@media (min-width: 500px) {
  .card {
    display: inline-block;
    width: 230px;
    height: 162px;
  }

  .titleBox {
    position: absolute;
    bottom: 0;
  }

  .contentImage {
    display: block;
    width: 35px;
  }

  .gradient_bottom::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    bottom: 1;
    z-index: 1;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%);
    background-size: cover;
    border-radius: 8px;
  }
}

@media (min-width: 640px) {
  .card {
    display: inline-block;
    width: 270px;
    height: 350px;
  }

  .titleBox {
    position: absolute;
    bottom: 0;
  }

  .contentImage {
    display: block;
    width: 38px;
  }

  .gradient_bottom::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    z-index: 1;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%);
    background-size: cover;
    border-radius: 8px;
  }
} */

.card {
    display: inline-block;
    width: 270px;
    height: 350px;
}

.titleBox {
    position: absolute;
    bottom: 0;
}

.contentImage {
    display: block;
    width: 38px;
}

.wrapper {
  width: 100%;
  max-width: 1500px;
  /* margin-left: 40px; */
  /* margin: 0px auto; */
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  row-gap: 15px;
  border: 10px solid gren;
}

.card-body {
  text-align: center;
  height: 250px;
  width: 100%;
  cursor: pointer;
  position: relative;
}

/* .card-body img {
  width: 100%;
  border-radius: 8px;
} */

.multiline-ellipsis {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.multiline-ellipsis::after {
  content: "...";
}

@media (max-width : 768px) {
  .card {
    display: inline-block;
    width: 100%;
    height: 100%;
  }
  .card-container{
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
  .soldoutimg{
    width: 300px;
    height: 300px;
}
}

@media (min-width: 300px) {

.soldoutimg{
    width: 110px;
    height: 110px;
}

}

@media (min-width: 500px) {
.soldoutimg{
    width: 110px;
    height: 110px;
}


}

@media (min-width: 640px) {
.soldoutimg{
    width: 150px;
    height: 150px;
}

}
</style>
