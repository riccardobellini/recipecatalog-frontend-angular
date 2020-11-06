export interface PaginationResponseInfo {
  elCount : number;
  pages : Array<number>;
  more : boolean;
}

export interface PaginationRequestParams {
  page: number;
  size: number;
}

export const PagingParams = {
  pageElemNum : 10
};

export class PaginationRequestInfo {

  static getPageRequestParams(page : number) : PaginationRequestParams {
    if (page && page >= 0) {
      return {
        page,
        size: PagingParams.pageElemNum
      }
    }

    return {
      page: 0,
      size: PagingParams.pageElemNum
    };
  }
}
