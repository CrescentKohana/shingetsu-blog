import type { Schema, Attribute } from "@strapi/strapi"

export interface DataTech extends Schema.Component {
  collectionName: "components_data_teches"
  info: {
    displayName: "Tech"
    icon: "code"
    description: ""
  }
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1
      }>
  }
}

export interface MediaEcchi extends Schema.Component {
  collectionName: "components_media_ecchis"
  info: {
    displayName: "Ecchi"
    icon: "heart"
    description: ""
  }
  attributes: {
    name: Attribute.String & Attribute.Required
    category: Attribute.Enumeration<["doujinshi", "art", "video"]> & Attribute.Required
    horizontal: Attribute.Boolean & Attribute.Required & Attribute.DefaultTo<false>
    media: Attribute.Media<"videos" | "images", true>
  }
}

export interface SharedFooterImage extends Schema.Component {
  collectionName: "components_shared_footer_images"
  info: {
    displayName: "FooterImage"
    icon: "caret-down"
    description: ""
  }
  attributes: {
    image: Attribute.Media<"images"> & Attribute.Required
    width: Attribute.String
    maxWidth: Attribute.String
    sort: Attribute.Integer & Attribute.Required
  }
}

export interface SharedFooter extends Schema.Component {
  collectionName: "components_shared_footers"
  info: {
    displayName: "Footer"
    icon: "angle-double-down"
    description: ""
  }
  attributes: {
    text: Attribute.String
    image: Attribute.Media<"images">
    images: Attribute.Component<"shared.footer-image", true>
  }
}

export interface SharedSeo extends Schema.Component {
  collectionName: "components_shared_seos"
  info: {
    displayName: "SEO"
    icon: "globe"
  }
  attributes: {
    metaTitle: Attribute.String & Attribute.Required
    metaDescription: Attribute.Text & Attribute.Required
    shareImage: Attribute.Media<"images">
  }
}

declare module "@strapi/types" {
  export module Shared {
    export interface Components {
      "data.tech": DataTech
      "media.ecchi": MediaEcchi
      "shared.footer-image": SharedFooterImage
      "shared.footer": SharedFooter
      "shared.seo": SharedSeo
    }
  }
}
