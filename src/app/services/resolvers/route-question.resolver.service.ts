import {Injectable}             from '@angular/core';
import {
  Router, Resolve, RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {QuestionService} from "../question.service";

@Injectable()
export class QuestionResolver implements Resolve<any> {
  constructor(private qs:QuestionService, private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {
    let slug = route.params['slug'];
    return this.qs.getQuestionBySlug(slug)
      .toPromise()
      .then(_res => {
        console.log("in resolver : ", _res)
      if (_res.success) {
        return _res.message;
      } else { // question not found
        this.router.navigate(['/']);
        return null;
      }
    });
  }
}
