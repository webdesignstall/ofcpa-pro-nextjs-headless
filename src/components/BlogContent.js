
import BlockContent from '@sanity/block-content-to-react';

import Image from "next/image";
import {urlFor} from "../../lib/api";

const serializers = {
    types: {
        image: ({ node: { asset, alt = '', position = 'center' } }) => (
            <div >
                <Image
                    alt={alt}
                    src={urlFor(asset).url()}
                    width={100}
                    height={100}
                    sizes="100vw"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover', // or 'contain', 'none' depending on your layout needs
                    }}
                />
            </div>
        ),
        table: ({node}) => {
            const {rows} = node;

            return (
                <div className="blog-table">
                    <table>
                        <tbody>
                        {rows && rows.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {row.cells.map((cell, cellIndex) => (
                                    <td key={cellIndex}>{cell}</td>
                                ))}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            );
        }
    }
};

const BlogBody = ({content}) =>
    <BlockContent
        renderContainerOnSingleChild={true}
        serializers={serializers}
        blocks={content}
    />

export default BlogBody;