import React from 'react';
import {ImageList, ImageListItem} from "@mui/material";

function Image({url}) {

    console.log('url', url);
    return (
        <>
            <img
                srcSet={url}
                src={url}
                alt={url}
                width="100px"
                height="100px"
                loading="lazy"
                style={{objectFit: "contain"}}
            />
        </>
    );
}

export default Image;