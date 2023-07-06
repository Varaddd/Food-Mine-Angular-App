import { Injectable } from '@angular/core';
import { sample_foods, sample_tags } from 'src/data';
import { Food } from '../shared/models/Food';
import { Tag } from '../shared/models/Tag';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { FOODS_BY_ID_URL, FOODS_BY_SEARCH_URL, FOODS_BY_TAG_URL, FOODS_TAGS_URL, FOODS_URL } from '../shared/constants/urls';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private http:HttpClient) { }

  getAll():Observable<Food[]>{
    return this.http.get<Food[]>(FOODS_URL);
  }

  getAllFoodsBySearch(searchTerm:string){
    // return this.getAll().filter(food=>food.name.toLowerCase().includes(searchTerm.toLowerCase()));
    return this.http.get<Food[]>(FOODS_BY_SEARCH_URL + searchTerm);
  }

  getFoodById(foodId:string):Observable<Food>{
    // return this.getAll().find(food=>food.id==foodId) ?? new Food();
    return this.http.get<Food>(FOODS_BY_ID_URL+foodId)

  }

  getAllTags():Observable<Tag[]>{
    return this.http.get<Tag[]>(FOODS_TAGS_URL);
  }

  getAllFoodsByTags(tag:string):Observable<Food[]>{
    // return tag=="All"?this.getAll():this.getAll().filter(food=>food.tags?.includes(tag));
    return tag === "All" ?
    this.getAll() :
    this.http.get<Food[]>(FOODS_BY_TAG_URL+tag);
  }
}
