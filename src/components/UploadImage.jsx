import React, {useState} from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid2";

export default function UploadPreview({file,setFile}) {
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleFileChange = (e) => {
        const selected = e.target.files?.[0];
        if (!selected) return;

        setFile(selected);

        // Create URL preview
        const url = URL.createObjectURL(selected);
        setPreviewUrl(url);
    };

    return (
        <Grid size={{xs: 12, sm: 12, md: 3}}>
            <input
                id="upload-file"
                type="file"
                style={{display: "none"}}
                onChange={handleFileChange}
            />

            {/* Button */}
            <label htmlFor="upload-file">
                <Button variant="contained" component="span">
                    Choose File
                </Button>
            </label>

            {/* File name */}
            {file && <p>Tanlangan fayl: {file.name}</p>}

            {/* Preview */}
            {previewUrl && (
                <>
                    {/* Rasm bo‘lsa */}
                    {file?.type.startsWith("image/") && (
                        <img
                            src={previewUrl}
                            alt="preview"
                            style={{width: "200px", borderRadius: "10px"}}
                        />
                    )}

                    {/* Video bo‘lsa */}
                    {file?.type.startsWith("video/") && (
                        <video
                            src={previewUrl}
                            controls
                            style={{width: "300px", borderRadius: "10px"}}
                        />
                    )}
                </>
            )}
        </Grid>
    );
}