<template>
    <div class="shop-container">
        <!-- Categories Section -->
        <div class="categories">
            <div v-for="(category, index) in categories" :key="index" class="category-item"
                :class="{ active: selectedCategory === index }" @click="selectCategory(index)">
                <img :src="category.icon" alt="" />
                <p>{{ category.name }}</p>
            </div>
        </div>

        <!-- Products Section -->
        <div class="products">
            <div v-for="(product, index) in filteredProducts" :key="index" class="product-item">
                <img :src="product.image" alt="" />
                <h3>{{ product.name }}</h3>
                <p :class="{ oldPrice: product.oldPrice }">${{ product.price }}</p>
                <p v-if="product.oldPrice" class="old-price">
                    ${{ product.oldPrice }}
                </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            selectedCategory: 0,
            categories: [
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
                    image: "north-coat.png",
                    price: 260,
                    oldPrice: 320,
                },
                {
                    category: 2,
                    name: "Gucci duffle bag",
                    image: "gucci-bag.png",
                    price: 900,
                    oldPrice: 1000,
                },
                {
                    category: 3,
                    name: "RGB Liquid CPU Cooler",
                    image: "cooler.png",
                    price: 150,
                    oldPrice: 170,
                },
                {
                    category: 4,
                    name: "Small Bookshelf",
                    image: "bookshelf.png",
                    price: 350,
                },
                // Add other products...
            ],
        };
    },
    computed: {
        filteredProducts() {
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
.shop-container {
    display: flex;
    flex-direction: column;
}

.categories {
    display: flex;
    justify-content: space-around;
}

.category-item {
    text-align: center;
    padding: 10px;
    cursor: pointer;
}

.category-item.active {
    border-bottom: 2px solid blue;
}

.products {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
}

.product-item {
    width: 200px;
    text-align: center;
}

.product-item img {
    max-width: 100%;
}

.old-price {
    text-decoration: line-through;
    color: red;
}
</style>
