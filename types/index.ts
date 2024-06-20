export type ImageFormat = {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: string | null;
  width: number;
  height: number;
  size: number;
  sizeInBytes: number;
  url: string;
  provider_metadata: {
    public_id: string;
    resource_type: string;
  };
};

export type ImageAttributes = {
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    small: ImageFormat;
    thumbnail: ImageFormat;
    medium: ImageFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: {
    public_id: string;
    resource_type: string;
  };
  createdAt: string;
  updatedAt: string;
};

export type ImageData1 = {
  id: number;
  attributes: ImageAttributes;
};

export type CategoryAttributes = {
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

export type Icon = {
  data: IconData[];
};

export type IconData = {
  id: number;
  attributes: ImageAttributes;
};

export type CategoryData = {
  id: number;
  attributes: CategoryAttributes;
};

export type Attributes = {
  title: string;
  description: string;
  pricing: number;
  instantDelivery: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  image: {
    data: ImageData1;
  };
  categories: {
    data: CategoryData[];
  };
  icon: Icon;
  name: string;
  quantity: number;
  products: {
    data: ProductData[];
  };
};

export type ProductData = {
  id: number;
  attributes: ProductAttributes;
};

export type ProductAttributes = {
  title: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  instantDelivery: boolean;
  pricing: number;
  image: {
    data: ImageData1;
  };
};

export type Product = {
  id: number;
  attributes: Attributes;
};
