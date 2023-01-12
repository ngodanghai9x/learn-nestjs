import { Controller, Get, Render } from '@nestjs/common';
import { EjsService } from './ejs.service';
import { ApiTags } from '@nestjs/swagger';
import { join } from 'path';

@ApiTags('view')
@Controller('view')
export class EjsController {
  constructor(private readonly ejsService: EjsService) {}
  @Get()
  @Render(join('pages', 'index.ejs'))
  // @Render('pages\\index.ejs')
  getIndex() {
    const links = [
      { href: 'https://github.com/ngodanghai9x/learn-nestjs', text: 'Learn nestjs' },
      { href: 'https://github.com/ngodanghai9x/learn-express', text: 'Learn express' },
      { href: 'https://github.com/ngodanghai9x/learning', text: 'Learn everything' },
      { href: 'about', text: 'About' },
      { href: '/view/about', text: 'About2' },
    ];
    const headline = `ngodanghai9x's github repositorys`;
    const tagline =
      'IT là lĩnh vực công bình và không giới hạn, nơi mỗi cá nhân được chia sẻ cơ hội và nhìn nhận thông qua nỗ lực thực sự. Tận dụng những lợi thế của IT mang lại, chúng tôi không ngừng hoàn thiện, trở thành nền tảng cho sự phát triển dịch vụ toàn cầu.';
    const templateInput = {
      links: links,
      headline: headline,
      tagline: tagline,
    };
    // res.render(
    //   `pages/index.ejs`,
    //   templateInput,
    // );
    return templateInput;
  }

  @Get('about')
  @Render('pages\\index.ejs')
  getAbout() {
    const templateInput = {
      links: [],
      headline: null,
      tagline: null,
    };
    return templateInput;
  }
}
