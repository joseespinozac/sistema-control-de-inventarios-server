import { Comment } from "../models";

export class CommentRepository {
    async createComment(data: any) {
        return Comment.create(data);
    }

    async findCommentById(commentId: number) {
        return Comment.findByPk(commentId);
    }

    async updateComment(comment: Comment, data: any) {
        return comment.update(data);
    }

    async deleteComment(comment: Comment) {
        return comment.destroy();
    }
}