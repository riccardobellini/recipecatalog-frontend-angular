import { RecipecatalogFrontendAngularPage } from './app.po';

describe('recipecatalog-frontend-angular App', function() {
  let page: RecipecatalogFrontendAngularPage;

  beforeEach(() => {
    page = new RecipecatalogFrontendAngularPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
