import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiMoviesService } from '../api-movies.service';

@Component({
  selector: 'app-movies-category',
  templateUrl: './movies-category.component.html',
  styleUrls: ['./movies-category.component.scss'],
})
export class MoviesCategoryComponent implements OnInit {
  category: string;
  page = 1;
  validCategories = ['top_rated', 'upcoming', 'popular'];
  movies: object[];
  rawCategory: string;

  constructor(private route: ActivatedRoute, private router: Router, private api: ApiMoviesService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.rawCategory=params.category;
      this.category = params.category.replace('_', ' ');

                 // this.category = this.route.snapshot.paramMap.get('category');
                 // o tambien
                 // this.category = this.route.snapshot.params.category;
      if (this.validCategories.includes(params.category)) {
        // get movies
        this.api.getCategory(params.category).subscribe((response: any) => {
          this.movies = response.results;
          console.log(response);
        });
      } else {
        // redirect to /movies/popular
        this.router.navigate(['/movies/popular']);
      }
    });
  }

  moreMovies() {
    this.api.getCategory(this.rawCategory,this.page+1).subscribe((response:any)=>{
      this.page++;
      this.movies=[...this.movies, ...response.results];
    });
  }
}
