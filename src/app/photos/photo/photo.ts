export interface Photo {

    id: number;
    url: string;
    description: string;
    postDate: Date;
    allowComments: boolean;
    likes: number;
    comments: number;
    userId: number;

}