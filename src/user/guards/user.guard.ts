import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class UserGuard implements CanActivate {
  constructor(public jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    let accesstoken: string = context.switchToHttp().getRequest().headers[
      "accesstoken"
    ];

    if (!accesstoken) return false;

    let result: any = false;
    try {
      result = await this.jwtService.verifyAsync(accesstoken);
    } catch {
      result = false;
    }

    context.switchToHttp().getRequest().user = result;

    return result;
  }
}
