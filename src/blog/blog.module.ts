import { AuthModule } from 'src/auth/auth.module';
import { BlogController } from './blog.controller';
import { BlogEntryEntity } from './model/blog_entry';
import { BlogService } from './blog.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([BlogEntryEntity]),
        AuthModule,
        UserModule
    ],
    controllers: [BlogController],
    providers: [BlogService]
})
export class BlogModule {}