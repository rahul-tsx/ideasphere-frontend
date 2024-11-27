export const extractYouTubeId = (url: string): string | null => {
    try {
        const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|embed|shorts)\/|.*[?&]v=)|youtu\.be\/)([^"&?/ ]{11})/;
        const match = url.match(regex);
        return match ? match[1] : null;
    } catch (error) {
        console.error('Error extracting YouTube ID:', error);
        return null;
    }
};
