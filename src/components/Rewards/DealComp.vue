<template>
  <div class="wrapper pt-10 p-1 pb-12 ">
    <div class=" container mx-auto">
      <span class="text-3xl font-semibold uppercase py-4  ">Deals</span>
    </div>

    <div class="categories container mx-auto mt-10">
      <div v-for="(category, index) in categories" :key="index"
        class="category-item flex flex-col items-center justify-center" :class="{ active: selectedCategory === index }"
        @click="selectCategory(index)">
        <img style="width: 50%; height: 60%;" :src="category.icon" alt="">
        <p class="text-base font-semibold uppercase">{{ category.name }}</p>

      </div>
    </div>
    <div class="flex flex-wrap justify-evenly mx-auto container ">
      <div v-for="(product, index) in filteredProducts" :key="index"
        class="flex flex-col items-center justify-around cardContainer bg-blueGray-100 px-2 my-2 rounded-sm">
        <img style="width: 200px; height: 180px;" class="w-full rounded-3xl" :src="product.image" alt="" />
        <div class="flex flex-col items-center mt-4">
          <div class="uppercase border-2 border-red-500 rounded-full px-2 text-lg">
            <span>{{ product.point }} pts</span>

          </div>
          <div class="uppercase text-sm">
            {{ product.name }}

          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>



export default {
  mounted() {
  },

  components: {
  },

  data() {
    return {
      selectedCategory: 0,

      categories:
        [
          {
            name: "All",
            icon: require("@/assets/navBar/appImage.png").default
          },
          {
            name: "Beauty",
            icon: require("@/assets/navBar/appImage.png").default
          },
          {
            name: "Clothes",
            icon: require("@/assets/navBar/appImage.png").default
          },
          {
            name: "Clothes",
            icon: require("@/assets/navBar/appImage.png").default
          },
          // Add other categories...
        ],


      products: [
        {
          category: 1,
          name: "The north coat",
          image: require("@/assets/img/team-1-800x800.jpg").default,
          point: 320,
        },
        {
          category: 1,
          name: "The north coat",
          image: require("@/assets/img/team-1-800x800.jpg").default,
          point: 320,
        },

        {
          category: 1,
          name: "The north coat",
          image: require("@/assets/img/team-1-800x800.jpg").default,
          point: 320,
        },

        {
          category: 1,
          name: "The north coat",
          image: require("@/assets/img/team-1-800x800.jpg").default,
          point: 320,
        },


        {
          category: 2,
          name: "Gucci duffle bag",
          image: require("@/assets/img/team-1-800x800.jpg").default,
          point: 1000,
        },
        {
          category: 3,
          name: "RGB Liquid CPU Cooler",
          image: require("@/assets/img/team-1-800x800.jpg").default,
          point: 170,
        },
        {
          category: 4,
          name: "Small Bookshelf",
          image: require("@/assets/img/team-1-800x800.jpg").default,
          point: 170,

        },

      ],
    };
  },
  computed: {
    filteredProducts() {
      if (this.selectedCategory === 0) {
        return this.products;
      }

      return this.products.filter(
        (product) => product.category === this.selectedCategory
      );
    },
  },
  methods: {
    selectCategory(index) {
      this.selectedCategory = index;
    },

  },
};
</script>

<style scoped>
.cardContainer {

  width: 200px;
  height: 293px;
  /* background: white; */
}

.categories {
  display: flex;
  justify-content: space-around;
}

.category-item {
  width: 170px;
  height: 145px;
  text-align: center;
  padding: 10px;
  cursor: pointer;
}

.category-item.active {
  border: 2px solid #F58033;
}


</style>
