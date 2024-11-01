// sanity.js
import {createClient} from '@sanity/client'

export const client = createClient({
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: process.env.SANITY_DATASET_NAME,
    apiVersion: "2024-01-01",
    useCdn: process.env.SANITY_USE_CDN === 'true'
})
