import { type SchemaTypeDefinition } from "sanity";

import { blockContentType } from "./blockContentType";
import { categoryType } from "./categoryType";
import { postType } from "./postType";
import { authorType } from "./authorType";
import { promotionCampaign } from "./schemas/promotion-campaign";
import { promotionCode } from "./schemas/promotion-codes";
import { productCategory } from "./schemas/product-category";
import { product } from "./schemas/product";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType,
    categoryType,
    postType,
    authorType,

    promotionCode,
    promotionCampaign,
    productCategory,
    product,
  ],
};
