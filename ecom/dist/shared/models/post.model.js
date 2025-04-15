"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostModel = void 0;
class PostModel {
    id;
    title;
    content;
    authorId;
    createdAt;
    updatedAt;
    constructor(partial) {
        Object.assign(this, partial);
    }
}
exports.PostModel = PostModel;
//# sourceMappingURL=post.model.js.map