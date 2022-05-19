import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ArticleModule } from './module/article/article.module';

@Module({
  imports: [DatabaseModule, ArticleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
