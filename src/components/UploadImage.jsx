import React, {useState} from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";

export default function UploadPreview({file, setFile, imageUrl, setImageUrl, id}) {
    const [previewUrl, setPreviewUrl] = useState(null);
    const [error, setError] = useState(null);

    const handleFileChange = (e) => {
        setError(null);
        const selected = e.target.files?.[0];
        if (!selected) return;

        const MAX_SIZE = 3 * 1024 * 1024; // 3MB

        if (selected.size > MAX_SIZE) {
            setError("Fayl hajmi 3MB dan oshmasligi kerak!");
            return;
        }

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
            <Typography variant="body2" component="p" color={'red'}>
                {error}
            </Typography>

            {/* File name */}
            {file && <p>Tanlangan fayl: {file.name}</p>}

            {(previewUrl || imageUrl) && (
                <>
                    <img
                        src={previewUrl ? previewUrl : imageUrl}
                        alt="preview"
                        style={{width: "100px", borderRadius: "10px",objectFit: "contain"}}
                    />
                </>
            )}
        </Grid>
    );
}