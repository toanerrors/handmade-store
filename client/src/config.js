export const paths = {
  root: "/",
  about: "/about",
  blog: {
    root: "/news",
    slug: (slug) => `/${slug}`,
  },
  projects: {
    root: "/projects",
    slug: (slug) => `/${slug}`,
  },
  contact: "/contact",
  protfolio: "/protfolio",
  services: {
    root: "/services",
    slug: (slug) => `/services/${slug}`,
  },
  faq: "/faq",
};

export const navs = {
  "Sản phẩm": paths.blog.root,
  "Danh mục": paths.projects.root,
};