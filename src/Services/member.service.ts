import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from 'src/Models/Member';


//decorateur @Injectable indique que le service pourrait etre injecter dans un autre service 
//ou dans un autre composant
@Injectable({
  providedIn: 'root' //injectable sur toute la rote(tout le projet)
})
export class MemberService {

  constructor(private http:HttpClient) {}

  //fonction qui envoie une requete GET vers le back
  GetAllMembers():Observable<Member[]>
  {
    return this.http.get<Member[]> ('http://localhost:3000/members')
  }
  
  addMember(member:Member):Observable<void>
  {
    return this.http.post<void>('http://localhost:3000/members', member)
  }

  deleteMember(id:String):Observable<void>
  {
    return this.http.delete<void>(`http://localhost:3000/members/${id}`)
  }

  getMemberById(id:String):Observable<Member>
  {
    return this.http.get<Member> (`http://localhost:3000/members/${id}`)
  }

  updateMember(idcourant:String, member:Member):Observable<void>
  {
    return this.http.put<void>(`http://localhost:3000/members/${idcourant}`, member)
    
  }
}
