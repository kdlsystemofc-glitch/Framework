import crypto from 'crypto';
import fs from 'fs';
export class HashUtils {
    static calculateFileSHA256(filePath) {
        try {
            if (!fs.existsSync(filePath))
                return '';
            const fileBuffer = fs.readFileSync(filePath);
            const hashSum = crypto.createHash('sha256');
            hashSum.update(fileBuffer);
            return hashSum.digest('hex');
        }
        catch {
            return '';
        }
    }
    static calculateStringSHA256(text) {
        const hashSum = crypto.createHash('sha256');
        hashSum.update(text);
        return hashSum.digest('hex');
    }
}
//# sourceMappingURL=hash.utils.js.map