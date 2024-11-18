export interface Article {
    data: string;
    createdBy: string,
    createdAt?: Date,
    articleName?: string;
    authorName?: string;
    publishDate?: string;
    updatedDate: Date;
  }