import React from 'react';
import './ArticlePage.css';

function ArticlePage({
  children,
  articleName='Article name',
  articlePageMod='',
  articlePageTitleMod='',
  articlePageId=undefined
  }) {

  return(
    <section className={`article-page ${articlePageMod}`}>
      <h2 id={articlePageId} className={`article-page__title ${articlePageTitleMod}`}>{articleName}</h2>
      {children}
    </section>
  );
}

export default ArticlePage;
