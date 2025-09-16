import type { Schema, Struct } from "@strapi/strapi"

export interface DataTech extends Struct.ComponentSchema {
  collectionName: "components_data_teches"
  info: {
    description: ""
    displayName: "Tech"
    icon: "code"
  }
  attributes: {
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1
      }>
  }
}

export interface MediaEcchi extends Struct.ComponentSchema {
  collectionName: "components_media_ecchis"
  info: {
    description: ""
    displayName: "Ecchi"
    icon: "heart"
  }
  attributes: {
    category: Schema.Attribute.Enumeration<["doujinshi", "art", "video"]> & Schema.Attribute.Required
    horizontal: Schema.Attribute.Boolean & Schema.Attribute.Required & Schema.Attribute.DefaultTo<false>
    media: Schema.Attribute.Media<"videos" | "images", true>
    name: Schema.Attribute.String & Schema.Attribute.Required
  }
}

export interface SharedFooter extends Struct.ComponentSchema {
  collectionName: "components_shared_footers"
  info: {
    description: ""
    displayName: "Footer"
    icon: "angle-double-down"
  }
  attributes: {
    image: Schema.Attribute.Media<"images">
    images: Schema.Attribute.Component<"shared.footer-image", true>
    text: Schema.Attribute.String
  }
}

export interface SharedFooterImage extends Struct.ComponentSchema {
  collectionName: "components_shared_footer_images"
  info: {
    description: ""
    displayName: "FooterImage"
    icon: "caret-down"
  }
  attributes: {
    image: Schema.Attribute.Media<"images"> & Schema.Attribute.Required
    maxWidth: Schema.Attribute.String
    sort: Schema.Attribute.Integer & Schema.Attribute.Required
    width: Schema.Attribute.String
  }
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: "components_shared_seos"
  info: {
    displayName: "SEO"
    icon: "globe"
  }
  attributes: {
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required
    shareImage: Schema.Attribute.Media<"images">
  }
}

declare module "@strapi/strapi" {
  export module Public {
    export interface ComponentSchemas {
      "data.tech": DataTech
      "media.ecchi": MediaEcchi
      "shared.footer": SharedFooter
      "shared.footer-image": SharedFooterImage
      "shared.seo": SharedSeo
    }
  }
}
