// import { Injectable } from '@nestjs/common';
// import * as Parser from 'rss-parser';
// import * as sanitizeHtml from 'sanitize-html';
// import { sanitizeHtmlConfig } from '../../config/sanitize-html.config';

// @Injectable()
// export class RssService {
//   private readonly parser = new Parser();

//   public async parseRssUrl(
//     url: string,
//   ): Promise<Parser.Output<{ id?: string; author?: string }> & { lastBuildDate?: string }> {
//     const parsed = await this.parser.parseURL(url);

//     parsed.items = parsed.items.map((item) => {
//       try {
//         const title = sanitizeHtml(item.title, sanitizeHtmlConfig);
//         const content = sanitizeHtml(item.content, sanitizeHtmlConfig);
//         return { ...item, content, title };
//       } catch {
//         return { ...item, content: '', title: '' };
//       }
//     });

//     return parsed;
//   }
// }
