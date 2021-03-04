<template>
  <div aria-hidden="true"></div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'

import { decode } from 'js-base64'
export default {
  computed: {
    ...mapState('events', ['log']),
    ...mapState(['facebookCatalogID']),
    ...mapGetters('cart', ['quantityTotal']),
    ...mapState('cart', ['lineItems']),

    productIDs() {
      const productIDs = this.lineItems.map((item) => {
        return this.decodeBase64VariantId(item.id)
      })
      return productIDs
    },
    logEntry() {
      return this.log[this.log.length - 1]
    },
    fbq() {
      return process.client ? window.fbq : undefined
    },
    ga() {
      return process.client ? window.ga : undefined
    }
  },
  watch: {
    log() {
      if (process.client) {
        switch (this.logEntry.eventType) {
          case 'PAGE_VIEW':
            this.facebookPageView()
            this.googleAnalyticsPageView()
            break
          case 'PRODUCT_VIEW':
            this.facebookProductView()
            this.googleAnalyticsProductView()
            break
          case 'ADD_TO_CART':
            this.facebookAddToCart()
            this.googleAnalyticsAddToCart()
            break
          case 'REMOVE_FROM_CART':
            this.googleAnalyticsRemoveFromCart()
            break
          case 'CHECKOUT_INIT':
            this.facebookCheckoutInitiate()
            break
        }
      }
    }
  },
  methods: {
    decodeBase64ProductId(encodedId) {
      const variantIdBase64 = encodedId.split('::')[0]
      const variantIdString = decode(variantIdBase64)
      const variantId = variantIdString.split('gid://shopify/Product/')[1]

      return variantId
    },
    decodeBase64VariantId(encodedId) {
      const variantIdBase64 = encodedId.split('::')[0]
      const variantIdString = decode(variantIdBase64)
      const variantId = variantIdString.split(
        'gid://shopify/ProductVariant/'
      )[1]

      return variantId
    },
    /// / PAGE VIEW METHODS /////////////////////////////////
    facebookPageView() {
      if (typeof this.fbq !== 'undefined') {
        this.fbq('track', 'PageView')
      }
    },
    googleAnalyticsPageView() {
      if (typeof this.ga !== 'undefined') {
        this.ga('send', 'pageview', this.logEntry.payload.path)
      }
    },

    /// / PRODUCT VIEW METHODS //////////////////////////////
    facebookProductView() {
      if (typeof this.fbq !== 'undefined') {
        this.fbq('track', 'ViewContent', {
          content_ids: this.decodeBase64ProductId(
            this.logEntry.payload.product.id
          ),
          content_name: this.logEntry.payload.product.title,
          content_type: 'product',
          product_catalog_id: this.facebookCatalogID
        })
      }
    },
    googleAnalyticsProductView() {
      if (typeof this.ga !== 'undefined') {
        this.ga('ec:addProduct', {
          id: this.decodeBase64ProductId(this.logEntry.payload.product.id),
          name: this.logEntry.payload.product.title
        })
        this.ga('ec:setAction', 'detail')
        this.ga('send', 'pageview')
      }
    },

    /// / ADD TO CART METHODS ///////////////////////////////
    facebookAddToCart() {
      if (typeof this.fbq !== 'undefined') {
        this.fbq('track', 'AddToCart', {
          content_ids: this.decodeBase64VariantId(
            this.logEntry.payload.product.variant.id
          ),
          content_name: this.logEntry.payload.product.variant.title,
          content_type: 'product',
          value: this.logEntry.payload.product.variant.price,
          currency: 'USD',
          product_catalog_id: this.facebookCatalogID
        })
      }
    },
    googleAnalyticsAddToCart() {
      if (typeof this.ga !== 'undefined') {
        this.ga('ec:addProduct', {
          id: this.decodeBase64ProductId(
            this.logEntry.payload.product.variant.id
          ),
          name: this.logEntry.payload.product.variant.title
        })
        this.ga('ec:setAction', 'add')
        this.ga('send', 'event', 'UX', 'click', 'add to cart')
      }
    },

    /// / REMOVE FROM CART METHODS ///////////////////////////////
    googleAnalyticsRemoveFromCart() {
      if (typeof this.ga !== 'undefined') {
        this.ga('ec:addProduct', {
          id: this.logEntry.payload.product.variant.id,
          name: this.logEntry.payload.product.variant.title
        })
        this.ga('ec:setAction', 'remove')
        this.ga('send', 'event', 'UX', 'click', 'remove from cart')
      }
    },

    /// / CHECKOUT INITIATION METHODS ///////////////////////////////
    facebookCheckoutInitiate() {
      if (typeof this.fbq !== 'undefined') {
        this.fbq('track', 'InitiateCheckout', {
          content_ids: this.productIDs.map((id) => {
            return this.decodeBase64ProductId(id)
          }),
          content_type: 'product',
          num_items: this.quantityTotal,
          product_catalog_id: this.facebookCatalogID
        })
      }
    }
  }
}
</script>
