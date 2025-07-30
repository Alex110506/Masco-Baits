import React, { useState } from "react";

export default function PhotoGallery() {
    const photos = [];
    const PHOTOS_PER_PAGE = 10;

    for (let i = 4968; i <= 5091; i++) {
        photos.push(`IMG_${i}.jpg`);
    }

    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(photos.length / PHOTOS_PER_PAGE);
    const startIndex = (currentPage - 1) * PHOTOS_PER_PAGE;
    const currentPhotos = photos.slice(startIndex, startIndex + PHOTOS_PER_PAGE);

    const handlePrev = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    return (
        <div className="gallery-container">
            <h2 className="gallery-title">Album Foto Video</h2>

            <div className="photo-grid">
                {currentPhotos.map((photo, index) => (
                    <img
                        key={index}
                        src={`../assets/images/photoAlbum/${photo}`}
                        alt={`Photo ${photo}`}
                        loading="lazy"
                        className="photo"
                    />
                ))}
            </div>

            <div className="pagination-controls">
                <button onClick={handlePrev} disabled={currentPage === 1}>
                    Prev
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button onClick={handleNext} disabled={currentPage === totalPages}>
                    Next
                </button>
            </div>
        </div>
    );
}
