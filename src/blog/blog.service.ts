import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, map, Observable, of, switchMap } from 'rxjs';
import { User } from 'src/user/models/user.interface';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { BlogEntry } from './blog.interface';
import { BlogEntryEntity } from './blog_entry';
const slugify = require('slugify')

@Injectable()
export class BlogService {

    constructor(
        @InjectRepository(BlogEntryEntity)
        private blogRepository : Repository<BlogEntryEntity>,
        private userService : UserService
    ){}


    create(user: User, blogEntry: BlogEntry): Observable<BlogEntry> {
        blogEntry.author = user;
        // console.log(blogEntry);
        return this.generateSlug(blogEntry.title).pipe(
            switchMap((slug: string) => {
                blogEntry.slug = slug;
                return from(this.blogRepository.save(blogEntry));
            })
        )
    }

    findOne(id: number): Observable<BlogEntry> {
        return from(this.blogRepository.findOne({id}, {relations: ['author']}));
    }

    findAll(): Observable<BlogEntry[]> {
        return from(this.blogRepository.find({relations: ['author']}));
    }

    findByUser(userId: number): Observable<BlogEntry[]> {
        return from(this.blogRepository.find({
            where: {
                author: userId
            },
            relations: ['author']
        })).pipe(map((blogEntries: BlogEntry[]) => blogEntries))
    }

    generateSlug(title:string):Observable<string>{
        return of(slugify(title))
    }
}
