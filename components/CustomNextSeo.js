import React, { useMemo } from "react";
import { NextSeo } from "next-seo";
import {urlFor} from "../lib/api";

const getOpenGraph = (args) => {
    const { description, image, title, _type, siteName, url } = args;
    const getImage = image ? resolveImage(image) : null;
    return {
        _type,
        description,
        siteName,
        url,
        title,
        images: [{ url: getImage || '' }],
    };
};

const getMetaObjects = (tags, allowIndexing) => {
    const tagArray = [];
    tags.forEach((tag) => {
        const excludeTag = !allowIndexing && tag.metaAttributes?.some(
            (i) => i?.attributeValueString?.includes('noindex') || i?.attributeValueString?.includes('nofollow')
        );
        if (!excludeTag) {
            const metaTag = getMetaAttribute(tag?.metaAttributes);
            if (metaTag) {
                tagArray.push(metaTag);
            }
        }
    });
    return tagArray;
};

const resolveImage = (image) => {
   return  urlFor(image).url()
    // return image?.asset?.url || "";
};

const getMetaAttribute = (attrs) => {
    if (!attrs) return null;

    const obj = {};
    attrs.forEach((i) => {
        obj[i?.attributeKey] = i.attributeType === "image"
            ? resolveImage(i?.attributeValueImage)
            : i.attributeValueString;
    });
    return obj;
};

const CustomNextSeo = ({ seo, children, slug }) => {
    const { additionalMetaTags, metaDescription, metaTitle, twitter, nofollowAttributes, seoKeywords } = seo || {};

    const tags = useMemo(
        () => (additionalMetaTags ? getMetaObjects(additionalMetaTags) : []),
        [additionalMetaTags]
    );
    const openGraph = useMemo(
        () => (seo?.openGraph ? getOpenGraph(seo.openGraph) : undefined),
        [seo]
    );
    const url = (process.env.NEXT_PUBLIC_APP_URL || "") + (slug?.startsWith("/") ? slug : `/${slug}`);

    return (
        <>
            <NextSeo
                twitter={{
                    handle: twitter?.creator,
                    site: twitter?.site,
                    cardType: twitter?.cardType,
                }}
                nofollow={nofollowAttributes}
                noindex={nofollowAttributes}
                openGraph={openGraph}
                canonical={url || ""}
                additionalMetaTags={
                    (seoKeywords && seoKeywords.length > 0
                            ? [{ name: "keywords", content: seoKeywords.join(", ") }]
                            : []
                    ).concat(tags || [])
                }
                title={metaTitle || ""}
                description={metaDescription || ""}
            />
            {children}
        </>
    );
};

export default CustomNextSeo;
