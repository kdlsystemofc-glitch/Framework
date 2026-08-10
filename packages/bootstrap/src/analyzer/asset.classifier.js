export class AssetClassifier {
    static classify(filename, relativePath) {
        const ext = filename.split('.').pop()?.toLowerCase() || '';
        const lowerPath = relativePath.toLowerCase();
        // MIME type lookup
        const mimeMap = {
            svg: 'image/svg+xml',
            png: 'image/png',
            jpg: 'image/jpeg',
            jpeg: 'image/jpeg',
            webp: 'image/webp',
            gif: 'image/gif',
            pdf: 'application/pdf',
            ai: 'application/postscript',
            eps: 'application/postscript',
            mp4: 'video/mp4',
            mov: 'video/quicktime',
            webm: 'video/webm',
            docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            doc: 'application/msword',
            xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            txt: 'text/plain',
            md: 'text/markdown',
            json: 'application/json',
        };
        const mimeType = mimeMap[ext] || 'application/octet-stream';
        // Classification Rules
        if (lowerPath.includes('logo') || filename.toLowerCase().includes('logo')) {
            return { category: 'Logo', mimeType };
        }
        if (lowerPath.includes('briefing') || filename.toLowerCase().includes('briefing')) {
            return { category: 'Briefing', mimeType };
        }
        if (['svg', 'ai', 'eps'].includes(ext)) {
            return { category: 'Vector', mimeType };
        }
        if (['png', 'jpg', 'jpeg', 'webp', 'gif'].includes(ext)) {
            return { category: 'Image', mimeType };
        }
        if (['mp4', 'mov', 'webm', 'avi', 'mkv'].includes(ext)) {
            return { category: 'Video', mimeType };
        }
        if (lowerPath.includes('catalog') || filename.toLowerCase().includes('catalogo') || filename.toLowerCase().includes('catalog')) {
            return { category: 'Catalog', mimeType };
        }
        if (['pdf', 'docx', 'doc', 'xlsx', 'txt', 'md'].includes(ext)) {
            return { category: 'Document', mimeType };
        }
        return { category: 'Unknown', mimeType };
    }
}
//# sourceMappingURL=asset.classifier.js.map