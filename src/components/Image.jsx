import React from 'react';
import {ImageList, ImageListItem} from "@mui/material";

function Image({url}) {

    console.log('url', url);
    return (
        <ImageList sx={{width:100, height: 100}} cols={1}>
            <ImageListItem key={url}>
                <img
                    srcSet={url}
                    src={url}
                    alt={url}
                    loading="lazy"
                    style={{objectFit: "contain"}}
                />
            </ImageListItem>
        </ImageList>
    );
}

export default Image;