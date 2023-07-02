import validator from "validator";
export interface QueryGenerator {
  generate(): JSON;
}

export class postQueryGenerator implements QueryGenerator {
  author;
  title;
  body;
  rate;
  //img!:string;
  date: Date;
  isVisible: boolean;
  // tags = [];
  // links = [];

  constructor(author: string,title: string, body: string,rate: number,
    date: Date,isVisible: boolean,tags: string[],links: string[] ) {
    this.author = author;
    this.title = title;
    this.body = body;
    this.rate = rate;
    this.date = date;
    this.isVisible = isVisible;
  }

  generate(): JSON {
    let rslt = this.getTitleQuery();
   rslt = rslt + this.getIsVisibileQuery();
    rslt = rslt.slice(0, -1); 
    // JSON.parse('{"body": {"$regex" :"' + validator.escape(this.body) + '"}}');
    // JSON.parse('{"rate": {"$eq" :"' + this.rate + '"}}');
    // JSON.parse('{"isVisible": {"$eq" :"' + this.isVisible + '"}}');
    rslt = '{"$and":[' + rslt +']}' ;
    console.log(rslt);
   return JSON.parse(rslt);
  }

  getIsVisibileQuery(): string {
    return '{"isVisible": '+ this.isVisible +'},';
  }

  getBodyQuery(): string {
  if (this.body === '') 
    return '';
    return '{"body": {"$regex" :"' + validator.escape(this.body) + '"}},';
  }

  getTitleQuery(): string {
    if (this.title === '') 
      return '';
      return '{"title": {"$regex" :"' + validator.escape(this.title) + '"}},';
  }

  getRateQuery(): string {
    if(this.rate === 0)
      return '';
      return '{"rate": ' + this.rate + '},';
  }
}