// sanity.js
import {createClient} from '@sanity/client'
// Import using ESM URL imports in environments that supports it:
// import {createClient} from 'https://esm.sh/@sanity/client'

export const client = createClient({
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: process.env.SANITY_DATASET_NAME,
    apiVersion: "2024-01-01",
    useCdn: process.env.SANITY_USE_CDN,
})

export async function getTaxCorporateServices() {
    const taxCorporateServices = await client.fetch('*[_type == "taxCorporateServices"][0]{serviceTitle, serviceItems}')
    return taxCorporateServices
}

export async function getPackages() {
    const packages = await client.fetch('*[_type == "pricingPlan"]{description, planName, price, features}')
    return packages
}