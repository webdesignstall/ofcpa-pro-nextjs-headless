import {client} from "./sanity";
import imageUrlBuilder from '@sanity/image-url';

const builder = imageUrlBuilder(client)

export function urlFor(source) {
    return builder.image(source);
}

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
    const footer = await client.fetch('*[_type == "footer"][0]{contactInfo, logo, copyright}')
    return footer
}

const blogFields = `_id, title, 'slug': slug.current, coverImage, 'category': category->{name, 'slug': slug.current}, 'author': author->name, date`

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
      ${blogFields},
      content[]{..., "asset": asset->}
    }`, {slug}).then(res => res?.[0])

    return result;

}