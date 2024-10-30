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