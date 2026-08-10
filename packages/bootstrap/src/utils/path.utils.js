import path from 'path';
export class PathUtils {
    static normalize(p) {
        return path.normalize(p).replace(/\\/g, '/');
    }
    static relative(from, to) {
        return this.normalize(path.relative(from, to));
    }
}
//# sourceMappingURL=path.utils.js.map