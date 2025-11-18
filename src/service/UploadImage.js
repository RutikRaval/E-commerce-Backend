exports.uploadImage = async (req, res) => {
    try {
         const imageUrls = req.files?.map(file => ({
            url: file.path,
            public_id: file.filename,
        })) || [];
        res.status(200).json({
            success: true,
            message: 'Images uploaded successfully',
            images: imageUrls,
        });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Upload failed', error: err.message });
    }
}