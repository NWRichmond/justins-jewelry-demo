<template>
  <router-link :to="`${pathFragment}${item.handle}`">
    <div class="columns is-marginless is-mobile nacelle is-vcentered">
      <nacelle-image
        :src="item.featuredMedia.thumbnailSrc"
        :width="150"
        :height="150"
        class="autocomplete-thumb"
      />
      <h3 class="column is-5">
        {{ item.title }}
      </h3>
      <product-price
        v-bind="productPriceProps"
        class="column is-3 is-marginless"
      />
    </div>
  </router-link>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    },
    pathFragment: {
      type: String,
      default: '/products/'
    }
  },
  computed: {
    productThumbnail() {
      return this.item?.featuredMedia?.thumbnailSrc
    },
    productPriceProps() {
      const variant = this.item?.variants?.[0]
      if (variant && variant.price && variant.priceCurrency) {
        return {
          price: variant.price,
          currencyCode: variant.priceCurrency
        }
      }
      return null
    }
  }
}
</script>
<style lang="scss" scoped>
.autocomplete-thumb {
  min-width: 150px;
  min-height: 150px;
}
</style>
