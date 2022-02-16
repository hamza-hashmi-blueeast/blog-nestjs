import { Body, Controller, Get, Post, Query, Request, UseGuards} from '@nestjs/common';
import { from, Observable } from 'rxjs';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guards';
import { BlogEntry } from './blog.interface';
import { BlogService } from './blog.service';

@Controller('blog')
export class BlogController {

    constructor(
        private blogService : BlogService
    ){}
    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body()blogEntry: BlogEntry, @Request() req): Observable<BlogEntry> {
        const user = req.user;
        return this.blogService.create(user, blogEntry);
    }

    @Get()
    findBlogEntries(@Query('userId') userId: number): Observable<BlogEntry[]> {
        if(userId == null) {
            return this.blogService.findAll();
        } else {
            return this.blogService.findByUser(userId);
        }
    }

}
