export interface PaginationResponseInfo {
  elCount : number;
  pages : Array<number>;
  more : boolean;
}

export interface PaginationRequestParams {
  offset : string;
  limit : string;
}

export const PagingParams = {
  pageElemNum : 10
};

export class PaginationRequestInfo {

  static getPageRequestParams(page : number) : PaginationRequestParams {
    if (page && page >= 0) {
      return {
        offset : (page * PagingParams.pageElemNum).toString(),
        limit: (PagingParams.pageElemNum).toString()
      }
    }

    return {
      offset : '0',
      limit : (PagingParams.pageElemNum).toString()
    };
  }
}
