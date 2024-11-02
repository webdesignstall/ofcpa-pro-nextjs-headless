import {client} from "./sanity";
import imageUrlBuilder from '@sanity/image-url';

const builder = imageUrlBuilder(client)

export function urlFor(source) {
    return builder.image(source);
}

const blogFields = `_id, title, 'slug': slug.current, coverImage, 'category': category->{_id, name, 'slug': slug.current}, 'author': author->{_id, name, 'slug': slug.current}, 
tags, date`;
const seoFields = `{
      additionalMetaTags,
      metaDescription,
      metaTitle,
      twitter,
      nofollowAttributes,
      seoKeywords,
      openGraph {
        description,
        image,
        title,
        _type,
        siteName,
        url
      }
    }`;


export async function getHeroSection() {
    const heroSection = await client.fetch('*[_type == "heroSection"][0]{sectionTitle, sectionSubtitle, title, description, image}')
    return heroSection
}


export async function getWorkingWithUs() {
    const workingWithUs = await client.fetch('*[_type == "workingWithUs"][0]{sectionTitle, sectionSubtitle, items}')
    return workingWithUs
}


export async function getReviews() {
    const reviews = await client.fetch('*[_type == "review"]{reviewerName, reviewerTitle, rating, reviewText}')
    return reviews
}

export async function getTaxCorporateServices() {
    const taxCorporateServices = await client.fetch('*[_type == "taxCorporateServices"][0]{serviceTitle, serviceItems}')
    return taxCorporateServices
}

export async function getPackages() {
    const packages = await client.fetch('*[_type == "pricingPlan"]{description, planName, price, features}')
    return packages
}

export async function getFooter() {
    const footer = await client.fetch(`
        *[_type == "footer"][0]{
            contactInfo,
            logo { "asset": asset-> },
            copyright
        }
    `);
    return footer;
}


export async function getBlog(page = 1, limit = 5) {
    const skip = (page - 1) * limit;
    const blog = await client.fetch(
        `*[_type == "blog"] | order(date desc)[${skip}...${skip + limit}] {
            ${blogFields}, 
            content[]{..., "asset": asset->}
        }`
    );
    return blog;
}

export async function getBlogCount() {
    const count = await client.fetch(`count(*[_type == "blog"])`);
    return count;
}

export async function getBlogBySlug(slug) {

    const result = await client
        .fetch(`*[_type == "blog" && slug.current == $slug] {
      ${blogFields}, seo ${seoFields},
      content[]{..., "asset": asset->}
    }`, {slug}).then(res => res?.[0])

    return result;

}


export async function getRelatedPosts(currentPostId, categoryId) {
    const relatedPosts = await client.fetch(
        `*[_type == "blog" && _id != $currentPostId && category._ref == $categoryId] 
        | order(date desc)[0...3] {
            ${blogFields}, 
            content[]{..., "asset": asset->}
        }`,
        { currentPostId, categoryId }
    );
    return relatedPosts;
}

export async function getPageSeo(page) {
    const seo = await client.fetch(
        `*[_type == "pageSeo" && pageName == $page][0]{seoMetadata ${seoFields}}`,{page}
    );
    return seo?.seoMetadata;
}


// Start Get Blog Post By Category

export async function getBlogByCategory(page = 1, limit = 10, slug) {
    const skip = (page - 1) * limit;

    // Query for fetching the blogs with pagination
    const blogs = await client.fetch(
        `*[_type == "blog" && category->slug.current == $slug] | order(date desc)[${skip}...${skip + limit}] {
            ${blogFields}, 
            content[]{..., "asset": asset->}
        }`, { slug }
    );

    // Query for counting the total number of blogs in the specified category
    const count = await client.fetch(
        `count(*[_type == "blog" && category->slug.current == $slug])`,
        { slug }
    );

    return { blogs, count };
}


export async function getCategories() {
    const categories = await client.fetch(`*[_type == "blogCategory"]{_id, name, slug}`);
    return categories;
}

export async function getBlogCountByCategory(slug) {
    const count = await client.fetch(`count(*[_type == "blog" && category->slug.current == $slug])`, {slug});
    return count;
}

// End Get Blog Post By Category

// Start Get Blog Post By Author

export async function getBlogByAuthor(page = 1, limit = 10, authorSlug) {
    const skip = (page - 1) * limit;

    // Query for fetching the blogs with pagination
    const blogs = await client.fetch(
        `*[_type == "blog" && author->slug.current == $authorSlug] | order(date desc)[${skip}...${skip + limit}] {
            ${blogFields}, 
            content[]{..., "asset": asset->}
        }`, { authorSlug }
    );

    return  blogs ;
}

export async function getAuthors() {
    const authors = await client.fetch(`*[_type == "author"]{_id, name, slug}`);
    return authors;
}

export async function getBlogCountByAuthor(authorSlug) {
    const count = await client.fetch(`count(*[_type == "blog" && author->slug.current == $authorSlug])`, {authorSlug});
    return count;
}

// End Get Blog Post By Author


export async function siteSetting() {
    const data = await client.fetch(`*[_type == "siteSettings"][0]{favicon, logo, siteName}`);
    return data
}
