import { Component, Input } from '@angular/core';
import { Hero } from '../hero';
import { FormsModule } from '@angular/forms';
import { Location, NgIf, UpperCasePipe } from '@angular/common';
import { HeroService } from '../hero.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css'],
  imports: [FormsModule, NgIf, UpperCasePipe,]
})
export class HeroDetailComponent {
hero?: Hero;  
constructor(private heroService: HeroService, 
  private route: ActivatedRoute, 
  private location: Location) {

}

ngOnInit(): void {
  this.getHero();
}

getHero() {
  const id = Number(this.route.snapshot.paramMap.get("id"));
  this.heroService.getHero(id).subscribe(z => {
    this.hero = z;
  })
}

goBack(): void {
  this.location.back(); 
}

save(): void {
    if (this.hero) {
      this.heroService.updateHero(this.hero)
        .subscribe(() => this.goBack());
    }
  }
}
