export interface ArticleDetailsInterface {
  navigation: any;
  route: rte;
}
interface rte {
  key: string;
  name: string;
  params: Params;
}
interface Params {
  details: Details;
  path: any;
}

interface Details {
  articleCategoryId: number;
  articleWrittenByFormattedNames: any;
  articleWrittenByNames: string;
  content?: any;
  createdBy: number;
  createdDate: string;
  description: string;
  id: number;
  isArticle: boolean;
  isFeedbackForm: boolean;
  lastUpdated: string;
  modifiedBy?: any;
  modifiedDate?: any;
  noOfArticles: number;
  shareButtonHtml?: any;
  title: string;
}
